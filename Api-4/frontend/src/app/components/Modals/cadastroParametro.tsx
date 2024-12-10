import { Field } from "../Field/field";
import Modal from "./modal";
import { StationSendButton, SubmitButton } from "../Button/button";
import styled from "styled-components";
import { Text } from "../Text/text";
import { Form } from "../Form/form";
import { useForm } from "react-hook-form";
import { Input, Label, Select } from "../Input/input";
import parameterRegister from '../../model/parameterRegister'
import Axios from "axios";
import { toast } from "react-toastify";

const IconField = styled.img`
    width: 300px;
    height: 300px;
    border-radius: 50%;
    object-fit: cover;
    border: 2px solid #fff;
    cursor: pointer;
`;


interface ModalParams {
  isOpen?: boolean
  closeModal: () => void;
}

const ModalCadParametro: React.FC<ModalParams> = ({ isOpen, closeModal }) => {

  const { register, handleSubmit } = useForm()
  // const user = localStorage.getItem("role")
  const user = typeof window !== 'undefined' ? localStorage.getItem('role') : null;

  // const token = localStorage.getItem("token")
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  const onSubmit = (data: any) => {
    var json;

    const { name, tipo, factor, offset } = data;

    if (!name || !tipo || !factor || !offset) {
      toast('Por favor, preencha todos os campos obrigatórios.', { type: "info" });
    } else {
      if (data["tipo"] == 'Anenômetro') {
        json = 'vel';
      } else if (data["tipo"] == 'EBS') {
        json = 'bat';
      } else if (data["tipo"] == 'Higrômetro') {
        json = 'umi';
      } else if (data["tipo"] == 'Anemógrafo') {
        json = 'dir';
      } else if (data["tipo"] == 'Barômetro') {
        json = 'prs';
      } else if (data["tipo"] == 'Pluviômetro') {
        json = 'plu';
      } else if (data["tipo"] == 'Termômetro') {
        json = 'temp';
      }
      Axios.post("https://testenumeroalfa.centralmeat.com.br/TipoParametro/create", {
        nome_campo_json: json,
        nome_sensor: name,
        tipo_sensor: tipo,
        fator: parseFloat(factor.replace(',', '.')),
        offset: parseFloat(offset.replace(',', '.'))
      }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }).then(() => {
        localStorage.setItem("key_cad_param", "1");
        closeModal();
      }).catch((error) => {
        console.error("Erro na solicitação Axios:", error);
        toast('Erro ao cadastrar parâmetro!', { type: "error" });
      });
    }
  };


  return (
    <>
      <Modal
        isOpen={isOpen}
        closeModal={closeModal}
        title="Cadastro de Parâmetro"
      >
        <Field
          display="flex"
        >
          <Field>
            <Form onSubmit={handleSubmit(onSubmit)}>
              {parameterRegister?.map((item, index) => (
                <Field key={index}
                  width="100%"
                  height="100%"
                >
                  <Label
                    fontSize="18px"
                    fontFamily="Prompt"
                    fontWeight="500"
                    color="black">
                    {item.title}
                  </Label>

                  {item.isSelect ? (
                    <Select
                      type="text"
                      display="flex"
                      flexDirection="column"
                      width="100%"
                      border="none"
                      borderRadius="20px"
                      padding="10px"
                      fontFamily="Prompt"
                      fontSize="16px"
                      backgroundColor="#D9D9D9"
                      boxShadow="0px 4px 4px 0px rgba(0, 0, 0, 0.25) inset"
                      margin="4px 0px 12px 0px"
                      {...register(item.name)}
                    >
                      {item.options.map((option, optionIndex) => (
                        <option key={optionIndex} value={option.id}>
                          {option.title}
                        </option>
                      ))}
                    </Select>
                  ) : (
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
                      margin="4px 0px 12px 0px"
                      {...register(item.name)}
                    />
                  )}
                </Field>
              ))}

              <Field
                display="flex"
                justifyContent="center"
                marginTop="20px"
              >
                <Field
                  display="flex"
                  flexDirection="row"
                  justifyContent="flex-end"
                  width="600px"
                >
                  <StationSendButton />
                </Field>
              </Field>
            </Form>
          </Field>
        </Field>
      </Modal>
    </>
  )
}

export default ModalCadParametro;
