import { useContext, useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import { gerenciarTitulo, EnviarEmail } from "../../utils/axios.routes";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./style.css";
import { AuthContext } from "../../contexts/AuthContext";
import { toast } from "react-toastify";

interface Parcela {
  data_vencimento: string;
  nome_produto: string;
  id_parcela: string;
  data_pagamento: string;
  status: any;
  numeroParcelaTitulo: string;
}

const PlotManagement = () => {
  const navigate = useNavigate();
  const { isLogged, funcionario } = useContext(AuthContext)
  const { id } = useParams<{ id: string }>();
  const [data, setData] = useState<any>(null);
  const [parcela, setParcela] = useState<any>(null);

  useEffect(() => {
    if (!isLogged) {
      navigate('/')
    }
    const fetchData = async () => {
      try {
        const response = await gerenciarTitulo(id);
        const data = await response?.data;
        setData(data);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchParcela = async () => {
      try {
        const response = await gerenciarTitulo(id);
        const data = await response?.data.parcelas;

        data.sort((a: Parcela, b: Parcela) => {
          if (a.status < b.status) {
            return -1;
          }
          if (a.status > b.status) {
            return 1;
          }
          return 0;
        });

        setParcela(data);

      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
    fetchParcela();

  }, [id]);

  async function Email(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();
    await EnviarEmail(id, data?.nome_produto);
    toast.success('Email enviado com sucesso!');
    window.location.reload();
  }

  if (isLogged && (funcionario.cargo === 'Administrador' || funcionario.cargo === 'Financeiro')) {
    return (
      <>
        <Navbar />
        <main>
          <div className="plot-container">
            <div className="plot-info">
              <div>
                <h3>Nome: </h3>
                <p>{data?.cliente.nome}</p>
              </div>
              <div>
                <h3>Título:</h3>
                <p>{data?.nome_produto}</p>
              </div>
            </div>
            <div className="line-info">
              <p>N° da Parcela</p>
              <p>Data de Vencimento</p>
              <p>Status</p>
              <p></p>
              <p></p>
            </div>
            {parcela && parcela.map((item: Parcela, index: number) => {
              if (item.status == false) {
                return (
                  <details key={item.id_parcela}>
                    <summary>
                      <p>{item.numeroParcelaTitulo}ª Parcela </p>
                      <p>{item?.data_vencimento.split('-').reverse().join('/')}</p>
                      <p> {'Pendente'}</p>
                      {item?.data_pagamento ? <p>Data de pagamento: {item?.data_pagamento.split('-').reverse().join('/')}</p> : null}
                      <div className="buttons-together">
                        {item.status == false ? <button onClick={e => Email(e)} className='button-parcela'>Enviar Cobrança</button> : null}
                        {item.status == false ? <Link className="link-parcela" to={`/payout/${item.id_parcela}`}>Ver mais</Link> : null}

                      </div>
                    </summary>
                    <div className="card-completo">
                      <div className="conteudo"></div>
                    </div>
                  </details>
                );
              }
            })}
            {parcela && parcela.map((item: Parcela, index: number) => {
              if (item.status == true) {
                return (
                  <details key={item.id_parcela}>
                    <summary>
                      <p>{item.numeroParcelaTitulo}ª Parcela </p>
                      <p>Vencimento: {item?.data_vencimento.split('-').reverse().join('/')}</p>
                      <p>Status: {'Pago'}</p>
                      {item?.data_pagamento ? <p>Data de pagamento: {item?.data_pagamento.split('-').reverse().join('/')}</p> : null}
                      {/* {item.status == true ? <Link className="link" to={`/payout/${item.id_parcela}`}>Ver mais</Link> : null} */}

                    </summary>
                    <div className="card-completo">
                      <div className="conteudo"></div>
                    </div>
                  </details>
                );
              }
            })}
          </div>
        </main>
      </>
    );
  } else {
    return (
      <></>
    )
  }
};
export default PlotManagement;