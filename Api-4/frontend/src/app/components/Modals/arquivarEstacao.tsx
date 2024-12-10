import { Field } from "../Field/field";
import Modal from "./modal";
import styled from "styled-components";
import { Text } from "../Text/text";
import { ConfirmButton } from "../Button/button";
import Axios from "axios";
import Estacoes from "../Pages/Estacoes/estacoes";
import { useDispatch } from "react-redux";


const IconField = styled.img`
    width: 300px;
    height: 300px;
    border-radius: 50%;
    object-fit: cover;
    border: 2px solid #fff;
    cursor: pointer;
`;


interface ModalParams {
  isOpen?: boolean
  closeModal: () => void;
  selectedCardId?: number | null;
}

const ModalArquivarEstacao: React.FC<ModalParams> = ({ isOpen, closeModal, selectedCardId }) => {

  const dispatch = useDispatch();
  // const user = localStorage.getItem("role")
  const user = typeof window !== 'undefined' ? localStorage.getItem('role') : null;

  // const token = localStorage.getItem("token")
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

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

  const dell = () => {
    Axios.delete(`https://testenumeroalfa.centralmeat.com.br/estacao/delete/${selectedCardId}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }).then(() => {
      closeModal();
      backButton();
    })
  }

  return (
    <>
      <Modal
        isOpen={isOpen}
        closeModal={closeModal}
        size="small"
        title="Arquivar estação"
      >
        <Field
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          gap="40px"
        >
          <Field
            display="flex"
            flexDirection="column"
          >
            <Text
              textAlign="center"
              fontFamily="Prompt"
              fontSize="20px"
              margin="0"
            >
              Deseja mesmo arquivá-la?
            </Text>
          </Field>
          <ConfirmButton onClick={() => dell()} />
        </Field>
      </Modal>
    </>
  )
}

export default ModalArquivarEstacao;
