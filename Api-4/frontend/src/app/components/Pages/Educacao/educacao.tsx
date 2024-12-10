import CardEducation from "../../Card/cardEducation";
import { Field } from "../../Field/field";
import { Text } from "../../Text/text";
import education from "@/app/model/education"
import { useDispatch } from "react-redux";

const Educacao: React.FC = () => {

  const dispatch = useDispatch();

  dispatch({
    type: 'key',
    payload: "SearchBar" 
  }); 

  return (
    <>
      <Field
        height="40%"
        overflowY="scroll"
      >
        <Text
          fontFamily="Prompt"
          fontSize="22px"
          fontWeight="600"
        >
          Fique por dentro do assunto
        </Text>

        <Field
            width="90%"
            display="flex"
            flexDirection="column"
            gap="40px"
          >
            {education?.map((item, index) => (
              <CardEducation
                title={item.title}
                explanation={item.explanation}
                formula={item.formula}
                formula_explanation={item.formula_explanation}
                key={index}
              />
            ))}
          </Field>

          <Field
            marginBottom="200px"
          />
      </Field>
    </>
  )
}

export default Educacao;
