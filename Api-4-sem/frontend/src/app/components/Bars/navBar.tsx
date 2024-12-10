import SearchField from '../SearchField/SearchField'
import Profile from '../profile/Profile'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/app/store/store'
import { Field } from '../Field/field'
import { AlertButton, ParameterButton } from '../Button/button'
import { Text } from 'recharts'

const NavBar: React.FC = () => {

  const key = useSelector((state: RootState) => state.key);
  const dashboardInfo = useSelector((state: RootState) => state.dashboardInfo);
  const dashboardValid = useSelector((state: RootState) => state.dashboardValid);

  const dispatch = useDispatch();


  const handleSearch = (query: string) => {
    console.log('Pesquisando por:', query);
  };

  const handleButtonClick = () => {
    dispatch({
      type: 'modal',
      payload: true
    }); 
  };



  return (
    <Field 
      width="99%"
      height="6vh"
      display="flex"
      align-items="center"
      justifyContent={key !== null || dashboardValid !== false ? 'space-between' : 'flex-end'}
    >
        {key === null ? dashboardValid && dashboardInfo : null}
        {key 
          ? key === "SearchBar" 
          ? <Text></Text>
          : key === "CadastroParametro"
          ? <ParameterButton onClick={handleButtonClick} />
          : key === "CadastroAlerta"
          ? <AlertButton onClick={handleButtonClick} />
          : <Text></Text>
        : <Text></Text>}
        
        <Profile />
    </Field>
  )
}

export default NavBar;
