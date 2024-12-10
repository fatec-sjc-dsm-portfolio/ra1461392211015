import { Field } from "../Field/field";
import Modal from "./modal";
import { StationSendButton, SubmitButton } from "../Button/button";
import styled from "styled-components";
import { Text } from "../Text/text";
import { Form } from "../Form/form";
import { useForm } from "react-hook-form";
import { Input, Label, Select } from "../Input/input";
import alertsRegister from "../../model/alertsRegister";
import Axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

interface ModalAlert {
  isOpen?: boolean;
  closeModal: () => void;
}

interface AlertOption {
  id: string;
  title: string;
}

interface Alert {
  title: string;
  name: string;
  isSelect: boolean;
  options: AlertOption[];
}

const ModalCadAlerta: React.FC<ModalAlert> = ({ isOpen, closeModal }) => {
  const { register, handleSubmit } = useForm();
  const [alertsRe, setAlertsRe] = useState<Alert[]>([]);
  // const user = localStorage.getItem("role")
  const user = typeof window !== 'undefined' ? localStorage.getItem('role') : null;

  // const token = localStorage.getItem("token")
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await Axios.get("https://testenumeroalfa.centralmeat.com.br/TipoParametro/getAll", {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const data = response.data;

        const filteredParameters: AlertOption[] = data
          .filter((item: any) => item.status_tipo_parametro)
          .map((item: any) => ({
            id: item.id_tipo_parametro,
            title: item.nome_sensor
          }));

        const alerts: AlertOption[] = filteredParameters.map(({ id, title }) => ({
          id,
          title,
        }));

        alerts.unshift({ id: '1', title: '' });

        alertsRegister[1].options = alerts;

        setAlertsRe(alertsRegister);

      } catch (error) {
        console.error("Error fetching");
      }
    };

    fetchData();
  }, []);

  const onSubmit = (data: any) => {
    const { parameter, value, operator, variavel, apelido } = data;

    console.log({
      parametro_id: parameter,
      valor_delimitante: value.replace(",", "."),
      operador: operator,
      variavel: variavel,
      apelido: apelido
    });

    if (!parameter || !value || !operator || !variavel || !apelido) {
      toast('Por favor, preencha todos os campos obrigatórios.', { type: "info" });
    } else {
      Axios.post("https://testenumeroalfa.centralmeat.com.br/Alerta/create", {
        parametro_id: parameter,
        valor_delimitante: value.replace(",", "."),
        operador: operator,
        variavel: variavel,
        apelido: apelido
      }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
        .then(() => {
          localStorage.setItem("key_cad_alerta", "1");
          closeModal();
        })
        .catch((error) => {
          console.error("Erro na solicitação Axios:", error);
          toast('Erro ao criar alerta!', { type: "error" });
        });
    }
  };


  return (
    <>
      <Modal
        isOpen={isOpen}
        closeModal={closeModal}
        title="Cadastro de Alerta"
      >
        <Field
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Field>
            <Form onSubmit={handleSubmit(onSubmit)}>
              {alertsRe?.map((item, index) => (
                <Field key={index} width="100%" height="100%">
                  <Label
                    fontSize="16px"
                    fontFamily="Prompt"
                    fontWeight="500"
                    color="black"
                  >
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
                      margin="2px 0px 4px 0px"
                      {...register(item.name)}
                    >
                      {item.options.map(({ id, title }, optionIndex) => (
                        <option key={optionIndex} value={id}>
                          {title}
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
                      margin="2px 0px 4px 0px"
                      {...register(item.name)}
                    />
                  )}
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

export default ModalCadAlerta;