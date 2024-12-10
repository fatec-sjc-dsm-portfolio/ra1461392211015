import { Field } from "../Field/field";
import Modal from "./modal";
import { SaveButton } from "../Button/button";
import styled from "styled-components";
import { Text } from "../Text/text";
import { Form } from "../Form/form";
import { useForm } from "react-hook-form";
import { Input, Label } from "../Input/input";
import alertEdit from '../../model/alertEdit'
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


interface ModalAlert {
  isOpen?: boolean
  closeModal: () => void;
  selectedCardId?: number | null
}

const ModalEditarAlerta: React.FC<ModalAlert> = ({ isOpen, closeModal, selectedCardId }) => {

  const { register, handleSubmit, setValue } = useForm();
  // const user = localStorage.getItem("role")
  const user = typeof window !== 'undefined' ? localStorage.getItem('role') : null;

  // const token = localStorage.getItem("token")
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

  useEffect(() => {
    if (selectedCardId !== null) {
      Axios.get(`https://testenumeroalfa.centralmeat.com.br/Alerta/getOne/${selectedCardId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
        .then((resp: any) => {
          var data = resp.data;
          setValue("apelido", data.apelido);
          setValue("parameter", data.parametro_id);
          setValue("variavel", data.variavel);
          setValue("value", data.valor_delimitante);
          setValue("operator", data.operador);
        })
    }
  }, [selectedCardId, setValue]);

  const onSubmit = (data: any) => {
    const { parameter, value, operator, variavel, apelido } = data;

    if (!parameter || !value || !operator || !variavel || !apelido) {
      toast('Por favor, preencha todos os campos obrigatórios.', { type: "info" });
    } else {
      // Se todos os campos estiverem preenchidos, faça a solicitação Axios
      Axios.put("https://testenumeroalfa.centralmeat.com.br/Alerta/update", {
        id_alerta: selectedCardId,
        parametro_id: parameter,
        valor_delimitante: parseFloat(value.toString().replace(',', '.')),
        operador: operator,
        variavel: variavel,
        apelido: apelido
      }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }).then(() => {
        localStorage.setItem("key_edi_alerta", "1");
        closeModal();
      }).catch((error) => {
        console.error("Erro na solicitação Axios:", error);
        toast('Erro ao atualizar alerta!', { type: "error" });
      });
    }
  };


  return (
    <>
      <Modal
        isOpen={isOpen}
        closeModal={closeModal}
        title="Edição de Alerta"
      >
        <Field
          display="flex"
          alignItems="center"
          justifyContent="center"
          gap="30px"
        >
          <Field>
            <Form onSubmit={handleSubmit(onSubmit)}>
              {alertEdit?.map((item, index) => (
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

export default ModalEditarAlerta;
