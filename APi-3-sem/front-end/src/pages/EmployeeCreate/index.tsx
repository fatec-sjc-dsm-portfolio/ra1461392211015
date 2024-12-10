
import "react-toastify/dist/ReactToastify.min.css";
import { toast } from "react-toastify";

import "./style.css";
import { criarFuncionario } from "../../utils/axios.routes";
import React, { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import EyeOff from "../../assets/eyeOff.png";
import EyeOn from "../../assets/eyeOn.png";
import ReactInputMask from "react-input-mask";

const Register = () => {
  const navigate = useNavigate();
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [cpf, setCpf] = useState("");
  const [showSenha, setShowSenha] = useState(false);

  const handleShowSenha = () => {
    setShowSenha(!showSenha);
  };

  async function submitdata(
    nome: String,
    email: String,
    cpf: String,
    senha: String
  ) {
    try {
      var strCPF = cpf.replace(/[^\d]+/g, '');
      var Soma;
      Soma = 0;
      var Resto;
      let CPFvalido = true;
      if (strCPF == "00000000000" || strCPF == "11111111111" || strCPF == "22222222222" || strCPF == "33333333333" || strCPF == "44444444444" || strCPF == "55555555555" || strCPF == "66666666666" || strCPF == "77777777777" || strCPF == "88888888888" || strCPF == "99999999999") {
        CPFvalido = false;
      }
      for (let i: number = 1; i <= 9; i++) Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (11 - i);
      Resto = (Soma * 10) % 11;

      if ((Resto == 10) || (Resto == 11)) Resto = 0;
      if (Resto != parseInt(strCPF.substring(9, 10))) CPFvalido = false;

      Soma = 0;
      for (let i: number = 1; i <= 10; i++) Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (12 - i);
      Resto = (Soma * 10) % 11;

      if ((Resto == 10) || (Resto == 11)) Resto = 0;
      if (Resto != parseInt(strCPF.substring(10, 11))) CPFvalido = false;

      if (nome == null || !nome) {
        toast.error(`O campo de nome está Vazio!`);
      }
      else if (strCPF == null || !strCPF) {
        toast.error(`O campo de cpf está Vazio!`);
      }
      else if (strCPF.length < 11) {
        toast.error(`O campo de cpf está incompleto!`);
      }
      else if (CPFvalido == false) {
        toast.error(`O campo de cpf está inválido!`);
      }
      else if (!email || email == null) {
        toast.error(`O campo email está vazio!`)
      }
      else if (!senha || senha == null) {
        toast.error(`O campo senha está vazio!`)
      }
      else if (nome && email && senha && cpf) {
        const response = await criarFuncionario(nome, email, cpf, senha);
        return response?.status === 201;
      }
    } catch (error) {
      return false;
    }
  }

  async function onsubmit(e: FormEvent) {
    e.preventDefault();

    const success = await submitdata(nome, email, cpf, senha);
    if (success) {
      toast.success("Cadastro realizado com sucesso!");
      navigate("/");
    }
  }

  return (
    <div
      className="
    register-container"
    >
      <div className="title">
        <h1> Cadastro </h1>
        <h2>
          {" "}
          Preencha as informações para realizar o cadastro, você terá acesso ao
          sistema após a aprovação do administrador
        </h2>
      </div>
      <form onSubmit={onsubmit}>
        <div className="name-box">
          <h3>Nome</h3>
          <input
            type="text"
            placeholder="Digite seu Nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
        </div>

        <div className="cpf-box">
          <h3>CPF</h3>
          <ReactInputMask
            maskPlaceholder="_"
            mask="999.999.999-99"
            type="text"
            placeholder="CPF"
            value={cpf}
            onChange={(e) => setCpf(e.target.value)}
          />
        </div>

        <div className="email-box">
          <h3>Email</h3>
          <input
            type="email"
            placeholder="Digite seu Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="pass-title">
          <h3>Senha</h3>
          <div className="pass-box-container">
            <input
              type={showSenha ? "text" : "password"}
              placeholder="Digite sua Senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
            />
            <a className="button-password" onClick={handleShowSenha}>
              {showSenha ? <img className="passwordImg" src={EyeOff} /> : <img className="passwordImg" src={EyeOn} />}
            </a>
          </div>
        </div>

        <div className="button-box">
          <button className="enter-button" type="submit">
            {" "}
            Cadastrar{" "}
          </button>
          <p> Ao clicar em "cadastrar" você aceita os termos de uso</p>
        </div>
      </form>
    </div>
  );
};

export default Register;