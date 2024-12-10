import EstacoesSideBar from '../../../public/img/SideBar/EstacoesSideBar.png'
import ParametrosSideBar from '../../../public/img/SideBar/ParametrosSideBar.png'
import AlertasSideBar from '../../../public/img/SideBar/AlertasSideBar.png'
import EventosSideBar from '../../../public/img/SideBar/EventosSideBar.png'
import EducacaoSideBar from '../../../public/img/SideBar/EducacaoSideBar.png'

import Estacoes from '../components/Pages/Estacoes/estacoes'
import Parametros from '../components/Pages/Parametros/parametros'
import Alertas from '../components/Pages/Alertas/alertas'
import Educacao from '../components/Pages/Educacao/educacao'
import Eventos from '../components/Pages/Eventos/eventos'

const crudItems = [
    {
        title: "Estações",
        image: EstacoesSideBar,
        key: "Estacoes",
        component: <Estacoes />,
    },
    {
        title: "Parâmetros",
        image: ParametrosSideBar,
        key: "Parametros",
        component: <Parametros />,  
    },
    {
        title: "Alertas",
        image: AlertasSideBar,
        key: "Alertas",
        component: <Alertas />,
    },
    {
        title: "Eventos",
        image: EventosSideBar,
        key: "Eventos",
        component: <Eventos />,
    },
    {
        title: "Educação",
        image: EducacaoSideBar,
        key: "Educacao",
        component: <Educacao />,
    }
]

export default crudItems;