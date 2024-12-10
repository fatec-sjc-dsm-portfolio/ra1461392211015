import { Field } from "../Field/field";
import Modal from "./modal";
import { SaveButton } from "../Button/button";
import styled from "styled-components";
import { Text } from "../Text/text";
import { Form } from "../Form/form";
import { useForm } from "react-hook-form";
import { Input, Label } from "../Input/input";
import parameterEdit from '../../model/parameterEdit'
import Axios from "axios";
import { useEffect } from "react";
import { toast } from "react-toastify";


const IconField = styled.img`
    width: 200px;
    height: 200px;
    border-radius: 50%;
    object-fit: cover;
    border: 2px solid #fff;
    cursor: pointer;
`;


interface ModalParams {
  isOpen?: boolean
  closeModal: () => void;
  selectedCardId?: number | null
}

const ModalEditarParametro: React.FC<ModalParams> = ({ isOpen, closeModal, selectedCardId }) => {

  const { register, handleSubmit, setValue } = useForm();
  // const user = localStorage.getItem("role")
  const user = typeof window !== 'undefined' ? localStorage.getItem('role') : null;

  // const token = localStorage.getItem("token")
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

  useEffect(() => {
    Axios.get(`https://testenumeroalfa.centralmeat.com.br/TipoParametro/getOne/${selectedCardId}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then((resp: any) => {
        var data = resp.data;
        setValue("name", data.nome_sensor);
        setValue("tipo", data.tipo_sensor);
        setValue("apelido", data.nome_campo_json);
        setValue("factor", data.fator);
        setValue("offset", data.offset);
      })
  }, [selectedCardId, setValue]);

  const onSubmit = (data: any) => {
    const { name, tipo, factor, offset } = data;

    if (!name || !tipo || !factor || !offset) {
      toast('Por favor, preencha todos os campos obrigatórios.', { type: "info" });
    } else {
      Axios.put("https://testenumeroalfa.centralmeat.com.br/TipoParametro/update", {
        id_tipo_parametro: selectedCardId,
        nome_campo_json: data["apelido"],
        tipo_sensor: tipo,
        nome_sensor: name,
        fator: parseFloat(factor.toString().replace(',', '.')),
        offset: parseFloat(offset.toString().replace(',', '.'))
      }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }).then(() => {
        localStorage.setItem("key_edi_param", "1");
        closeModal();
      }).catch((error) => {
        console.error("Erro na solicitação Axios:", error);
        toast('Erro ao atualizar parâmetro!', { type: "error" });
      });
    }
  };


  return (
    <>
      <Modal
        isOpen={isOpen}
        closeModal={closeModal}
        title="Edição de parâmetro"
      >
        <Field
          display="flex"
          alignItems="center"
          justifyContent="center"
          gap="30px"
        >
          <Field>
            <Form onSubmit={handleSubmit(onSubmit)}>
              {parameterEdit?.map((item, index) => (
                <Field
                  key={index}
                >
                  <Label
                    fontSize="18px"
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
                    height="24px"
                    border="none"
                    borderRadius="20px"
                    padding="10px"
                    fontFamily="Prompt"
                    fontSize="16px"
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
                marginTop="10px"
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
        </Field>
      </Modal>
    </>
  )
}

export default ModalEditarParametro;
