import Error404 from "../../assets/404.png";
import "./style.css";

const Error = () => {
  return (
    <div className="error-container">
      <img src={Error404} alt="Error" />
      <h1 className="error-text">Página não encontrada!</h1>
    </div>
  );
};

export default Error;
