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
import { useEffect, useState } from "react";
import Image, { StaticImageData } from "next/image";
import Anenômetro from '../../../../public/img/Others/IconeDirecaoDoVento.png'
import EBS from '../../../../public/img/Others/IconeBateria.png'
import Anemógrafo from '../../../../public/img/Others/IconeVelocidadeVento.png'
import Higrômetro from '../../../../public/img/Others/IconeUmidade.png'
import Barômetro from '../../../../public/img/Others/IconePressao.png'
import Pluviômetro from '../../../../public/img/Others/IconeChuva.png'
import Termômetro from '../../../../public/img/Others//IconeTemperatura.png'


interface ModalAlert {
  closeModal: () => void;
  isOpen?: boolean;
  onSubmit: (data: any) => void;
}

const ModalEditarAlerta: React.FC<ModalAlert> = ({ closeModal, isOpen, onSubmit }) => {

  const iconMap: Record<string, StaticImageData> = {
    Anenômetro,
    EBS,
    Anemógrafo,
    Higrômetro,
    Barômetro,
    Pluviômetro,
    Termômetro,
  };

  const [parameters, setParameters] = useState(Array<any>);

  useEffect(() => {
      Axios.get(`http://127.0.0.1:3001/TipoParametro/getAll`)
        .catch(function (error) {
          console.log(error);
        })
        .then((resp: any) => {
          var data = resp.data;

          const parameters: Array<any> = [];

          data.map((item: any) => {
            if (item.status_tipo_parametro) {
              parameters.push({
                id: item.id_tipo_parametro,
                icon: item.tipo_sensor,
                title: item.nome_sensor,
                type: item.tipo_sensor,
                backgroundColor: "white"
              });
            }
          });

          setParameters(parameters);
        });
  }, [])
  
  const { register, handleSubmit, } = useForm()

  const handleFormSubmit = (data: any) => {
    onSubmit(data.parameters);
    closeModal()
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        closeModal={closeModal}
        title="Tipo de Parâmetros"
        background="#E7E7E7"
      >
        <Field
          display="flex"
          alignItems="center"
          justifyContent="center"
          gap="60px"
        >
          <Form onSubmit={handleSubmit(handleFormSubmit)}>
            <Field
             display="flex"
             flexDirection="column"
             gap="100px"
            >
             <Field
              display="flex"
              flexWrap="wrap"
              gap="30px"
             >
              {parameters.length !== 0 ?
                parameters?.map(item => (
                  <Field
                    display="flex"
                    alignItems="center"
                    justifyContent="space-around"
                    borderRadius="20px"
                    width="250px"
                    height="90px"
                    backgroundColor="#FFFFFF"
                  >
                    <Field
                      display="flex"
                      alignItems="flex-start"
                      gap="10px"
                    >
                      <Image
                          src={iconMap[item.icon ?? '']}
                          alt="IconStation"
                          width={50}
                          height={50}
                      />
                      <Field
                        display="flex"
                        flexDirection="column"
                        gap="5px"
                      >
                        <Text 
                          fontWeight="bold"
                          alignItems="flex-start"
                          margin="0px"
                        >
                          {item.type}
                        </Text>
                        <Text
                          color="#65B307"
                          margin="0"
                        >
                          {item.title}
                        </Text>
                      </Field>
                    </Field>
                    <Input type="checkbox" value={parseInt(item.id, 10)} {...register('parameters')} />
                  </Field>
                ))
                : <Text fontFamily="Prompt">Nenhum parâmetro.</Text>
              }
             </Field>

             <Field
               width="100%"
               display="flex"
               justifyContent="flex-end"
               alignItems="flex-end"
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

export default ModalEditarAlerta;
