import { Field } from "../../Field/field";
import Image from 'next/image';
import Logo from '../../../../../public/img/logopreta.png';
import { Text } from "../../Text/text";
import { Form } from "../../Form/form";
import { CreateSignButton, SignButton } from "../../Button/button";
import { Input, Label } from "../../Input/input";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import CriarConta from "../Conta/conta";
import Axios from "axios";
import { toast } from "react-toastify";
import { useState } from "react";

interface LoginProps {
  authenticated: () => void;
  setRegister: () => void;
}

const Login: React.FC<LoginProps> = ({ authenticated, setRegister }) => {

  localStorage.clear()
  localStorage.removeItem('role')
  localStorage.removeItem('token')

  const { register, handleSubmit } = useForm()
  const [erro, setErro] = useState(String);

  const onSubmit = (data: any) => {

    var email = data.email
    var senha = data.senha

    console.log(email);
    console.log(senha);

    // var email = "edu.com"
    // var senha = "102030@@@"

    Axios.post("https://testenumeroalfa.centralmeat.com.br/auth/login", {
      username: email,
      password: senha
    }).then(function (resp) {
      var token = resp.data.token;

      Axios.get(`https://testenumeroalfa.centralmeat.com.br/Usuario/getOneByEmail/${email}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
        .then(function (resp) {

          var role = resp.data.role
          
          localStorage.setItem("role", role);
          localStorage.setItem("nome", resp.data.nome);
          var erro = resp.data.mensagem 
          if (erro == "Usuário ou senha inválidos") {
            setErro("Senha errada!")
          }

        }).catch(function (error) {
          console.log("error");
          setErro('Senha ou email incorretos!')
        });

      localStorage.setItem("token", token);


      authenticated()

    }).catch(function (error) {
      setErro('Senha ou email incorretos!')
      console.log(error);
    });
  }

  const dispatch = useDispatch();
  dispatch({
    type: 'key',
    payload: "CriarConta"
  });

  return (
    <Field
      width="100vw"
      height="100vh"
      display="flex"
      flexDirection="row"
      backgroundColor="#333385"
    >
      <Field
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        backgroundColor="#FFF"
        borderRadius="0px 50px 50px 0px"
        padding="50px"
        position="absolute"
        height="-webkit-fill-available"
      >
        <Image
          src={Logo}
          alt="Logo Neo Code"
          width={400}
          height={400}
        />
      </Field>

      <Field
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        width="100%"
        paddingLeft="500px"
      >
        <Text
          fontFamily="Prompt"
          fontSize="30px"
          fontWeight="600"
          color="#FFF"
        >
          Login
        </Text>

        <Form onSubmit={handleSubmit(onSubmit)}>
          <Field>
            <br></br>
            <Label
              fontSize="18px"
              fontFamily="Prompt"
              fontWeight="500"
              color="white"
            >
              Email
            </Label>
            <Input
              type="text"
              display="flex"
              flexDirection="column"
              width="100%"
              height="20px"
              border="none"
              borderRadius="20px"
              padding="10px"
              fontFamily="Prompt"
              fontSize="18px"
              backgroundColor="#D9D9D9"
              boxShadow="0px 4px 4px 0px rgba(0, 0, 0, 0.25) inset"
              margin="4px 0px 8px 0px"
              {...register('email')}
            />
          </Field>
          <Field>
            <Label
              fontSize="18px"
              fontFamily="Prompt"
              fontWeight="500"
              color="white"
            >
              Senha
            </Label>
            <Input
              type="password"
              display="flex"
              flexDirection="column"
              width="100%"
              height="20px"
              border="none"
              borderRadius="20px"
              padding="10px"
              fontFamily="Prompt"
              fontSize="18px"
              backgroundColor="#D9D9D9"
              boxShadow="0px 4px 4px 0px rgba(0, 0, 0, 0.25) inset"
              margin="4px 0px 8px 0px"
              {...register('senha')}
            />
            <Label
              fontSize="18px"
              fontFamily="Prompt"
              fontWeight="500"
              color="red"
            >
              {erro}
            </Label>
          </Field>

          <Field
            display="flex"
            flexDirection="row"
            justifyContent="center"
            marginTop="20px"
            width="600px"
            gap="20px"
          >
            <CreateSignButton onClick={setRegister} />
            <SignButton />
          </Field>

        </Form>

      </Field>

    </Field>
  );
}

export default Login;
