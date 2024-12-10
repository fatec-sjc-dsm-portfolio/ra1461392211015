import React, { useContext, useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import "./style.css";
import { Parcela, dadosTitulos, dadosClientes } from "../../utils/axios.routes";
import { AuthContext } from "../../contexts/AuthContext";
import { Link } from "react-router-dom";

const Relatorio = () => {
    const { isLogged, funcionario } = useContext(AuthContext);

    const [data, setData] = useState<any>();
    const [selectedButton, setSelectedButton] = useState<string>("");
    const [titulos, setTitulos] = useState<any>([]);
    const [parcelas, setParcelas] = useState<any>([]);
    const [clientes, setClientes] = useState<any>([]);
    const [inicio, setInicio] = useState<any>();
    const [fim, setFim] = useState<any>();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const titulos = await dadosTitulos();
                const parcelas = await Parcela();
                const clientes = await dadosClientes();

                if (titulos) {
                    const titulosData = titulos?.data;
                    console.log(titulosData)
                    setTitulos(titulosData);
                }
                if (parcelas) {
                    const parcelasData = parcelas?.data;
                    console.log(parcelasData)
                    setParcelas(parcelasData);
                }
                if (clientes) {
                    const clientesData = clientes?.data;
                    console.log(clientesData)
                    setClientes(clientesData);
                }
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, []);

    const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedButton(event.target.value);
    };

    if (
        isLogged &&
        (funcionario.cargo === "Administrador" || funcionario.cargo === "Financeiro")
    ) {
        const filteredParcelas = selectedButton === "todos"
            ? parcelas
            : parcelas.filter((parcela: any) => {
                const objeto_data_vencimento = new Date(parcela.data_vencimento);
                const objeto_data_credito = new Date(parcela.data_credito);
                const data_atual = new Date();

                if (selectedButton === "pendentes") {
                    return !parcela.status && objeto_data_vencimento > data_atual;
                } else if (selectedButton === "pagas") {
                    return parcela.status && objeto_data_credito > data_atual;
                } else if (selectedButton === "creditas") {
                    return parcela.status && objeto_data_credito < data_atual;
                } else if (selectedButton === "vencidas") {
                    return !parcela.status && objeto_data_vencimento < data_atual;
                }

                return true;
            });

        const filteredParcelasData = filteredParcelas.filter((parcela: any) => {
            const objeto_data_vencimento = new Date(parcela.data_vencimento);

            if (inicio && fim) {
                return objeto_data_vencimento >= new Date(inicio) && objeto_data_vencimento <= new Date(fim);
            } else if (inicio && !fim) {
                return objeto_data_vencimento >= new Date(inicio);
            } else if (!inicio && fim) {
                return objeto_data_vencimento <= new Date(fim);
            }

            return true;
        }
        );

        return (
            <>
                <Navbar />
                <div className='table-box-relatorio'>
                    <div className='table-title-relatorio'>
                        <h1>Relatório de Parcelas</h1>
                        <div className='filtros-relatorio'>
                            <div className="filtro-date-relatorio">
                                <div className='aaa'>
                                    <h5>Data Inicial</h5>
                                    <input
                                        type="date"
                                        value={inicio}
                                        max={fim}
                                        onChange={(ev) => setInicio(ev.target.value)}
                                    />
                                </div>
                                <div className='aaa'>
                                    <h5>Data Final</h5>
                                    <input
                                        type="date"
                                        value={fim}
                                        min={inicio}
                                        onChange={(ev) => setFim(ev.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="filtro-select-relatorio">
                                <div>
                                    <h5>Status</h5>
                                    <select
                                        placeholder="Filtrar"
                                        name="filtro"
                                        value={selectedButton}
                                        onChange={handleFilterChange}
                                    >
                                        <option value="todos">Todos</option>
                                        <option value="pendentes">A vencer</option>
                                        <option value="pagas">Pagas</option>
                                        <option value="creditas">Creditada</option>
                                        <option value="vencidas">Vencidas</option>
                                    </select>
                                </div>
                                <div>
                                    {/* <h5>Digite o Nome ou CPF</h5>
                                <input
                                    type='text'
                                    placeholder='Digite aqui'
                                    className='input-table-relatorio'
                                /> */}
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr></hr>
                    <table>
                        <thead>
                            <tr>
                                <td>Nome cliente</td>
                                <td>CPF</td>
                                <td>Nome Produto</td>
                                <td align='right'>Valor Parcela</td>
                                <td align='right'>Valor Pago</td>
                                <td>Nº parcelas</td>
                                <td>Data de Pagamento</td>
                                <td>Data de Crédito</td>
                                <td>Data de Vencimento</td>
                                <td>Status</td>
                                <td>Acessar Parcela</td>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredParcelasData.map((parcela: any) => {
                                const nome_cliente = clientes.find((cliente: any) => cliente.id === parcela.id_cliente)?.nome;
                                const cpf_cliente = clientes.find((cliente: any) => cliente.id === parcela.id_cliente)?.cpf;
                                const nome_produto = titulos.find((titulo: any) => titulo.id === parcela.titulo_id)?.nome_produto;
                                var valor_pago_formatado = "R$ 0,00";
                                console.log("aaaa: ", nome_produto);
                                if (parcela.valor_pago != null) {
                                    valor_pago_formatado = parcela.valor_pago.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });
                                }
                                const valor_parcela_formatado = parcela.valor.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });

                                var data_pagamento_formatado = "----"
                                if (parcela.data_pagamento !== null) {
                                    data_pagamento_formatado = parcela.data_pagamento.split('-').reverse().join('/');
                                }
                                var data_credito_formatado = "----"
                                var objeto_data_credito = new Date();
                                if (parcela.data_credito !== null) {
                                    data_credito_formatado = parcela.data_credito.split('-').reverse().join('/');
                                    objeto_data_credito = new Date(parcela.data_credito);
                                }
                                var data_vencimento_formatado = "----"
                                var objeto_data_vencimento = new Date();
                                if (parcela.data_vencimento !== null) {
                                    data_vencimento_formatado = parcela.data_vencimento.split('-').reverse().join('/');
                                    objeto_data_vencimento = new Date(parcela.data_vencimento);
                                }

                                const data_atual = new Date();

                                var parcela_status = "----";
                                if (parcela.status === false && objeto_data_vencimento > data_atual) {
                                    parcela_status = "A vencer";
                                }
                                if (parcela.status === true && objeto_data_credito > data_atual) {
                                    parcela_status = "Pagas";
                                }
                                if (parcela.status === true && objeto_data_credito < data_atual) {
                                    parcela_status = "Creditada";
                                }
                                if (parcela.status === false && objeto_data_vencimento < data_atual) {
                                    parcela_status = "Vencidas";
                                }

                                return (
                                    <tr>
                                        <td>{nome_cliente}</td>
                                        <td>{cpf_cliente}</td>
                                        <td>{nome_produto}</td>
                                        <td align='right'>{valor_parcela_formatado}</td>
                                        <td align='right'>{valor_pago_formatado}</td>
                                        <td>{parcela.numeroParcelaTitulo}</td>
                                        <td>{data_pagamento_formatado}</td>
                                        <td>{data_credito_formatado}</td>
                                        <td>{data_vencimento_formatado}</td>
                                        <td>{parcela_status}</td>
                                        <td><Link to={`/payout/${parcela.id_parcela}`}>Ver Mais</Link></td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </>
        );
    } else if (isLogged && funcionario.cargo === "Comercial") {
        return (
            <>
                <Navbar />
            </>
        );
    } else {
        return <></>;
    }
};

export default Relatorio;
