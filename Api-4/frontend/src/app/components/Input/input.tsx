import { styled } from "styled-components";
import { Field } from "../Field/field";

export const Input = styled.input<{
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
`;

interface InputProps {
    type?: string,
    title?: string,
    fieldName?: string,
    color?: string,
    width?: string,
    height?: string,
    boxShadow?: string,
    padding?: string,
    border?: string,
    borderRadius?: string,
    backgroundColor?: string,
    display?: string,
    flexDirection?: string,
    fontSize?: string,
    fontFamily?: string,
    margin?: string
}

// -----------------------------------------------------------------------

export const Label = styled.label<{
    fontSize?: string
    fontFamily?: string
    fontWeight?: string
    color?: string
}>`
    font-size: ${(props) => props?.fontSize};
    font-family: ${(props) => props?.fontFamily};
    font-weight: ${(props) => props?.fontWeight};
    color: ${(props) => props?.color};
`;

interface LabelProps {
    fontSize?: string,
    fontFamily?: string,
    fontWeight?: string,
    color?: string,
}

// -----------------------------------------------------------------------

interface CombinedProps extends InputProps, LabelProps { }

export const Select = styled.select<SelectProps>`
    width: ${(props) => props?.width};
    height: ${(props) => props?.height};
    border: ${(props) => props?.border};
    border-radius: ${(props) => props?.borderRadius};
    font-size: ${(props) => props?.fontSize};
    padding: ${(props) => props?.padding};
    box-shadow: ${(props) => props?.boxShadow};
    background-color: ${(props) => props?.backgroundColor};
    color: ${(props) => props?.color};
    display: ${(props) => props?.display};
    flex-direction: ${(props) => props?.flexDirection};
    font-family: ${(props) => props?.fontFamily};
    margin: ${(props) => props?.margin};
    /* Add more properties as needed */
`;

interface SelectProps extends InputProps {}

interface CombinedPropsWithSelect extends SelectProps {
    fontSizeSpan?: string;
    colorSpan?: string;
    cursor?: string;
}

export const InputLabel: React.FC<CombinedPropsWithSelect> = ({
    title,
    fieldName,
    width,
    color,
    type,
}) => {
    return (
        <Field>
            <Label
                fontSize="18px"
                fontFamily="Prompt"
                fontWeight="500"
                color={color}
            >
                {title}
            </Label>
            <Select
                name={fieldName}
                display="flex"
                flexDirection="column"
                width={width}
                height="24px"
                border="none"
                borderRadius="20px"
                padding="10px"
                fontFamily="Prompt"
                fontSize="16px"
                backgroundColor="#D9D9D9"
                boxShadow="0px 4px 4px 0px rgba(0, 0, 0, 0.25) inset"
                margin="4px 0px 12px 0px"
            />
            <Input
                type={type ?? "text"}
                name={fieldName}
                display="flex"
                flexDirection="column"
                width={width}
                height="24px"
                border="none"
                borderRadius="20px"
                padding="10px"
                fontFamily="Prompt"
                fontSize="16px"
                backgroundColor="#D9D9D9"
                boxShadow="0px 4px 4px 0px rgba(0, 0, 0, 0.25) inset"
                margin="4px 0px 12px 0px"
            />
        </Field>
    );
};