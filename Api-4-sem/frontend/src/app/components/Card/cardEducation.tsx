import { Field } from "../Field/field";
import { Text } from "../Text/text";

interface CardProps {
    title?: string
    explanation?: string
    formula?: string
    formula_explanation?: string[]
}

const CardEducation: React.FC<CardProps> = ({ title, explanation, formula, formula_explanation }) => {
    return (
        <Field>
            <Text
                color='#333385'
                fontWeight='bold'
                fontSize='20px'
            >{title}</Text>

            <Text
                color='#090909'
                fontWeight='regular'
                fontSize='18px'
            >{explanation}</Text>

            <Text
                color='#4CAD00'
                fontWeight='regular'
                fontSize='18px'
            >{formula}</Text>

            {formula_explanation?.map((item) => (
                <Text
                    color='#090909'
                    fontWeight='regular'
                    fontSize='16px'
                    paddingLeft='10px'
                >• {item}</Text>
            ))}

        </Field>
    )
}

export default CardEducation;