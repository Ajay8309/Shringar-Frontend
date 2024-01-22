import API from "../api/axios.config";
import WithAxios from "../helpers/WithAxios";
import { createContext, useContext, useEffect, useState } from "react";
import authService from "../services/auth.service";

const UserContext = createContext();

const UserProvider = ({ children }) => {
    const [userData, setUserData] = useState(null);
    const [authData, setAuthData] = useState({
        token: "",
    });

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        if (isLoggedIn) {
            authService.getCurrentUser().then((res) => setUserData(res?.data));
        }
    }, [isLoggedIn]);

    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        if (storedToken) {
            try {
                const parsedToken = JSON.parse(storedToken);
                setAuthData(parsedToken);
                setIsLoggedIn(true);
            } catch (error) {
                // Handle JSON parsing error
                console.error("Error parsing token:", error);
                localStorage.removeItem("token");
            }
        }
    }, []);

    const updateUserData = async ({ fullname, email, username, address, city, state, country }) => {
        try {
            const res = await API.put(`user/${userData.user_id}`, {
                fullname,
                email,
                username,
                address,
                city,
                state,
                country,
            });
            setUserData(res.data);
            console.log(res);
        } catch (error) {
            // Handle the error, e.g., network request failed
            console.error("Error updating user data:", error);
        }
    };

    const setUserInfo = (data) => {
        const { user, token } = data;
        setIsLoggedIn(true);
        setUserData(user);
        setAuthData({
            token,
        });
        localStorage.setItem("token", JSON.stringify(token));
    };

    const logout = () => {
        setUserData(null);
        setAuthData({
            token: "",
        });
        setIsLoggedIn(false);
        authService.logout();
    };

    return (
        <UserContext.Provider
            value={{
                userData,
                setUserData,
                setUserState: (data) => setUserInfo(data),
                logout,
                isLoggedIn,
                setIsLoggedIn,
                authData,
                setAuthData,
                updateUserData,
            }}
        >
            <WithAxios>{children}</WithAxios>
        </UserContext.Provider>
    );
};

const useUser = () => {
    const context = useContext(UserContext);

    if (context === undefined) {
        throw new Error("useUser must be used within UserProvider");
    }
    return context;
};

export { UserProvider, useUser };
