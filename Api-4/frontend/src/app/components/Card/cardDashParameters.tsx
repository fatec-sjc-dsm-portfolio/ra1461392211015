import { Field } from "../Field/field";
import { Text } from "../Text/text";
import { useEffect, useState } from "react";
import Image, { StaticImageData } from "next/image";
import { FiEdit } from 'react-icons/fi'

import Anenômetro from '../../../../public/img/Others/IconeDirecaoDoVento.png'
import EBS from '../../../../public/img/Others/IconeBateria.png'
import Anemógrafo from '../../../../public/img/Others/IconeVelocidadeVento.png'
import Higrômetro from '../../../../public/img/Others/IconeUmidade.png'
import Barômetro from '../../../../public/img/Others/IconePressao.png'
import Pluviômetro from '../../../../public/img/Others/IconeChuva.png'
import Termômetro from '../../../../public/img/Others//IconeTemperatura.png'
import Axios from "axios";

interface CardDashParameter {
    selectedCardId?: number
}

const CardDashParameters: React.FC<CardDashParameter> = ({ selectedCardId }) => {


    const [parameters, setParameters] = useState(Array<any>);
    const [bat, setBat] = useState(String);
    // const user = localStorage.getItem("role")
    const user = typeof window !== 'undefined' ? localStorage.getItem('role') : null;

    // const token = localStorage.getItem("token")
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

    useEffect(() => {

        Axios.get(`https://testenumeroalfa.centralmeat.com.br/estacao/getAll`, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          })
            .catch(function (error) {
                console.log(error);
            })
            .then((resp: any) => {

                var data = resp.data;
                var parameter: Array<any> = [];


                data.forEach((item: any) => {
                    if (item.id_estacao === selectedCardId) {
                        item.campos.forEach((prm: any) => {
                            let prm_nor = prm.tipo_parametro


                            if (prm_nor.status_tipo_parametro) {
                                if (prm_nor.nome_campo_json === "bat") {

                                    Axios.get(`https://testenumeroalfa.centralmeat.com.br/Medida/bateria/${selectedCardId}/${prm_nor.id_tipo_parametro}`, {
                                        headers: {
                                          'Authorization': `Bearer ${token}`
                                        }
                                      })
                                        .catch(function (error) {
                                            console.log(error);
                                        })
                                        .then((resp: any) => {

                                            var data = resp.data;
                                            setBat(data.valor_medida.toFixed(2).replace('.', ','))
                                        });

                                }
                                parameter.push(
                                    {
                                        icon: prm_nor.tipo_sensor,
                                        title: prm_nor.nome_sensor,
                                        type: prm_nor.tipo_sensor,
                                    }
                                )


                            }
                        })
                    }
                });

                setParameters(parameter);
            });



    }, [])


    const iconMap: Record<string, StaticImageData> = {
        Anenômetro, EBS, Anemógrafo, Higrômetro,
        Barômetro, Pluviômetro, Termômetro,
    };

    const [modalEditIsOpen, setModalEditIsOpen] = useState(false);
    // const [selectedCardId, setSelectedCardId] = useState<number | null>(null);

    const openEditModal = (id: number) => {
        // setSelectedCardId(id);
        setModalEditIsOpen(true);
    }

    return (
        <Field>
            <Field>
                <Text
                    fontFamily="Prompt"
                    fontSize="20px"
                    fontWeight="500"
                    margin="0px"
                    paddingBottom="5px"
                >
                    Parâmetros
                </Text>
            </Field>

            <Field
                display="flex"
                gap="20px"
                flexDirection="column"
                borderRadius="30px"
                backgroundColor="white"
                height="320px"
                width="450px"
                filter="drop-shadow(4px 4px 4px rgba(0, 0, 0, 0.25))"
            >
                <Field
                    display="flex"
                    flexWrap="wrap"
                    gap="20px"
                    padding="30px"
                >
                    {parameters.length !== 0 ? (
                        parameters.map((item, index) => (
                            <Field
                                display="flex"
                                flexDirection="row"
                                alignItems="center"
                                gap="20px"
                                flex="1"
                                margin="10px"
                            >
                                <Image
                                    src={iconMap[item.icon ?? '']}
                                    alt="IconStation"
                                    width={40}
                                    height={40}
                                />
                                <Field
                                    display="flex"
                                    flexDirection="column"
                                >
                                    <Text
                                        margin="0"
                                        color="black"
                                        fontSize="18px"
                                    >
                                        {item.title}
                                    </Text>
                                    {bat !== '' && item.icon === 'EBS' && (
                                        <>
                                            <Text
                                                margin="0"
                                                color="red"
                                                fontSize="18px"
                                            >
                                                {bat}%
                                            </Text>
                                        </>
                                    )}

                                    {/* <Field
                                        fontSize="22px"
                                        color="black"
                                        cursor="pointer"
                                    >
                                        <FiEdit onClick={openEditModal} />
                                    </Field> */}
                                </Field>

                            </Field>
                        ))
                    ) : (
                        <Text fontFamily="Prompt">Nenhum parâmetro.</Text>
                    )}
                </Field>
            </Field>
        </Field>
    )
}

export default CardDashParameters;