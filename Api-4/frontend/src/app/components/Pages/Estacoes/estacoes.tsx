import { useDispatch } from "react-redux";
import { Field } from "../../Field/field";
import { Text } from "../../Text/text";
import '../../../animations.css'
import SliderEstacoes from "../../SliderEstacoes/sliderEstacoes";
import { StationButton } from "../../Button/button";
import CadastroEstacoes from "./cadastroEstacoes";
import { toast } from "react-toastify";

const Estacoes: React.FC = () => {

  const dispatch = useDispatch();

  // const user = localStorage.getItem("role")
  const user = typeof window !== 'undefined' ? localStorage.getItem('role') : null;

  // const token = localStorage.getItem("token")
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;


  if (localStorage.getItem("key") === '1') {
    toast('Estação cadastrada com sucesso!', { type: "success" })
    localStorage.setItem("key", "0");
  }

  const openRegister = () => {
    dispatch({
      type: 'page',
      payload: <CadastroEstacoes />,
    });
  };

  dispatch({
    type: 'key',
    payload: "SearchBar"
  });

  return (
    <>
      <Field
        position="relative"
        width="100vw"
        display="flex"
        flexDirection="column"
        gap="20px"
      >
        <Field
          display="flex"
          flexDirection="column"
        >
          <Text
            fontFamily="Prompt"
            fontSize="20px"
            fontWeight="600"
          >
            Estações
          </Text>

          <SliderEstacoes inativa={false} />

        </Field>

        <Field>
          <Text
            fontFamily="Prompt"
            fontSize="20px"
            fontWeight="600"
          >
            Estações Inativas
          </Text>

          <SliderEstacoes inativa={true} />

        </Field>

        <Field
          position="absolute"
          width="23%"
          height="100%"
          background="linear-gradient(60deg, #FFFFF 30%, #E7E7E7 80%)"
          backdropFilter="blur(1px)"
          right="0"
        />
      </Field>

      {user === "admin" &&
        <Field
          position="absolute"
          bottom="0"
          right="0"
          margin="25px"
          width="100%"
          display="flex"
          justifyContent="flex-end"
        >
          <StationButton onClick={openRegister} />
        </Field>
      }
    </>
  )
}

export default Estacoes;
