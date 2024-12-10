import Image from 'next/image';
import Logo from '../../../../public/img/logo.svg'
import { Field } from '../Field/field';
import NavigationMenu from '../NavigationMenu/navigationMenu';

const SideNavBar: React.FC = () => {

  return (
    <Field
      height="95%"
      width="8%"
      borderRadius="40px"
      backgroundColor="#333385"
      display="flex"
      justifyContent="center"
    >
      <Field
        display='flex'
        alignItems='center'
        flexDirection='column'
        marginTop="2rem"
        gap='60px'
        cursor='pointer'
      >
        <Image 
          src={Logo} 
          alt="Minha Imagem" 
          width={80} 
          height={80}
        />

        <NavigationMenu />
      </Field>


    </Field>
  )
}

export default SideNavBar;