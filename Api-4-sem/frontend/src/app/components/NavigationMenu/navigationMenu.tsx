import styled from "styled-components"
import { Field } from "../Field/field"
import { useDispatch } from "react-redux";
import crudItems from '../../model/crud'
import Image from "next/image";
import { Text } from "../Text/text";

const NavigationMenu : React.FC = () => {

    const dispatch = useDispatch();

    function showCrud(crud: string) {
        const selectedItem = crudItems.find((item) => item.key === crud);
        if (selectedItem) {
            dispatch({
                type: 'page',
                payload: selectedItem.component,
            });
        }
    }

    return (
        <Field
            display="flex"
            justifyContent="center"
            alignItems="center"
            flexDirection="column"
            gap="10px"
        >
            {crudItems.map((item, index) => (
                <Field 
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    flexDirection="column"
                    onClick={() => showCrud(item.key)}
                >
                    <Image 
                        key={index}
                        src={item.image}
                        alt="Minha Imagem" 
                        width={30} 
                        height={30} 
                    />
                    <Text
                        color="white"
                        fontWeight="600"
                        fontFamily="Prompt"
                    >
                        {item.title}
                    </Text>
                </Field>
            ))}
        </Field>
    )
}

export default NavigationMenu