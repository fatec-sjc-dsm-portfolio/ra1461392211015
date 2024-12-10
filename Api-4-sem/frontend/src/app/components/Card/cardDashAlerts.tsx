import { Field } from "../Field/field";
import { Text } from "../Text/text";
import { useEffect, useState } from "react";
import Image, { StaticImageData } from "next/image";
import { FiEdit } from 'react-icons/fi'

import Vendaval from '../../../../public/img/Others/IconeVendaval.png'
import Tempestade from '../../../../public/img/Others/IconeTempestade.png'
import Geada from '../../../../public/img/Others/IconeGeada.png'
import BateriaFraca from '../../../../public/img/Others/IconeBateriaFraca.png'
import Desidratante from '../../../../public/img/Others/IconeDesidratante.png'
import Axios from "axios";

interface CardDashAlerts {
    selectedCardId?: number
  }

const CardDashAlerts: React.FC<CardDashAlerts> = ({ selectedCardId }) => {

    const iconMap: Record<string, StaticImageData> = {
        Vendaval, Tempestade, Geada,
        BateriaFraca, Desidratante, 
    };

    const [modalEditIsOpen, setModalEditIsOpen] = useState(false);
    // const [selectedCardId, setSelectedCardId] = useState<number | null>(null);
    const [alerts, setAlerts] = useState(Array<any>);
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

                var dataEs = resp.data;

                Axios.get(`https://testenumeroalfa.centralmeat.com.br/Alerta/getAll`, {
                    headers: {
                      'Authorization': `Bearer ${token}`
                    }
                  })
                .catch(function (error) {
                    console.log(error);
                })
                .then((resp: any) => {
    
                    var dataAle = resp.data;
                    var alerta: Array<any> = [];

                    dataEs.forEach((es: any) => {
                        if (es.id_estacao === selectedCardId) {                            
                            es.campos.forEach((prm: any) => {
                                let prm_nor = prm.tipo_parametro
                                dataAle.forEach((als: any) => {
                                    if (als.parametro_id == prm_nor.id_tipo_parametro) {
                                        alerta.push(
                                            {
                                                icon: als.apelido,
                                                title: als.apelido
                                            }
                                        )
                                    }
                                })
                            })
                        }                        
                    });
                    setAlerts(alerta)
                });
            });


    }, [])

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
                    Alertas
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
                    flexWrap="wrap"
                    gap="20px"
                    padding="30px"
                >
                    {alerts.length !== 0 ? (
                        alerts.map((item, index) => (
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
                                        color="black"
                                        fontSize="18px"
                                    >
                                        {item.title}
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
                        <Text fontFamily="Prompt">Nenhum alerta.</Text>
                    )}
                </Field>
            </Field>
        </Field>
    )
}

export default CardDashAlerts;