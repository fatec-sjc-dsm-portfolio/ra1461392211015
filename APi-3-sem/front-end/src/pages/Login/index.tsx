import React, { useState, useContext } from "react";
import "./style.css";
import Rocket from "../../assets/rocket.png";
import { criarLog, dadosFuncionarioc, login } from "../../utils/axios.routes";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext, FuncionarioInicio } from "../../contexts/AuthContext";
import EyeOff from "../../assets/eyeOff.png";
import EyeOn from "../../assets/eyeOn.png";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import { addAuthToken } from "../../services/axios.config";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showSenha, setShowSenha] = useState(false);

  const handleShowSenha = () => {
    setShowSenha(!showSenha);
  };
  const navigate = useNavigate();
  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setEmail(event.target.value);
  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setPassword(event.target.value);


  const { setFuncionario, setIsLogged } = useContext(AuthContext);
  let funcionarioo = FuncionarioInicio;
  async function procuraFuncionario(cpf: string, token: string) {
    addAuthToken(token);
    localStorage.setItem("token", token);
    try {
      let funcionario = await dadosFuncionarioc(cpf);



      if (
        funcionario !== undefined &&
        funcionario != null
      ) {
        funcionarioo.id = funcionario?.data.credential.id;
        funcionarioo.cargo = funcionario?.data.credential.role;
        funcionarioo.cpf = funcionario?.data.cpf;
        funcionarioo.email = funcionario?.data.email;
        funcionarioo.nome = funcionario?.data.nome;
        funcionarioo.senha = funcionario?.data.credential.password;
        setFuncionario(funcionarioo);
        setIsLogged(true);
        let infos = {
          "funcionario": funcionarioo,
          "isLogged": true
        }
        localStorage.setItem("funcionario", JSON.stringify(infos))
        await criarLog({
          idFuncionario: funcionario.data.cpf,
          descricao: `O funcionario ${funcionario.data.nome} acabou de logar no sistema`
        });
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> {
    event.preventDefault();
    const data = {
      password: password,
      userName: email,
    };
    try {
      let resp = await login(data);
      
      if (resp) {
        const cpf = resp.funcionario.cpf;
        if (cpf) {
          procuraFuncionario(cpf, resp.token);
        }
        navigate("/home");
      } else {
        toast.error("Credenciais inválidas. Verifique seu email e senha!");
      }
    } catch (error) {
      toast.error("Erro ao efetuar login. Tente novamente mais tarde.");
    }
  }
  return (
    <div className="login-container">
      <div className="image-left">
        <img src={Rocket} alt="vasco" />
      </div>
      <div className="form-right">
        <div className="form-box">
          <div className="info">
            <h1> Login </h1>
            <h2> Utilize suas credenciais para acessar o sistema</h2>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="email-box">
              <h3>Email</h3>
              <input
                required
                type="text"
                placeholder="Digite seu Email"
                value={email}
                onChange={handleEmailChange}
              />
            </div>
            <div className="pass-title">
              <h3>Senha</h3>
              <div className="pass-box-container">
                <input
                  required
                  type={showSenha ? "text" : "password"}
                  placeholder="Digite sua Senha"
                  value={password}
                  onChange={handlePasswordChange}
                />
                <a className="button-password" onClick={handleShowSenha}>
                  {showSenha ? <img className="passwordImg" src={EyeOff} /> : <img className="passwordImg" src={EyeOn} />}
                </a>
              </div>
            </div>


            <div className="button-box">
              <button type="submit" className="enter-button">
                {" "}
                Entrar{" "}
              </button>
              <p>
                Não Possui Conta ? <Link to="/cadastro"> Cadastre Aqui </Link>{" "}
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
