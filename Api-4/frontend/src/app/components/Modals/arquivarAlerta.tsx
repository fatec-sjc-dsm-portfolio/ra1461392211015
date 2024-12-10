import { Field } from "../Field/field";
import Modal from "./modal";
import styled from "styled-components";
import { Text } from "../Text/text";
import { ConfirmButton } from "../Button/button";
import Axios from "axios";
import { toast } from "react-toastify";


interface ModalAlert {
  isOpen?: boolean
  closeModal: () => void;
  selectedCardId?: number | null
}

const ModalArquivarAlerta: React.FC<ModalAlert> = ({ isOpen, closeModal, selectedCardId }) => {

  // const user = localStorage.getItem("role")
  const user = typeof window !== 'undefined' ? localStorage.getItem('role') : null;

  // const token = localStorage.getItem("token")
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

  const dell = () => {
    Axios.delete(`https://testenumeroalfa.centralmeat.com.br/Alerta/delete/${selectedCardId}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }).then(() => {
      localStorage.setItem("key_del_alerta", "1");
      closeModal();
    }).catch((error) => {
      console.error("Erro na solicitação Axios:", error);
      toast('Erro ao excluir alerta!', { type: "error" });
    });
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        closeModal={closeModal}
        size="small"
        title="Deletar alerta"
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
              Deseja deletar este alerta?
            </Text>
          </Field>
          <ConfirmButton onClick={() => dell()} />
        </Field>
      </Modal>
    </>
  )
}

export default ModalArquivarAlerta;
