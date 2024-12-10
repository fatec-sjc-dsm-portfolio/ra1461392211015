import { Field } from "../Field/field";
import { Text } from "../Text/text";
import Image, { StaticImageData } from "next/image";
import IconeStation from '../../../../public/img/Others/IconeCardEstacao.png'
import Anenômetro from '../../../../public/img/Others/IconeDirecaoDoVento.png'
import EBS from '../../../../public/img/Others/IconeBateria.png'
import Anemógrafo from '../../../../public/img/Others/IconeVelocidadeVento.png'
import Higrômetro from '../../../../public/img/Others/IconeUmidade.png'
import Barômetro from '../../../../public/img/Others/IconePressao.png'
import Pluviômetro from '../../../../public/img/Others/IconeChuva.png'
import Termômetro from '../../../../public/img/Others//IconeTemperatura.png'

import { useDispatch } from "react-redux";
import Dashboard from "../dashboards/dashboard";
import { toast } from "react-toastify";
import DashboardInfo from "../dashboards/dashboardInfo";


interface CardProps {
    backgroundColor?: string
    filter?: string
    stationName?: string
    macAdress?: string
    icons?: string[]
    inativa?: boolean
    selectedCardId?: number | null
}

const Card: React.FC<CardProps> = ({ backgroundColor, stationName, macAdress, icons, filter, inativa, selectedCardId }) => {

    const iconMap: Record<string, StaticImageData> = {
        Anenômetro,
        EBS,
        Anemógrafo,
        Higrômetro,
        Barômetro,
        Pluviômetro,
        Termômetro,
    };
    
    const dispatch = useDispatch()
    
    const openDashboard = ({ selectedCardId }: { selectedCardId: number | undefined }) => {
        dispatch({
            type: 'dashboardInfo',
            payload: <DashboardInfo 
                        color={backgroundColor} 
                        title={stationName} 
                        ma={macAdress} 
                      />
        });

        dispatch({
            type: 'page',
            payload: <Dashboard 
                       selectedCardId={selectedCardId}
                     />,
        });
    };

    const handleDoubleClick = () => {
        if (inativa) {
            toast('Estação inativa', { type: "error" });
        } else if (selectedCardId !== null && selectedCardId !== undefined) {
            openDashboard({ selectedCardId });
        }
    };
    
    return (
        <Field
            display="flex"
            justifyContent="space-around"
            flexDirection="column"
            alignItems="flex-start"
            borderRadius="30px"
            backgroundColor="white"
            width="300px"
            height="160px"
            filter={filter ? filter : "drop-shadow(4px 4px 4px rgba(0, 0, 0, 0.25))"}
            onDoubleClick={handleDoubleClick}
        >
            <Field
                display="flex"
                justifyContent="center"
                flexDirection="row"
                alignItems="center"
                paddingLeft="20px"
            >
                <Field
                    width="80px"
                    height="80px"
                    borderRadius="50%"
                    backgroundColor={backgroundColor}
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                >
                    <Image 
                        src={IconeStation}
                        alt="IconStation"
                        width={50}
                        height={50}
                    />
                </Field>
                <Field
                    display="flex"
                    flexDirection="column"
                    gap="10px"
                    paddingLeft="20px"
                >
                    <Text
                        margin="0"
                        color="black"
                        fontWeight="bold"
                        fontSize="19px"
                    >
                        {stationName}
                    </Text>
                    <Text
                        margin="0"
                        color="#65B307"
                    >
                        MA: {macAdress}
                    </Text>
                </Field>
            </Field>
            <Field
                display="flex"
                gap="10px"
                paddingLeft="20px"
            >
                {icons?.map((icon, index) => {
                    const IconComponent = iconMap[icon];
                    if (IconComponent) {
                        return (
                            <Image
                            key={index}
                            src={IconComponent}
                            alt={`Icon ${icon}`}
                            width={30}
                            height={30}
                            />
                        );
                    }
                    return null;
                })}
            </Field>
        </Field>
    )
}

export default Card;