import { Field } from "../Field/field";
import { Text } from "../Text/text";
import Image, { StaticImageData } from "next/image";
import { FiEdit } from 'react-icons/fi'
import { ImBin } from 'react-icons/im'
import styled from "styled-components";

import Vendaval from '../../../../public/img/Others/IconeVendaval.png'
import Tempestade from '../../../../public/img/Others/IconeTempestade.png'
import Temperatura from '../../../../public/img/Others/IconeGeada.png'
import Bateria from '../../../../public/img/Others/IconeBateriaFraca.png'
import Umidade from '../../../../public/img/Others/IconeDesidratante.png'
import Pressão from '../../../../public/img/Others/IconePressao.png'

const Line = styled.div`
    width: 2px;
    height: 80%;
    background-color: #ACABAB;
`;


interface CardProps {
    title?: string
    icon?: string
    filter?: string
    openEditModal: () => void;
    openDeleteModal: () => void;
    user?: any
}

const CardAlerts: React.FC<CardProps> = ({ title, icon, filter, openEditModal, openDeleteModal, user }) => {

    const iconMap: Record<string, StaticImageData> = {
        Vendaval,
        Tempestade,
        Temperatura,
        Bateria,
        Umidade,
        Pressão
    };


    return (
        <Field
            display="flex"
            justifyContent="space-around"
            flexDirection="column"
            alignItems="flex-start"
            borderRadius="30px"
            backgroundColor="white"
            width="auto"
            height="140px"
            filter="drop-shadow(4px 4px 4px rgba(0, 0, 0, 0.25))"
        >
            <Field
                height="100%"
                display="flex"
                justifyContent="center"
                flexDirection="row"
                alignItems="center"
                paddingLeft="20px"
                gap="20px"
            >
                <Field
                    display="flex"
                    gap="20px"
                >
                    <Field
                        height="90px"
                        borderRadius="50%"
                        backgroundColor="white"
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                    >
                        <Image
                            src={iconMap[icon ?? '']}
                            alt="IconStation"
                            width={80}
                            height={80}
                        />
                    </Field>
                    <Field
                        display="flex"
                        flexDirection="column"
                        gap="10px"
                    >
                        <Text
                            margin="0"
                            color="black"
                            fontWeight="bold"
                            fontSize="19px"
                        >
                            {title}
                        </Text>
                        <Text
                            margin="0"
                            color="#65B307"
                        >
                            {filter}
                        </Text>
                    </Field>
                </Field>

                {user === "admin" ? (
                    <>
                        <Line />
                        <Field
                            height="60%"
                            display="flex"
                            justifyContent="space-between"
                            alignItems="center"
                            flexDirection="column"
                            paddingRight="20px"
                            fontSize="25px"
                            color="black"
                            cursor="pointer"
                        >
                            <FiEdit onClick={openEditModal} />
                            <ImBin onClick={openDeleteModal} />
                        </Field>
                    </>
                ) : <Text></Text>}

            </Field>
        </Field>
    )
}

export default CardAlerts;