import { styled } from "styled-components"

export const HeaderBox = styled.div<{ justifyContent?: string }>`
  width: 100%;
  height: 8vh;
  display: flex;
  justify-content: ${(props) => props?.justifyContent};
  align-items: center;
`;

export const Link = styled.a`
  background-color: black;
  color: white;
`;

export const Image = styled.img`
  width:  15%;
`;