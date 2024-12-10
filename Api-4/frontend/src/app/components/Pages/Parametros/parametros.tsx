import Card from "../../Card/cardParameter";
import { Field } from "../../Field/field";
import { Text } from "../../Text/text";
import ModalCadParametro from "../../Modals/cadastroParametro";
import ModalArquivarParametro from "../../Modals/arquivarParametro";
import ModalEditarParametro from "../../Modals/editarParametro";
import { useState, useEffect, useCallback } from "react";
import Axios from "axios";
import { toast } from "react-toastify";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/store/store"
import { text } from "stream/consumers";

const Parametros: React.FC = () => {
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
    localStorage.setItem("key_cad_param", "0");
    localStorage.setItem("key_edi_param", "0");
    localStorage.setItem("key_arq_param", "0");
    setChave((prevChave) => prevChave + 1);
  }, []);

  if (localStorage.getItem("key_cad_param") === '1') {
    toast('Parâmetro adicionado com sucesso!', { type: "success" });
    setChaveCallback();
  }
  if (localStorage.getItem("key_edi_param") === '1') {
    toast('Parâmetro editado com sucesso!', { type: "success" });
    setChaveCallback();
  }
  if (localStorage.getItem("key_arq_param") === '1') {
    toast('Parâmetro arquivado com sucesso!', { type: "success" });
    setChaveCallback();
  }

  const isOpen = useSelector((state: RootState) => state.modal);

  const dispatch = useDispatch();

  const [parameters, setParameters] = useState(Array<any>);
  const [parametersInative, setParametersInative] = useState(Array<any>);


  useEffect(() => {
    Axios.get(`https://testenumeroalfa.centralmeat.com.br/TipoParametro/getAll`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .catch(function (error) {
        console.log(error);
      })
      .then((resp: any) => {
        var data = resp.data;

        const parameters: Array<any> = [];
        const parametersInative: Array<any> = [];

        data.map((item: any) => {
          if (item.status_tipo_parametro) {
            parameters.push({
              id: item.id_tipo_parametro,
              icon: item.tipo_sensor,
              title: item.nome_sensor,
              type: item.tipo_sensor,
              backgroundColor: "white"
            });
          } else {
            parametersInative.push({
              id: item.id_tipo_parametro,
              icon: item.tipo_sensor,
              title: item.nome_sensor,
              type: item.tipo_sensor,
              backgroundColor: "#8CC1FF",
            });
          }
        });

        setParameters(parameters);
        setParametersInative(parametersInative);
      });
  }, [chave, modalCadIsOpen, modalEditIsOpen, modalDeleteIsOpen, isOpen]);


  if (user === "user") {
    dispatch({
      type: 'key',
      payload: "null"
    });
  } else {
    dispatch({
      type: 'key',
      payload: "CadastroParametro"
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
            Parâmetros
          </Text>
          {user === "admin" ? (
            <>

              <Field
                width="90%"
                display="flex"
                flexWrap="wrap"
                gap="50px"
              >
                {parameters.length !== 0 ?
                  parameters?.map((item, index) => (
                    <Card
                      icon={item.icon}
                      type={item.type}
                      title={item.title}
                      openEditModal={() => openEditModal(item.id)}
                      openDeleteModal={() => openDeleteModal(item.id)}
                      key={index}
                      ative={true}
                      user={false}
                    />

                  ))
                  : <Text fontFamily="Prompt">Nenhum parâmetro.</Text>
                }
              </Field>
            </>) : (
            <Field
              width="90%"
              display="flex"
              flexWrap="wrap"
              gap="50px"
            >
              {parameters.length !== 0 ?
                parameters?.map((item, index) => (
                  <>
                    <Card
                      icon={item.icon}
                      type={item.type}
                      title={item.title}
                      openEditModal={undefined}
                      openDeleteModal={undefined}
                      key={index}
                      ative={true}
                      user={true}
                    />
                  </>
                ))
                : <Text fontFamily="Prompt">Nenhum parâmetro.</Text>
              }
            </Field>
          )
          }

          <Text
            fontFamily="Prompt"
            fontSize="20px"
            fontWeight="600"
            marginTop="60px"
          >
            Parâmetros Inativos
          </Text>
          <Field
            width="90%"
            display="flex"
            flexWrap="wrap"
            gap="50px"
          >
            {parameters.length !== 0 ?
              parametersInative?.map((item, index) => (
                <Card
                  filter={"brightness(0.60) opacity(0.75) drop-shadow(4px 4px 4px rgba(0, 0, 0, 0.25))"}
                  icon={item.icon}
                  type={item.type}
                  title={item.title}
                  key={index}
                  ative={false}
                  user={true}
                />
              ))
              : <Text fontFamily="Prompt">Nenhum parâmetro.</Text>
            }
          </Field>
        </Field>
        <ModalCadParametro
          isOpen={isOpen}
          closeModal={closeModal}
        />
        <ModalArquivarParametro
          isOpen={modalDeleteIsOpen}
          closeModal={closeModal}
          selectedCardId={selectedCardId}
        />
        <ModalEditarParametro
          isOpen={modalEditIsOpen}
          closeModal={closeModal}
          selectedCardId={selectedCardId}
        />
      </Field>
    </>
  )
}

export default Parametros;
