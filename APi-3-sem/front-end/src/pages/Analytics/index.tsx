import React, { useContext, useEffect, useState } from "react";
import ClientGraphic from "../../components/Graphic/ClientGraphic";
import PaymentGraphic from "../../components/Graphic/PaymentGraphic";
import ValueGraphic from "../../components/Graphic/ValueGraphic";
import Navbar from "../../components/Navbar";
import "./style.css";
import { Parcela, dadosTitulos } from "../../utils/axios.routes";
import { AuthContext } from "../../contexts/AuthContext";

const Analytics = () => {
  const { isLogged, funcionario } = useContext(AuthContext);

  const [data, setData] = useState<any>();
  const [selectedButton, setSelectedButton] = useState<string>("");
  const [titulos, setTitulos] = useState<any>([]);
  const [parcelas, setParcelas] = useState<any>([]);

  const renderSelectedGraphic = () => {
    switch (selectedButton) {
      case "clientes":
        return (<ClientGraphic />);
      case "pagamentos":
        return (<PaymentGraphic />);
      case "valores":
        return (<ValueGraphic />);
      default:
        return null;
    }
  };

  const handleButtonSelect = (selected: string) => {
    setSelectedButton(selected);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const titulos = await dadosTitulos();
        const parcelas = await Parcela();

        if (titulos) {
          const titulosData = titulos?.data;
          setTitulos(titulosData);
        }
        if (parcelas) {
          const parcelasData = parcelas?.data;
          setParcelas(parcelasData);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  if (
    isLogged &&
    (funcionario.cargo === "Administrador" || funcionario.cargo === "Financeiro")
  ) {
    return (
      <>
        <Navbar />
        <div className="main">
          <h2>Gráficos</h2>
          <div className="button-select-graphics">
            <button
              className={selectedButton === "clientes" ? "selected" : "button-graphics"}
              onClick={() => handleButtonSelect("clientes")}
            >
              Situação dos clientes
            </button>
            <button
              className={selectedButton === "pagamentos" ? "selected" : "button-graphics"}
              onClick={() => handleButtonSelect("pagamentos")}
            >
              Situação das parcelas
            </button>
            <button
              className={selectedButton === "valores" ? "selected" : "button-graphics"}
              onClick={() => handleButtonSelect("valores")}
            >
              Valores acúmulativos
            </button>
          </div>
          {renderSelectedGraphic()}
        </div>
      </>
    );
  } else if (isLogged && funcionario.cargo === "Comercial") {
    return (
      <>
        <Navbar />
        <div className="main">
          <h2>Cadastro de Clientes</h2>
          <div className="button-select-graphics">
            <button
              className={selectedButton === "clientes" ? "selected" : ""}
              onClick={() => handleButtonSelect("clientes")}
            >
              Situação dos Clientes
            </button>
            <button
              className={selectedButton === "pagamentos" ? "selected" : ""}
              onClick={() => handleButtonSelect("pagamentos")}
            >
              Situação dos Pagamento
            </button>
            <button
              className={selectedButton === "valores" ? "selected" : ""}
              onClick={() => handleButtonSelect("valores")}
            >
              Valores
            </button>
          </div>
          {renderSelectedGraphic()}
        </div>
      </>
    );
  } else {
    return <></>;
  }
};

export default Analytics;
