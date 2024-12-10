import CardEvents from "../../Card/cardEvent";
import { Field } from "../../Field/field";
import { Text } from "../../Text/text";
import { useState, useEffect } from "react";
import Axios, { all } from "axios";

import { useDispatch, useSelector } from "react-redux";

interface padrao_eventos {
  icon: string,
  title: string,
  filter: string,
  actual_value: string,
  date: string,
  hour: string,
  station_name: string,
  station_location: string,
}

const Eventos: React.FC = () => {
  const dispatch = useDispatch();

  const [allEvents, setAllEvents] = useState<padrao_eventos[]>([]);
  // const user = localStorage.getItem("role")
  const user = typeof window !== 'undefined' ? localStorage.getItem('role') : null;

  // const token = localStorage.getItem("token")
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  const [loading, setLoading] = useState(true)

  console.log(allEvents)
  var key = true

  useEffect(() => {
    async function ColetaDeDados(evento: any) {

      let id_estacao_temp: any;
      let id_tipo_parametro_temp: any;

      try {
        let evento_tratado_temp = {
          icon: '',
          title: '',
          filter: '',
          actual_value: '',
          date: '',
          hour: '',
          station_name: '',
          station_location: '',
        };

        let dataAlerta = await Axios.get(`https://testenumeroalfa.centralmeat.com.br/Alerta/getOne/${evento.id_alerta}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
        evento_tratado_temp.title = dataAlerta.data.apelido
        evento_tratado_temp.filter = (dataAlerta.data.variavel + ' ' + dataAlerta.data.operador + ' ' + dataAlerta.data.valor_delimitante)


        const locale = 'pt-br'
        let dataMedida = await Axios.get(`https://testenumeroalfa.centralmeat.com.br/Medida/getOne/${evento.id_medida}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
        evento_tratado_temp.actual_value = dataMedida.data.valor_medida
        let data_temp = new Date(dataMedida.data.createdAt.slice(0, 10)).toLocaleDateString(locale)

        evento_tratado_temp.hour = dataMedida.data.createdAt.slice(11, 19)
        evento_tratado_temp.date = data_temp


        let dataParametro = await Axios.get(`https://testenumeroalfa.centralmeat.com.br/Parametro/getOne/${evento.id_parametro}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
        id_estacao_temp = dataParametro.data.id_estacao
        id_tipo_parametro_temp = dataParametro.data.id_tipo_parametro
        let dataEstacao = await Axios.get(`https://testenumeroalfa.centralmeat.com.br/Estacao/getOne/${id_estacao_temp}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
        evento_tratado_temp.station_name = dataEstacao.data.nome_estacao
        evento_tratado_temp.station_location = dataEstacao.data.endereco


        let dataParamero = await Axios.get(`https://testenumeroalfa.centralmeat.com.br/TipoParametro/getOne/${id_tipo_parametro_temp}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
        evento_tratado_temp.icon = dataParamero.data.tipo_sensor

        setLoading(false)

        setAllEvents((prevEvents) => [...prevEvents, evento_tratado_temp]);
      } catch (e) {
        console.error(e);
      }
    }

    async function ColetandoEventos() {
      try {
        let dataEventos = await Axios.get(`https://testenumeroalfa.centralmeat.com.br/Evento/getAll`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        var data = dataEventos.data;
        const eventos_nao_tratados: Array<any> = [];

        data.map((item: any) => {
          eventos_nao_tratados.push({
            id_evento: item.id_evento,
            id_parametro: item.id_parametro,
            id_medida: item.id_medida,
            id_alerta: item.id_alerta,
          });
        });

        eventos_nao_tratados.map((evento) => {
          ColetaDeDados(evento);
        });
      } catch (error) {
        console.error(error);
      }
    }

    if (key) {
      ColetandoEventos();
      key = false;
    }
  }, []);

  dispatch({
    type: 'key',
    payload: "SearchBar",
  });

  return (
    <>
      {loading
        ? 'Não há eventos...'
        :
        <>
          <Field
            position="relative"
            width="100vw"
            display="flex"
            flexDirection="column"
            gap="50px"
          >
            <Field
              display="flex"
              flexDirection="column"
            >
              <Text
                fontFamily="Prompt"
                fontSize="22px"
                fontWeight="600"
              >
                Eventos
              </Text>
              <Field
                width="90%"
                display="flex"
                flexWrap="wrap"
                gap="50px"
              >
                {allEvents.map((item, index) => (
                  <CardEvents
                    icon={item.icon}
                    title={item.title}
                    filter={item.filter}
                    actual_value={item.actual_value}
                    date={item.date}
                    hour={item.hour}
                    station_name={item.station_name}
                    station_location={item.station_location}
                    key={index}
                  />
                ))}
              </Field>
            </Field>
          </Field>
        </>
      }
    </>
  );
}

export default Eventos;
