import { Field } from "../Field/field"
import { useDispatch } from "react-redux";
import { ArchiveButton, BackButton, EditButton } from "../Button/button"
import Axios from "axios";
import { useCallback, useEffect, useState } from "react";

import ModalEditarEstacao from "../Modals/editarEstacao"
import ModalArquivarEstacao from "../Modals/arquivarEstacao"

import CardDashParameters from "../Card/cardDashParameters"
import CardDashAlerts from "../Card/cardDashAlerts"
import CardDashEvents from "../Card/cardDashEvents"

import CardGraphic from "../Card/cardGraphic"
import { toast } from "react-toastify";

interface Dashboard {
  selectedCardId?: number
}

const Dashboard: React.FC<Dashboard> = ({ selectedCardId }) => {

  const dispatch = useDispatch();
  const [chave, setChave] = useState(0);
  const [parameters, setParameters] = useState<Array<any>>([]);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openArchiveModal, setOpenArchiveModal] = useState(false);
  // const user = localStorage.getItem("role")
  const user = typeof window !== 'undefined' ? localStorage.getItem('role') : null;

  // const token = localStorage.getItem("token")
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

  const setChaveCallback = useCallback(() => {
    localStorage.setItem("key_edi_estacao", "0");
    setChave((prevChave) => prevChave + 1);
  }, []);

  dispatch({
    type: 'dashboardValid',
    payload: true,
  });


  const handleOpenEditModalClick = () => {
    setOpenEditModal(true);
  }

  const handleOpenArchiveModalClick = () => {
    setOpenArchiveModal(true);
  }

  const closeModal = () => {
    setOpenEditModal(false);
    setOpenArchiveModal(false);
  }

  useEffect(() => {
    Axios.get(`https://testenumeroalfa.centralmeat.com.br/estacao/getAll`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then((resp: any) => {
        var data = resp.data;
        var parameter: Array<any> = [];

        data.forEach((item: any) => {
          if (item.id_estacao === selectedCardId) {
            item.campos.forEach((prm: any) => {
              let prm_nor = prm.tipo_parametro;
              if (prm_nor.status_tipo_parametro) {
                parameter.push(prm_nor.tipo_sensor);
              }
            });
          }
        });

        setParameters(parameter);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [chave, selectedCardId])

  if (localStorage.getItem("key_edi_estacao") === '1') {
    toast('Estação editada com sucesso!', { type: "success" });
    setChaveCallback();
  }

  return (

    <Field
      display="flex"
      flexDirection="column"
      height="45%"
      overflowY="auto"
    >
      <Field
        display="flex"
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
        width="98%"
      >

        <CardDashParameters selectedCardId={selectedCardId} />

        <CardDashAlerts selectedCardId={selectedCardId} />

        <CardDashEvents selectedCardId={selectedCardId} />

      </Field>

      <Field
        margin="50px 0px"
        display="flex"
        justifyContent="center"
        gap="50px"
        flexWrap="wrap"
        paddingBottom="500px"
      >
        {
          parameters?.map((parameter) => (
            <>
              {parameter !== "EBS" && parameter !== "Anemógrafo" ? (
                <CardGraphic selectedCardId={selectedCardId} parameter={parameter} />
              ) : null}
            </>
          ))}
      </Field>

      {user === "admin" &&
        <Field
          position="absolute"
          bottom="0"
          right="0"
          margin="25px 45px"
          width="100%"
          display="flex"
          justifyContent="flex-end"
          gap="10px"
        >
          <EditButton onClick={() => handleOpenEditModalClick()} />
          <ArchiveButton onClick={() => handleOpenArchiveModalClick()} />
          <ModalArquivarEstacao isOpen={openArchiveModal} closeModal={closeModal} selectedCardId={selectedCardId} />
          <ModalEditarEstacao isOpen={openEditModal} closeModal={closeModal} selectedCardId={selectedCardId} />
        </Field>
      }
    </Field>
  )
}

export default Dashboard;