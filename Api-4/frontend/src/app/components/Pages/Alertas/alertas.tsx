import CardAlerts from "../../Card/cardAlerts";
import { Field } from "../../Field/field";
import { Text } from "../../Text/text";
import { useState, useEffect, useCallback } from "react";
import Axios from "axios";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/store/store"
import ModalCadAlerta from "../../Modals/cadastroAlerta";
import ModalArquivarAlerta from "../../Modals/arquivarAlerta";
import ModalEditarAlerta from "../../Modals/editarAlerta";
import { toast } from "react-toastify";

const Alertas: React.FC = () => {

  const [modalCadIsOpen, setModalCadIsOpen] = useState(false)
  const [modalEditIsOpen, setModalEditIsOpen] = useState(false)
  const [modalDeleteIsOpen, setModalDeleteIsOpen] = useState(false)
  const [selectedCardId, setSelectedCardId] = useState<number | null>(null);
  const [chave, setChave] = useState(0);
  // const user = localStorage.getItem("role")
  const user = typeof window !== 'undefined' ? localStorage.getItem('role') : null;

  // const token = localStorage.getItem("token")
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

  const setChaveCallback = useCallback(() => {
    localStorage.setItem("key_cad_alerta", "0");
    localStorage.setItem("key_edi_alerta", "0");
    localStorage.setItem("key_del_alerta", "0");
    setChave((prevChave) => prevChave + 1);
  }, []);

  if (localStorage.getItem("key_cad_alerta") === '1') {
    toast('Alerta adicionado com sucesso!', { type: "success" });
    setChaveCallback();
  }
  if (localStorage.getItem("key_edi_alerta") === '1') {
    toast('Alerta editado com sucesso!', { type: "success" });
    setChaveCallback();
  }
  if (localStorage.getItem("key_del_alerta") === '1') {
    toast('Alerta deletado com sucesso!', { type: "success" });
    setChaveCallback();
  }

  const isOpen = useSelector((state: RootState) => state.modal);

  const dispatch = useDispatch();
  const [alerts, setAlerts] = useState(Array<any>);
  var key = true

  useEffect(() => {
    Axios.get(`https://testenumeroalfa.centralmeat.com.br/Alerta/getAll`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .catch(function (error) {
        console.log(error);
      })
      .then((resp: any) => {
        var data = resp.data;

        const alerts: Array<any> = [];

        data.forEach((item: any) => {
          var unidade;

          if (item.variavel === 'Vento') {
            unidade = "Km/h";
          } else if (item.variavel === 'Chuva') {
            unidade = "mm/h";
          } else if (item.variavel === 'Temperatura') {
            unidade = "°C";
          } else if (item.variavel === 'Carga' || item.variavel === 'Umidade') {
            unidade = "%";
          }

          alerts.push({
            id: item.id_alerta,
            icon: item.variavel,
            title: item.apelido,
            filter: `${item.variavel} ${item.operador} ${item.valor_delimitante}${unidade}`
          });
        });

        setAlerts(alerts);
      });
    key = false
  }, [chave, modalCadIsOpen, modalEditIsOpen, modalDeleteIsOpen, isOpen]);

  // dispatch({
  //   type: 'key',
  //   payload: "CadastroAlerta"
  // });

  if (user === "user") {
    dispatch({
      type: 'key',
      payload: "null"
    });
  } else {
    dispatch({
      type: 'key',
      payload: "CadastroAlerta"
    });
  }


  const openEditModal = (id: number) => {
    setSelectedCardId(id)
    setModalEditIsOpen(true);
  }

  const openDeleteModal = (id: number) => {
    setSelectedCardId(id)
    setModalDeleteIsOpen(true);
  }

  const closeModal = () => {
    setModalDeleteIsOpen(false);
    setModalEditIsOpen(false);
    setModalCadIsOpen(false);

    dispatch({
      type: "modal",
      payload: false,
    })
  }

  return (
    <>
      <Field
        position="relative"
        width="100vw"
        display="flex"
        flexDirection="column"
        gap="50px"
      >
        <Field
          display="flex"
          flexDirection="column"
        >
          <Text
            fontFamily="Prompt"
            fontSize="20px"
            fontWeight="600"
          >
            Alertas
          </Text>
          <Field
            width="90%"
            display="flex"
            flexWrap="wrap"
            gap="50px"
          >
            {alerts.length !== 0 ?
              alerts?.map((item, index) => (
                <>
                  <CardAlerts
                    icon={item.icon}
                    filter={item.filter}
                    title={item.title}
                    openEditModal={() => openEditModal(item.id)}
                    openDeleteModal={() => openDeleteModal(item.id)}
                    key={index}
                    user={user}
                  />
                </>
              ))
              : <Text fontFamily="Prompt">Nenhum alerta.</Text>
            }
          </Field>
        </Field>

        {user === "admin" &&
          <>
            <ModalCadAlerta isOpen={isOpen} closeModal={closeModal} />
            <ModalArquivarAlerta isOpen={modalDeleteIsOpen} closeModal={closeModal} selectedCardId={selectedCardId} />
            <ModalEditarAlerta isOpen={modalEditIsOpen} closeModal={closeModal} selectedCardId={selectedCardId} />
          </>
        }

      </Field>
    </>
  )
}

export default Alertas;
