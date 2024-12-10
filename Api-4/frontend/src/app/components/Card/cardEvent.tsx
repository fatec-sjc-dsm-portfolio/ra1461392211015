import { Field } from "../Field/field";
import { Text } from "../Text/text";
import Image, { StaticImageData } from "next/image";
import Vendaval from '../../../../public/img/Others/IconeVendaval.png'
import Tempestade from '../../../../public/img/Others/IconeTempestade.png'
import Geada from '../../../../public/img/Others/IconeGeada.png'
import BateriaFraca from '../../../../public/img/Others/IconeBateriaFraca.png'
import Desidratante from '../../../../public/img/Others/IconeDesidratante.png'
import Anemógrafo from '../../../../public/img/Others/IconeVelocidadeVento.png'
import Higrômetro from '../../../../public/img/Others/IconeUmidade.png'
import Barômetro from '../../../../public/img/Others/IconePressao.png'
import Pluviômetro from '../../../../public/img/Others/IconeChuva.png'
import Termômetro from '../../../../public/img/Others//IconeTemperatura.png'
import Anenômetro from '../../../../public/img/Others/IconeDirecaoDoVento.png'
import EBS from '../../../../public/img/Others/IconeBateria.png'


import styled from "styled-components";

import { FiAlertTriangle } from 'react-icons/fi'


interface CardProps {
    title?: string
    icon?: string
    filter?: string
    actual_value?: string
    date?: string
    hour?: string 
    station_name?: string 
    station_location?: string 
}

const CardEvents: React.FC<CardProps> = ({ title, icon, filter, actual_value, date, hour, station_name, station_location}) => {

    const iconMap: Record<string, StaticImageData> = {
        Vendaval,
        Tempestade,
        Geada,
        BateriaFraca,
        Desidratante,
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
            height="160px"
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
                        gap="3px"
                    >
                        <Text
                            margin="0"
                            color="#A40000"
                            fontWeight="Bold"
                            fontSize="19px"
                            
                        >
                            {title}
                        </Text>
                        <Text
                            margin="0"
                            color="#000000"
                            fontSize="16px"
                        >
                            {filter}
                        </Text>

                        <Field
                         display="flex"
                         flexDirection="line"
                         gap="4px"
                        >
                            <FiAlertTriangle/>
                            <Text
                                margin="0"
                                color="#000000"
                                fontSize="16px"
                                paddingRight="50px"
                            >
                                
                                {actual_value}
                            </Text>
                        </Field>
                    
                    </Field>



                    <Field
                        display="flex"
                        flexDirection="column"
                        gap="5px"
                        paddingRight="25px"
        
                    >
                        <Text
                            margin="0"
                            color="#000000"
                            fontSize="16"
                            paddingLeft="127px"
                        >
                            {date}
                        </Text>
                        <Text
                            margin="0"
                            paddingLeft="145px"
                            color="#000000"
                            fontSize="16"
                        >
                            {hour}
                        </Text>
                    </Field>
                </Field>
            </Field>

            <Field>
                    <Field
                        display="flex"
                        flexDirection="column"
                    
                    >
                        <Text
                            margin="0"
                            paddingLeft="25px"
                            color="#090909"
                            fontWeight="bold"
                            fontSize="16px"
                        >
                            {station_name}
                        </Text>
                        <Text
                            margin="0"
                            paddingLeft="25px"
                            paddingBottom="10px"
                            color="#090909"
                            fontSize="16px"
                        >
                            {station_location}
                        </Text>
            </Field>
        </Field>
        </Field>
    )
}

export default CardEvents;