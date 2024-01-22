import { Button } from "@windmill/react-ui";
import AccountForm from "../../components/AccountForm";
import { useUser } from "../../context/UserContext";
import Layout from "../../layout/layout";
import { useState } from "react";
import { Edit2 } from "react-feather";
import toast from "react-hot-toast";
import PulseLoader from "react-spinners/PulseLoader";
import authService from "../../services/auth.service";


import "./Profile.css";  

const Profile = () => {
  const { userData } = useUser();
  const [showSettings, setShowSettings] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const resetPassword = () => {
    setIsSending(true);
    authService
      .forgotPassword(userData.email)
      .then((data) => {
        if (data.data.status === "OK") {
          setIsSending(false);
          toast.success("Email has been sent successfully.");
        }
      })
      .catch((error) => {
        setIsSending(false);
      });
  };

  return (
    <Layout title="Profile" loading={userData === null}>
      {showSettings ? (
        <AccountForm userData={userData} setShowSettings={setShowSettings} />
      ) : (
        <div className="profile-container">
          <div className="profile-card">
            <div className="profile-header">
              <h3 className="profile-title">Profile</h3>
              <p className="profile-subtitle">Your personal information</p>
            </div>
            <div className="profile-content">
            <dl className="profile-details">
  <div className="profile-row">
    <dt>Full name</dt>
    <dd>{userData?.fullname}</dd>
  </div>
  <div className="profile-row">
    <dt>Username</dt>
    <dd>{userData?.username}</dd>
  </div>
  <div className="profile-row">
    <dt>Email address</dt>
    <dd>{userData?.email}</dd>
  </div>
  <div className="profile-row">
    <dt>Password</dt>
    <dd>
      <Button disabled={isSending} onClick={resetPassword}>
        {isSending ? <PulseLoader color={"#0a138b"} size={10} /> : "Reset password by email"}
      </Button>
    </dd>
  </div>
  <div className="profile-row">
    <dt>Address</dt>
    <dd>{userData?.address}</dd>
  </div>
  <div className="profile-row">
    <dt>City</dt>
    <dd>{userData?.city}</dd>
  </div>
  <div className="profile-row">
    <dt>State</dt>
    <dd>{userData?.state}</dd>
  </div>
  <div className="profile-row">
    <dt>Country</dt>
    <dd>{userData?.country}</dd>
  </div>
  <div className="profile-edit">
    <Button iconRight={Edit2} onClick={(e) => setShowSettings(!showSettings)}>
      Edit
    </Button>
  </div>
</dl>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default Profile;
