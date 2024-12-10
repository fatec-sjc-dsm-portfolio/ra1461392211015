import { styled } from "styled-components";

export const Form = styled.form<{ 
    padding?: string
    paddingTop?: string
    paddingBottom?: string
    paddingLeft?: string
    paddingRight?: string
    marginTop?: string
    margin?: string
}>`
    padding: ${(props) => props?.padding};
    padding-top: ${(props) => props?.paddingTop};
    padding-bottom: ${(props) => props?.paddingBottom};
    padding-left: ${(props) => props?.paddingLeft};
    padding-right: ${(props) => props?.paddingRight};
    margin-top: ${(props) => props?.marginTop};
    margin: ${(props) => props?.margin};
`;