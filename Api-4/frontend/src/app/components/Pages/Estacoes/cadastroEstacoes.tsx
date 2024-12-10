import { Field } from "../../Field/field";
import { StationParameterButton } from "../../Button/button";
import { StationSendButton } from "../../Button/button";
import { Input, InputLabel, Label } from "../../Input/input";
import { Text } from "../../Text/text";
import { Form } from "../../Form/form";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import stationRegister from "../../../model/stationRegister"
import Estacoes from "./estacoes";
import { BackButton } from "../../Button/button";
import Axios from "axios";
import StationParameterModal from "../../Modals/stationParameterModal";
import { RootState } from "@/app/store/store";
import { useState } from "react";
import { toast } from "react-toastify";


const CadastroEstacoes: React.FC = () => {

    const [stationParameters, setStationParameters] = useState([]);

    const isOpen = useSelector((state: RootState) => state.modal);
    // const user = localStorage.getItem("role")
    const user = typeof window !== 'undefined' ? localStorage.getItem('role') : null;

    // const token = localStorage.getItem("token")
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    const dispatch = useDispatch();


    dispatch({
        type: 'key',
        payload: null
    });

    const backButton = () => {
        dispatch({
            type: 'page',
            payload: <Estacoes />
        });
    }

    const openModal = () => {
        dispatch({
            type: 'modal',
            payload: true
        });
    }

    const closeModal = () => {
        dispatch({
            type: 'modal',
            payload: false
        });
    }

    const handleModalSubmit = (data: any) => {
        setStationParameters(data)
    };

    const { register, handleSubmit } = useForm()

    const onSubmit = (data: any) => {
        if (
            data["name"] &&
            data["nickname"] &&
            data["mac"] &&
            data["latitude"] &&
            data["longitude"] &&
            data["address"]
        ) {
            Axios.post("https://testenumeroalfa.centralmeat.com.br/estacao/create", {
                nome_estacao: data["name"],
                apelido: data["nickname"],
                mac_adress: data["mac"],
                latitude: parseFloat(data["latitude"].replace(',', '.')),
                longitude: parseFloat(data["longitude"].replace(',', '.')),
                endereco: data["address"],
                status_estacao: true,
                id_tipos_parametros: stationParameters.map(item => parseInt(item, 10))
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }).then(function (response) {
                console.log(response);
                localStorage.setItem("key", "1");
                backButton();
            }).catch(function (error) {
                console.log(error);
                toast('Estação não cadastrada!', { type: "error" });
            });
        } else {
            toast('Por favor, preencha todos os campos necessários.', { type: "info" });
        }
    }

    return (
        <>
            <Field
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
            >
                <Field
                    width="100%"
                    display="flex"
                    justifyContent="flex-start"
                >
                    <BackButton onClick={backButton} />
                </Field>
                <Text
                    color="#65B307"
                    fontWeight="600"
                    fontSize="22px"
                    fontFamily="Prompt"
                    margin="0px"
                >
                    Cadastro de estação
                </Text>

                <Form onSubmit={handleSubmit(onSubmit)}>
                    {stationRegister?.map((item, index) => (
                        <Field
                            key={index}
                        >
                            <Label
                                fontSize="16px"
                                fontFamily="Prompt"
                                fontWeight="500"
                                color="black"
                            >
                                {item.title}
                            </Label>
                            <Input
                                type="text"
                                display="flex"
                                flexDirection="column"
                                width="600px"
                                height="20px"
                                border="none"
                                borderRadius="20px"
                                padding="10px"
                                fontFamily="Prompt"
                                fontSize="16px"
                                backgroundColor="#D9D9D9"
                                boxShadow="0px 4px 4px 0px rgba(0, 0, 0, 0.25) inset"
                                margin="4px 0px 8px 0px"
                                {...register(item.name)}
                            />
                        </Field>
                    ))}

                    <Field
                        display="flex"
                        justifyContent="center"
                        marginTop="20px"
                    >
                        <Field
                            display="flex"
                            flexDirection="row"
                            justifyContent="space-between"
                            width="600px"
                        >
                            <StationParameterButton onClick={() => openModal()} />
                            <StationSendButton />
                        </Field>
                    </Field>
                </Form>
            </Field>
            <StationParameterModal
                isOpen={isOpen}
                closeModal={closeModal}
                onSubmit={handleModalSubmit}
            />
        </>
    )
}

export default CadastroEstacoes;
