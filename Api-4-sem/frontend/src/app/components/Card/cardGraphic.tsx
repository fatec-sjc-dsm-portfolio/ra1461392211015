import { Field } from "../Field/field";
import { Text } from "../Text/text";
import { Input, Label } from "../Input/input";
import { useState } from "react";
import { toast } from "react-toastify";
import GraphRain from "../Graph/GraphRain";
import GraphTemp from "../Graph/GraphTemp";
import GraphHumi from "../Graph/GraphHumi";
import GraphAtm from "../Graph/GraphAtm";
import GraphWind from "../Graph/GraphWind";

interface CardProps {
    title?: string
    selectedCardId?: number
    parameter?: string
}

const CardGraphic: React.FC<CardProps> = ({ title, selectedCardId, parameter }) => {

    const dataAtual = new Date();
    const ano = dataAtual.getFullYear();
    const mes = String(dataAtual.getMonth() + 1).padStart(2, '0');
    const dia = String(dataAtual.getDate()).padStart(2, '0');
    const dataFormatada = `${ano}-${mes}-${dia}`;

    const [startDate, setStartDate] = useState<string>(dataFormatada);
    const [endDate, setEndDate] = useState<string>(dataFormatada);

    const currentDate = new Date().toISOString().split("T")[0];

    const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newStartDate = e.target.value;
        if (newStartDate > currentDate) {
            toast('Data maior que o dia atual', { type: 'error' })
            setStartDate(currentDate);
        } else {
            setStartDate(newStartDate);
        }
    };

    const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newEndDate = e.target.value;
        if (newEndDate > currentDate) {
            toast('Data maior que o dia atual', { type: 'error' })
            setEndDate(currentDate);
        } else {
            setEndDate(newEndDate);
        }
    };

    return (
        <Field>
            <Field>
                <Text
                    fontFamily="Prompt"
                    fontSize="22px"
                    fontWeight="500"
                    margin="0px"
                    paddingBottom="5px"
                >
                    {title}
                </Text>
            </Field>

            <Field
                display="flex"
                flexDirection="column"
                borderRadius="30px"
                backgroundColor="white"
                paddingBottom="28px"
                width="600px"
                height="auto"
                filter="drop-shadow(4px 4px 4px rgba(0, 0, 0, 0.25))"
            >
                <Field
                    display="flex"
                    flexDirection="row"
                    justifyContent="center"
                    gap="50px"
                >

                    <Field
                        marginTop="20px"
                    >
                        <Label
                            fontSize="18px"
                            fontFamily="Prompt"
                            fontWeight="500"
                            color="black"
                        >
                            Início
                        </Label>
                        <Input
                            type="date"
                            display="flex"
                            width="150px"
                            height="24px"
                            border="none"
                            borderRadius="20px"
                            padding="10px"
                            fontFamily="Prompt"
                            fontSize="16px"
                            backgroundColor="#D9D9D9"
                            boxShadow="0px 4px 4px 0px rgba(0, 0, 0, 0.25) inset"
                            margin="4px 0px 12px 0px"
                            onChange={handleStartDateChange}
                            value={startDate}
                        />
                    </Field>

                    <Field
                        marginTop="20px"
                    >
                        <Label
                            fontSize="18px"
                            fontFamily="Prompt"
                            fontWeight="500"
                            color="black"
                        >
                            Fim
                        </Label>
                        <Input
                            type="date"
                            display="flex"
                            width="150px"
                            height="24px"
                            border="none"
                            borderRadius="20px"
                            padding="10px"
                            fontFamily="Prompt"
                            fontSize="16px"
                            backgroundColor="#D9D9D9"
                            boxShadow="0px 4px 4px 0px rgba(0, 0, 0, 0.25) inset"
                            margin="4px 0px 12px 0px"
                            onChange={handleEndDateChange}
                            value={endDate}
                        />
                    </Field>
                </Field>

                <Field
                    width="100%"
                    height="100%"
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                >
                    {parameter === "Termômetro" ? (
                        <GraphTemp startDate={startDate} endDate={endDate} selectedCardId={selectedCardId} />
                    ) : parameter === 'Pluviômetro' ? (
                        <GraphRain startDate={startDate} endDate={endDate} selectedCardId={selectedCardId} />
                    ) : parameter === 'Anenômetro' ? (
                        <GraphWind startDate={startDate} endDate={endDate} selectedCardId={selectedCardId} />
                    ) : parameter === 'Higrômetro' ? (
                        <GraphHumi startDate={startDate} endDate={endDate} selectedCardId={selectedCardId} />
                    ) : parameter === 'Barômetro' ? (
                        <GraphAtm startDate={startDate} endDate={endDate} selectedCardId={selectedCardId} />
                    ) : null}
                    
                </Field>

            </Field>
        </Field>

    )
}

export default CardGraphic;