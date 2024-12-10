import { Field } from "../Field/field";
import { Text } from "../Text/text";
import { ReactNode } from "react";
import { AiOutlineClose } from 'react-icons/ai'
import { useDispatch } from "react-redux";
import styled from "styled-components";


const Close = styled.div`
    color: #E7E7E7;
    font-size: 40px;
    align-self: flex-end;
    padding-right: 20px;
    padding-top: 10px;
    cursor: pointer;
`;

const DesfoqueFundo = styled.div<{
    isOpen?: boolean
}>`
    display: ${props => props.isOpen ? "flex" : "none"};
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.7);
    z-index: 1;
`;



interface ModalProps {
    children: ReactNode;
    title?: string;
    isOpen?: boolean;
    size?: string;
    closeModal?: () => void;
    background?: string;
}

const Modal: React.FC<ModalProps> = ({ isOpen, children, title, size, closeModal, background }) => {

    const dispatch = useDispatch();

    const closeModalRedux = () => {
        dispatch({
            type: 'modal',
            payload: false
        })
    }    

    return (
        <>
            <Field
                position="fixed"
                top={size === "small" ? "20%" : "15%"}
                right={size === "small" ? "30%" : "20%"}
                width={size === "small" ? "40%" : "60%"}
                height={size === "small" ? "40%" : "72%"}
                backgroundColor={background ?? 'white'}
                borderRadius="30px"
                display={isOpen ? "flex" : "none"}
                alignItems="center"
                justifyContent="center"
                flexDirection="column"
                zIndex="2"
            >
                <Field
                    width="99%"
                    height="60px"
                    backgroundColor="#333385"
                    borderRadius="50px 50px 25px 25px"
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    marginTop="10px"
                >
                    <Field
                        flexGrow="1"
                    >
                        <Text
                            color="white"
                            textAlign="center"
                            fontFamily="Prompt"
                            fontSize="1.4rem"
                            fontWeight="500"
                        >
                            {title}
                        </Text>
                    </Field>
                    <Close onClick={closeModal ? closeModal : closeModalRedux}>
                        <AiOutlineClose />
                    </Close>
                </Field>
                <Field
                    width="100%"
                    height="100%"
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                >
                    {children}
                </Field>
            </Field>
            <DesfoqueFundo isOpen={isOpen} />
        </>
    )
}

export default Modal;
