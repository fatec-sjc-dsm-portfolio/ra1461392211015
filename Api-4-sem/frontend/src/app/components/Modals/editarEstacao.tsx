import { Field } from "../Field/field";
import Modal from "./modal";
import { SaveButton } from "../Button/button";
import styled from "styled-components";
import { Text } from "../Text/text";
import { Form } from "../Form/form";
import { useForm } from "react-hook-form";
import { Input, Label } from "../Input/input";
import stationEdit from '../../model/stationEdit'
import Axios from "axios";
import { useEffect } from "react";
import Estacoes from "../Pages/Estacoes/estacoes";
import { useDispatch } from "react-redux";

interface ModalParams {
  isOpen?: boolean
  closeModal: () => void;
  selectedCardId?: number | null
}

const ModalEditarEstacao: React.FC<ModalParams> = ({ isOpen, closeModal, selectedCardId }) => {

  const { register, handleSubmit, setValue } = useForm();

  const dispatch = useDispatch();
  // const user = localStorage.getItem("role")
  const user = typeof window !== 'undefined' ? localStorage.getItem('role') : null;

  // const token = localStorage.getItem("token")
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

  dispatch({
    type: 'key',
    payload: null
  });

  const backButton = () => {
    dispatch({
      type: 'page',
      payload: <Estacoes />
    });
  }

  useEffect(() => {
    Axios.get(`https://testenumeroalfa.centralmeat.com.br/estacao/getOne/${selectedCardId}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then((resp: any) => {
        var data = resp.data;
        setValue("name", data.nome_estacao);
        setValue("nickname", data.apelido);
        setValue("mac", data.mac_adress);
        setValue("latitude", data.latitude);
        setValue("longitude", data.longitude);
        setValue("address", data.endereco);
      })
  }, [selectedCardId, setValue]);

  const onSubmit = (data: any) => {
    Axios.put("https://testenumeroalfa.centralmeat.com.br/estacao/update", {
      id_estacao: selectedCardId,
      mac_adress: data["mac"],
      nome_estacao: data["name"],
      apelido: data["nickname"],
      latitude: parseFloat(data.latitude.toString().replace(',', '.')),
      longitude: parseFloat(data.longitude.toString().replace(',', '.')),
      endereco: data['address']
    }, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }).then(() => {
      localStorage.setItem("key_edi_estacao", "1");
      closeModal();
    })
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        closeModal={closeModal}
        title="Editar estação"
      >
        <Field
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Form onSubmit={handleSubmit(onSubmit)}>
            {stationEdit?.map((item, index) => (
              <Field
                key={index}
              >
                <Label
                  fontSize="16px"
                  fontFamily="Prompt"
                  fontWeight="500"
                  color="black"
                >
                  {item.title}
                </Label>
                <Input
                  type="text"
                  display="flex"
                  flexDirection="column"
                  width="600px"
                  height="18px"
                  border="none"
                  borderRadius="20px"
                  padding="10px"
                  fontFamily="Prompt"
                  fontSize="15px"
                  backgroundColor="#D9D9D9"
                  boxShadow="0px 4px 4px 0px rgba(0, 0, 0, 0.25) inset"
                  margin="2px 0px 4px 0px"
                  {...register(item.name)}
                />
              </Field>
            ))}

            <Field
              display="flex"
              justifyContent="center"
              marginTop="5px"
            >
              <Field
                display="flex"
                flexDirection="row"
                justifyContent="flex-end"
                width="600px"
              >
                <SaveButton />
              </Field>
            </Field>
          </Form>
        </Field>
      </Modal>
    </>
  )
}

export default ModalEditarEstacao;
