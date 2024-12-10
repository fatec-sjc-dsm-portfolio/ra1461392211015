import { Field } from "../Field/field";
import { Text } from "../Text/text";
import Image, { StaticImageData } from "next/image";
import recentEvents from "@/app/model/recentEvents";
import { FiEdit } from 'react-icons/fi'

import Vendaval from '../../../../public/img/Others/IconeVendaval.png'
import Tempestade from '../../../../public/img/Others/IconeTempestade.png'
import Geada from '../../../../public/img/Others/IconeGeada.png'
import BateriaFraca from '../../../../public/img/Others/IconeBateriaFraca.png'
import Desidratante from '../../../../public/img/Others/IconeDesidratante.png'
import { useEffect, useState } from "react";
import Axios from "axios";

interface CardDashParameter {
    selectedCardId?: number
}

const CardDashEvents: React.FC<CardDashParameter> = ({ selectedCardId }) => {


    const [eventos, setEventos] = useState(Array<any>);
    // const user = localStorage.getItem("role")
    const user = typeof window !== 'undefined' ? localStorage.getItem('role') : null;

    // const token = localStorage.getItem("token")
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const eventosResponse = await Axios.get('https://testenumeroalfa.centralmeat.com.br/Evento/getAll', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                const parametrosResponse = await Axios.get('https://testenumeroalfa.centralmeat.com.br/Parametro/getAll', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                const eventos = eventosResponse.data;
                const parametros = parametrosResponse.data;

                const eventosEstacao = parametros
                    .filter((parametro: { id_estacao: number | undefined; }) => parametro.id_estacao === selectedCardId)
                    .flatMap((parametro: { id_tipo_parametro: any; }) =>
                        eventos
                            .filter((evento: { id_parametro: any; }) => evento.id_parametro === parametro.id_tipo_parametro)
                            .map(async (evento: { id_parametro: any; }) => {
                                const tipoParametroResponse = await Axios.get(`https://testenumeroalfa.centralmeat.com.br/TipoParametro/getOne/${parametro.id_tipo_parametro}`, {
                                    headers: {
                                        'Authorization': `Bearer ${token}`
                                    }
                                });
                                const tipoParametroData = tipoParametroResponse.data;
                                var icon
                                if (tipoParametroData.tipo_sensor == "Termômetro") {
                                    icon = 'Geada'
                                } else if (tipoParametroData.tipo_sensor == "Anenômetro") {
                                    icon = 'Vendaval'
                                } else if (tipoParametroData.tipo_sensor == "Pluviômetro") {
                                    icon = 'Tempestade'
                                } else if (tipoParametroData.tipo_sensor == "EBS") {
                                    icon = 'BateriaFraca'
                                } else if (tipoParametroData.tipo_sensor == "Higrômetro") {
                                    icon = 'Desidratante'
                                }

                                return {
                                    id_parametro: evento.id_parametro,
                                    icon: icon,
                                };
                            })
                    );

                const eventosFinal = (await Promise.all(eventosEstacao)).reduce((acc, evento) => {
                    const existingEvent = acc.find((item: { id_parametro: any; }) => item.id_parametro === evento.id_parametro);
                    if (!existingEvent) {
                        acc.push(evento);
                    }
                    return acc;
                }, []);

                setEventos(eventosFinal);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, [selectedCardId]);


    const iconMap: Record<string, StaticImageData> = {
        Vendaval, Tempestade, Geada,
        BateriaFraca, Desidratante,
    };

    const [modalEditIsOpen, setModalEditIsOpen] = useState(false);

    // const openEditModal = (id: number) => {
    //     setModalEditIsOpen(true);
    // }

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
                    Eventos recentes
                </Text>
            </Field>

            <Field
                display="flex"
                gap="20px"
                flexDirection="column"
                borderRadius="30px"
                backgroundColor="white"
                height="320px"
                width="380px"
                filter="drop-shadow(4px 4px 4px rgba(0, 0, 0, 0.25))"
            >
                <Field
                    display="flex"
                    flexDirection="column"
                    // flexWrap="wrap"
                    gap="20px"
                    padding="30px"
                >
                    {eventos.length !== 0 ? (
                        eventos.map((item, index) => (
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
                                    width={50}
                                    height={50}
                                />
                                <Field
                                    display="flex"
                                    flexDirection="column"
                                >
                                    <Text
                                        margin="0"
                                        color="#A40000"
                                        fontSize="18px"
                                    >
                                        {item.icon}
                                    </Text>
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
                        <Text fontFamily="Prompt">Nenhum evento.</Text>
                    )}
                </Field>
            </Field>
        </Field>
    )
}

export default CardDashEvents;