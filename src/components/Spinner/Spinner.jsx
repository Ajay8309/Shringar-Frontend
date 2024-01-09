import ClipLoader from "react-spinners/ClipLoader";
import "./Spinner.css"

const Spinner = ({ css, size, loading }) => {
  return (
    <div className="absolute transform translate-x-1/2 translate-y-1/2 left-1/2 top-1/2">
      <ClipLoader css={css} size={size} color={"#123abc"} loading={loading} />
    </div>
  );
};

export default Spinner;
