import { Field } from "../Field/field"
import { Text } from "../Text/text"
import Image from "next/image"

import IconeStation from '../../../../public/img/Others/IconeCardEstacao.png'

interface DashboardProps {
  color?: string
  title?: string
  ma?: string
}

const DashboardInfo: React.FC<DashboardProps> = ({ color, title, ma }) => {

  return (
    <Field
      display="flex"
      alignItems="center"
      gap="15px"
    >
      <Field
         width="70px"
         height="70px"
         borderRadius="50%"
         backgroundColor={color ?? 'blue'}
         display="flex"
         justifyContent="center"
         alignItems="center"
      >
         <Image 
            src={IconeStation}
            alt="IconStation"
            width={40}
            height={40}
         />
      </Field>
      <Field
         display="flex"
         flexDirection="column"
      >
         <Text
            fontSize="20px"
            fontFamily="Prompt"
            margin="0"
         >
            {title ?? 'title'}
         </Text>
         <Text
            fontSize="18px"
            fontFamily="Prompt"
            margin="0"
            color="#65B307"
         >
            {ma ?? 'id'}
         </Text>
      </Field>
    </Field>
  )
}

export default DashboardInfo;