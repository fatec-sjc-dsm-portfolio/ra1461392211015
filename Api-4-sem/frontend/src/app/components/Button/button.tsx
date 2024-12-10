import React, { MouseEvent } from 'react';
import { styled } from "styled-components";

import { MdPlaylistAdd } from 'react-icons/md'
import { FaPaperPlane } from 'react-icons/fa'
import { BiListPlus, BiSave, BiSolidEditAlt } from 'react-icons/bi'
import { FiSend, FiArrowLeft } from 'react-icons/fi'
import { BsCheckLg } from 'react-icons/bs'
import { IoMdArchive } from 'react-icons/io'
import { Text } from "recharts";

// const user = localStorage.getItem("role")
const user = typeof window !== 'undefined' ? localStorage.getItem('role') : null;
console.log(user);


export const DivButton = styled.div<{
    border?: string
    width?: string
    maxWidth?: string
    minWidth?: string
    height?: string
    maxHeight?: string
    minHeight?: string
    borderRadius?: string
    backgroundColor?: string
    backdropFilter?: string
    display?: string
    justifyContent?: string
    flexDirection?: string
    alignItems?: string
    gap?: string
    padding?: string
    paddingTop?: string
    paddingBottom?: string
    paddingLeft?: string
    paddingRight?: string
    marginTop?: string
    marginLeft?: string
    marginRight?: string
    marginBottom?: string
    margin?: string
    filter?: string
    boxShadow?: string
    flexWrap?: string
    fontSize?: string
    fontFamily?: string
    fontWeight?: string
    color?: string
    fontSizeSpan?: string
    colorSpan?: string
    cursor?: string
}>`
    border: ${(props) => props?.border};
    width: ${(props) => props?.width};
    max-width: ${(props) => props?.maxWidth};
    min-width: ${(props) => props?.minWidth};
    height: ${(props) => props?.height};
    max-height: ${(props) => props?.maxHeight};
    min-height: ${(props) => props?.minHeight};
    border-radius: ${(props) => props?.borderRadius};
    background-color: ${(props) => props?.backgroundColor};
    backdrop-filter: ${(props) => props?.backdropFilter};
    display: ${(props) => props?.display};
    justify-content: ${(props) => props?.justifyContent};
    flex-direction: ${(props) => props?.flexDirection};
    align-items: ${(props) => props?.alignItems};
    gap: ${(props) => props?.gap};
    padding: ${(props) => props?.padding};
    padding-top: ${(props) => props?.paddingTop};
    padding-bottom: ${(props) => props?.paddingBottom};
    padding-left: ${(props) => props?.paddingLeft};
    padding-right: ${(props) => props?.paddingRight};
    margin-top: ${(props) => props?.marginTop};
    margin-bottom: ${(props) => props?.marginBottom};
    margin-left: ${(props) => props?.marginLeft};
    margin-right: ${(props) => props?.marginRight};
    margin: ${(props) => props?.margin};
    filter: ${(props) => props?.filter};
    box-shadow: ${(props) => props?.boxShadow};
    cursor: ${(props) => props?.cursor};
    flex-wrap: ${(props) => props?.flexWrap};
    font-size: ${(props) => props?.fontSize};
    font-family: ${(props) => props?.fontFamily};
    font-weight: ${(props) => props?.fontWeight};
    color: ${(props) => props?.color};
    span {
        display: flex;
        align-items: center;
        height: ${(props) => props?.fontSizeSpan};
        font-size: ${(props) => props?.fontSizeSpan};
        color: ${(props) => props?.colorSpan};
        cursor: pointer;
    };
`;

export const Button = styled.button<{
    width?: string
    maxWidth?: string
    minWidth?: string
    height?: string
    maxHeight?: string
    minHeight?: string
    border?: string
    borderRadius?: string
    backgroundColor?: string
    backdropFilter?: string
    display?: string
    justifyContent?: string
    flexDirection?: string
    alignItems?: string
    gap?: string
    padding?: string
    paddingTop?: string
    paddingBottom?: string
    paddingLeft?: string
    paddingRight?: string
    marginTop?: string
    marginLeft?: string
    marginRight?: string
    marginBottom?: string
    margin?: string
    filter?: string
    boxShadow?: string
    flexWrap?: string
    fontSize?: string
    fontFamily?: string
    fontWeight?: string
    color?: string
    fontSizeSpan?: string
    colorSpan?: string
    cursor?: string
}>`
    width: ${(props) => props?.width};
    max-width: ${(props) => props?.maxWidth};
    min-width: ${(props) => props?.minWidth};
    height: ${(props) => props?.height};
    max-height: ${(props) => props?.maxHeight};
    min-height: ${(props) => props?.minHeight};
    border: ${(props) => props?.border};
    border-radius: ${(props) => props?.borderRadius};
    background-color: ${(props) => props?.backgroundColor};
    backdrop-filter: ${(props) => props?.backdropFilter};
    display: ${(props) => props?.display};
    justify-content: ${(props) => props?.justifyContent};
    flex-direction: ${(props) => props?.flexDirection};
    align-items: ${(props) => props?.alignItems};
    gap: ${(props) => props?.gap};
    padding: ${(props) => props?.padding};
    padding-top: ${(props) => props?.paddingTop};
    padding-bottom: ${(props) => props?.paddingBottom};
    padding-left: ${(props) => props?.paddingLeft};
    padding-right: ${(props) => props?.paddingRight};
    margin-top: ${(props) => props?.marginTop};
    margin-bottom: ${(props) => props?.marginBottom};
    margin-left: ${(props) => props?.marginLeft};
    margin-right: ${(props) => props?.marginRight};
    margin: ${(props) => props?.margin};
    filter: ${(props) => props?.filter};
    box-shadow: ${(props) => props?.boxShadow};
    cursor: ${(props) => props?.cursor};
    flex-wrap: ${(props) => props?.flexWrap};
    font-size: ${(props) => props?.fontSize};
    font-family: ${(props) => props?.fontFamily};
    font-weight: ${(props) => props?.fontWeight};
    color: ${(props) => props?.color};
    span {
        display: flex;
        align-items: center;
        height: ${(props) => props?.fontSizeSpan};
        font-size: ${(props) => props?.fontSizeSpan};
        color: ${(props) => props?.colorSpan};
        cursor: pointer;
    }
`;

export const StationButton = ({ onClick }: { onClick: () => void }) => {
    return (
        <DivButton
            backgroundColor='#333385'
            color='white'
            borderRadius='50px'
            padding='20px'
            display='flex'
            alignItems='center'
            fontSizeSpan="35px"
            width="35px"
            boxShadow="4px 4px 10px 0px rgba(0, 0, 0, 0.25)"
            cursor="pointer"
            onClick={onClick}
        >
            <span><BiListPlus /></span>
        </DivButton>
    )
}

export const ArchiveButton = ({ onClick }: { onClick: () => void }) => {
    return (
        <DivButton
            backgroundColor='#333385'
            color='white'
            borderRadius='50px'
            padding='20px'
            display='flex'
            alignItems='center'
            fontSizeSpan="35px"
            width="35px"
            boxShadow="4px 4px 10px 0px rgba(0, 0, 0, 0.25)"
            cursor="pointer"
            onClick={onClick}
        >
            <span><IoMdArchive /></span>
        </DivButton>
    )
}

export const EditButton = ({ onClick }: { onClick: () => void }) => {
    return (
        <DivButton
            backgroundColor='#333385'
            color='white'
            borderRadius='50px'
            padding='20px'
            display='flex'
            alignItems='center'
            fontSizeSpan="35px"
            width="35px"
            boxShadow="4px 4px 10px 0px rgba(0, 0, 0, 0.25)"
            cursor="pointer"
            onClick={onClick}
        >
            <span><BiSolidEditAlt /></span>
        </DivButton>
    )
}

export const ParameterButton = ({ onClick }: { onClick: () => void }) => {
    return (
        <>
            <DivButton
                backgroundColor='#333385'
                color='white'
                borderRadius='15px'
                padding='20px'
                display='flex'
                alignItems='center'
                gap="10px"
                fontSizeSpan="35px"
                fontFamily="Prompt"
                fontWeight="400"
                boxShadow="4px 4px 10px 0px rgba(0, 0, 0, 0.25)"
                cursor="pointer"
                onClick={onClick}
            >
                <span><MdPlaylistAdd /></span>
                Cadastrar parâmetro
            </DivButton>
        </>
    )
}


export const AlertButton = ({ onClick }: { onClick: () => void }) => {
    return (
        <>
            <DivButton
                backgroundColor='#333385'
                color='white'
                borderRadius='15px'
                padding='20px'
                display='flex'
                alignItems='center'
                gap="10px"
                fontSizeSpan="35px"
                fontFamily="Prompt"
                fontWeight="400"
                boxShadow="4px 4px 10px 0px rgba(0, 0, 0, 0.25)"
                cursor="pointer"
                onClick={onClick}
            >
                <span><MdPlaylistAdd /></span>
                Cadastrar alerta
            </DivButton>
        </>
    )
}

export const StationParameterButton = ({ onClick }: { onClick: () => void }) => {
    return (
        <DivButton
            backgroundColor='#333385'
            color='white'
            borderRadius='35px'
            padding='10px 30px'
            fontFamily="Prompt"
            fontWeight="400"
            boxShadow="4px 4px 10px 0px rgba(0, 0, 0, 0.25)"
            cursor="pointer"
            onClick={onClick}
        >
            Parâmetros
        </DivButton>
    )
}

export const StationSendButton = () => {
    return (
        <Button
            backgroundColor='#65B307'
            color='white'
            border="none"
            borderRadius='35px'
            padding='10px 30px'
            display='flex'
            alignItems='center'
            gap="10px"
            fontSizeSpan="25px"
            fontFamily="Prompt"
            fontWeight="400"
            boxShadow="4px 4px 10px 0px rgba(0, 0, 0, 0.25)"
            cursor="pointer"
            type="submit"
        >
            <span><FiSend /></span>
            Enviar
        </Button>
    )
}

export const SaveButton = () => {
    return (
        <Button
            backgroundColor='#65B307'
            color='white'
            border="none"
            borderRadius='35px'
            padding='10px 30px'
            display='flex'
            alignItems='center'
            gap="10px"
            fontSizeSpan="25px"
            fontFamily="Prompt"
            fontWeight="400"
            boxShadow="4px 4px 10px 0px rgba(0, 0, 0, 0.25)"
            cursor="pointer"
            type="submit"
        >
            <span><BiSave /></span>
            Salvar
        </Button>
    )
}

export const SubmitButton = ({ onClick }: { onClick: () => void }) => {
    return (
        <Button
            width="150px"
            height="30px"
            backgroundColor='#65B307'
            color='white'
            borderRadius='30px'
            padding='10px'
            display='flex'
            alignItems='center'
            justifyContent="center"
            gap="10px"
            fontSizeSpan="17px"
            fontFamily="Prompt"
            fontWeight="400"
            boxShadow="4px 4px 10px 0px rgba(0, 0, 0, 0.25)"
            cursor="pointer"
            onClick={onClick}
        >
            <span><FaPaperPlane /></span>
            Enviar
        </Button>
    )
}

export const ConfirmButton = ({ onClick }: { onClick: () => void }) => {
    return (
        <Button
            width="170px"
            height="50px"
            backgroundColor='#65B307'
            color='white'
            borderRadius='30px'
            padding='10px'
            display='flex'
            alignItems='center'
            justifyContent="center"
            gap="10px"
            fontSizeSpan="20px"
            fontSize="17px"
            fontFamily="Prompt"
            fontWeight="400"
            boxShadow="4px 4px 10px 0px rgba(0, 0, 0, 0.25)"
            cursor="pointer"
            onClick={onClick}
            border="none"
        >
            <span><BsCheckLg /></span>
            Confirmar
        </Button>
    )
}

export const BackButton = ({ onClick }: { onClick?: () => void }) => {
    return (
        <DivButton
            color='black'
            display='flex'
            alignItems='center'
            gap="10px"
            fontSizeSpan="20px"
            fontFamily="Prompt"
            fontWeight="600"
            cursor="pointer"
            onClick={onClick}
        >
            <span><FiArrowLeft /></span>
            Voltar
        </DivButton>
    )
}

export const CreateSignButton: React.FC<{
    onClick: (event: MouseEvent<HTMLButtonElement>) => void
}> = ({ onClick }) => {
    return (
        <Button
            backgroundColor='#65B307'
            color='white'
            border="none"
            borderRadius='35px 0px 0px 35px'
            padding='10px 30px'
            display='flex'
            alignItems='center'
            gap="10px"
            fontSizeSpan="18px"
            fontFamily="Prompt"
            fontWeight="400"
            boxShadow="4px 4px 8px 0px rgba(0, 0, 0, 0.25)"
            cursor="pointer"
            type="button"
            onClick={onClick}
        >
            <span>Criar conta</span>
        </Button>
    )
}

export const SignButton = () => {
    return (
        <Button
            backgroundColor='#65B307'
            color='white'
            border="none"
            borderRadius='0px 35px 35px 0px'
            padding='10px 30px'
            display='flex'
            alignItems='center'
            gap="10px"
            fontSizeSpan="18px"
            fontFamily="Prompt"
            fontWeight="400"
            boxShadow="-4px 4px 8px 0px rgba(0, 0, 0, 0.25)"
            cursor="pointer"
            type="submit"

        >
            <span>Entrar</span>
        </Button>
    )
}

export const PageLoginButton: React.FC<{
    onClick: (event: MouseEvent<HTMLButtonElement>) => void
}> = ({ onClick }) => {
    return (
        <Button
            backgroundColor='#65B307'
            color='white'
            border="none"
            borderRadius='35px 0px 0px 35px'
            padding='10px 30px'
            display='flex'
            alignItems='center'
            gap="10px"
            fontSizeSpan="18px"
            fontFamily="Prompt"
            fontWeight="400"
            boxShadow="4px 4px 8px 0px rgba(0, 0, 0, 0.25)"
            cursor="pointer"
            type="button"
            onClick={onClick}
        >
            <span>Fazer login</span>
        </Button>
    )
}