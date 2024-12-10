import { Field } from "../Field/field";
import { Text } from "../Text/text";
import Image, { StaticImageData } from "next/image";
import Anenômetro from '../../../../public/img/Others/IconeDirecaoDoVento.png'
import EBS from '../../../../public/img/Others/IconeBateria.png'
import Anemógrafo from '../../../../public/img/Others/IconeVelocidadeVento.png'
import Higrômetro from '../../../../public/img/Others/IconeUmidade.png'
import Barômetro from '../../../../public/img/Others/IconePressao.png'
import Pluviômetro from '../../../../public/img/Others/IconeChuva.png'
import Termômetro from '../../../../public/img/Others//IconeTemperatura.png'

import { FiEdit } from 'react-icons/fi'
import { ImBin } from 'react-icons/im'

import styled from "styled-components";


const Line = styled.div`
    width: 2px;
    height: 80%;
    background-color: #ACABAB;
`;


interface CardProps {
    title?: string;
    icon?: string;
    type?: string;
    openEditModal?: () => void;
    openDeleteModal?: () => void;
    ative?: boolean;
    filter?: string
    user?: boolean
}

const Card: React.FC<CardProps> = ({ title, icon, type, openEditModal, openDeleteModal, ative, filter, user }) => {

    const iconMap: Record<string, StaticImageData> = {
        Anenômetro,
        EBS,
        Anemógrafo,
        Higrômetro,
        Barômetro,
        Pluviômetro,
        Termômetro,
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
            filter={filter ?? "drop-shadow(4px 4px 4px rgba(0, 0, 0, 0.25))"}
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
                        // backgroundColor={backgroundColor}
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
                            {type}
                        </Text>
                    </Field>
                </Field>

                {ative && !user ? (
                    <>
                        <Line />
                    </>
                ) : null}
                
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
                    {ative && !user ? (
                        <>
                            <FiEdit onClick={openEditModal} />
                            <ImBin onClick={openDeleteModal} />
                        </>
                    ) : null}


                </Field>
            </Field>
        </Field>
    )
}

export default Card;