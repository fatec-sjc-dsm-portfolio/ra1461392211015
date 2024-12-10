import { Title, ProfileField } from "./styles"
import { Field } from "../Field/field";
// import imgPerfil from "../../../../public/img/Others/ImgPerfil.png"

const Profile: React.FC = () => {
    const nome = localStorage.getItem("nome")    
    return (
        <Field
            display="flex"
            justifyContent="center"
            alignItems="center"
            gap="10px"
            paddingRight='10px'
        >
            <Title>{nome}</Title>
            <ProfileField 
                src="https://lh3.googleusercontent.com/pw/ADCreHfFwdR9oayC516vEZH_0yLofpNh3e8pPGPkVufKXdhAPclh7gpGIlWstxTz_W1tWkxNz5sSeYL9sUYFNVEIL_LGU6QkV_pIQE-DrIhF-SPAS09fQWrIe1r_G4aG_zD250TWDZ9UerFkLRBHDJIj5kQyBw=w400-h400-s-no-gm?authuser=0"
            />
        </Field>
    )
  }
  
  export default Profile;