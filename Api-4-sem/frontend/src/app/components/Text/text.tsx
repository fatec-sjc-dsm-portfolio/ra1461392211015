import { styled } from "styled-components";

export const Text = styled.p<{ 
    textDecoration?: string
    fontWeight?: string
    textAlign?: string
    alignItems?: string
    fontSize?: string
    fontFamily?: string
    color?: string
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
    font-family: ${(props) => props?.fontFamily};
    font-size: ${(props) => props?.fontSize};
    color: ${(props) => props?.color};
    text-align: ${(props) => props?.textAlign};
    align-items: ${(props) => props?.alignItems};
    text-decoration: ${(props) => props?.textDecoration};
    font-weight: ${(props) => props?.fontWeight};
`;