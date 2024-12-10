import { Field } from "../../Field/field";
import Image from 'next/image';
import Logo from '../../../../../public/img/logopreta.png';
import { Text } from "../../Text/text";
import { Form } from "../../Form/form";
import { PageLoginButton, SignButton } from "../../Button/button";
import { Input, Label } from "../../Input/input";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import Login from "../Login/login";
import Axios from "axios";
import { useState } from "react";

interface ContaProps {
  authenticated: () => void;
  setLogin: () => void;
}

const CriarConta: React.FC<ContaProps> = ({ authenticated, setLogin }) => {

  const { register, handleSubmit } = useForm()
  const [erro, setErro] = useState(String);

  const onSubmit = (data: any) => {
    if (!data.email || !data.nome || !data.senha1 || !data.senha2) {
      setErro("Preencha todos os campos!");
    } else {

      var email = data.email;
      var nome = data.nome;

      if (data.senha1 === data.senha2) {
        var senha = data.senha1;


        Axios.post(`https://testenumeroalfa.centralmeat.com.br/auth/register`, {
          name: nome,
          username: email,
          password: senha
        })
          .then(function (resp) {
            var message = resp.data.message

            if (message === 'Usuário registrado com sucesso!') {
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
                setLogin()

              }).catch(function (error) {
                setErro('Senha ou email incorretos!')
                console.log(error);
              });
            }


          })
          .catch(function (error) {
            console.log("error");
            setErro('Erro ao fazer cadastro!');
          });
      } else {
        setErro("Senhas divergentes!");
      }
    }
  };

  const dispatch = useDispatch();
  dispatch({
    type: 'key',
    payload: "Login"
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
        width="100%"
      >
        <Text
          fontFamily="Prompt"
          fontSize="30px"
          fontWeight="600"
          color="#FFF"
        >
          Cadastro
        </Text>

        <Form onSubmit={handleSubmit(onSubmit)}>
          <Field>
            <Label
              fontSize="18px"
              fontFamily="Prompt"
              fontWeight="500"
              color="white"
            >
              Nome
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
              {...register('nome')}
            />
          </Field>
          <Field>
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
              {...register('senha1')}
            />
          </Field>
          <Field>
            <Label
              fontSize="18px"
              fontFamily="Prompt"
              fontWeight="500"
              color="white"
            >
              Confirmar senha
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
              {...register('senha2')}
            />
          </Field>
          <Label
            fontSize="18px"
            fontFamily="Prompt"
            fontWeight="500"
            color="red"
          >
            {erro}
          </Label>

          <Field
            display="flex"
            flexDirection="row"
            justifyContent="center"
            marginTop="20px"
            width="600px"
            gap="20px"
          >
            <PageLoginButton onClick={setLogin} />
            <SignButton />
          </Field>

        </Form>

      </Field>
      <Field
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        backgroundColor="#FFF"
        borderRadius="50px 0px 0px 50px"
        padding="50px"
        // position= "absolute"
        height="-webkit-fill-available"
      >
        <Image
          src={Logo}
          alt="Logo Neo Code"
          width={400}
          height={400}
        />
      </Field>


    </Field>
  );
}

export default CriarConta;