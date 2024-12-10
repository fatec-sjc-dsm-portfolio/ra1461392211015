import { Field } from "../Field/field";
import Modal from "./modal";
import styled from "styled-components";
import { Text } from "../Text/text";
import { ConfirmButton } from "../Button/button";
import Axios from "axios";


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
  selectedCardId?: number | null
}

const ModalArquivarParametro: React.FC<ModalParams> = ({ isOpen, closeModal, selectedCardId }) => {

  // const user = localStorage.getItem("role")
  const user = typeof window !== 'undefined' ? localStorage.getItem('role') : null;

  // const token = localStorage.getItem("token")
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

  const dell = () => {
    Axios.delete(`https://testenumeroalfa.centralmeat.com.br/TipoParametro/delete/${selectedCardId}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }).then(() => {
      localStorage.setItem("key_arq_param", "1");
      closeModal()
    })
  }

  return (
    <>
      <Modal
        isOpen={isOpen}
        closeModal={closeModal}
        size="small"
        title="Arquivar parâmetro"
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
              margin="0"
              fontFamily="Prompt"
              fontSize="20px"
            >
              Não é possivel excluir este parâmetro, pois<br /> possui vínculos com estações.
            </Text>
            <Text
              textAlign="center"
              fontWeight="600"
              fontFamily="Prompt"
              fontSize="20px"
              margin="0"
            >
              Deseja arquivá-lo?
            </Text>
          </Field>
          <ConfirmButton onClick={() => dell()} />
        </Field>
      </Modal>
    </>
  )
}

export default ModalArquivarParametro;
