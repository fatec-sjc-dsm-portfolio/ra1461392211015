import Card from "../Card/cardStation";
import { Text } from "../Text/text";
import { motion } from 'framer-motion'
import { useState, useEffect, useRef } from "react";
import Axios from "axios";

interface SliderEstacoes {
  inativa?: boolean
}

const SliderEstacoes: React.FC<SliderEstacoes> = ({ inativa }) => {

  const [keyLook, setKeyLook] = useState(false)
  const [width, setWidth] = useState(0);
  const [stations, setStations] = useState(Array<any>);
  const carousel = useRef<HTMLDivElement>(null);

  // const user = localStorage.getItem("role")
  const user = typeof window !== 'undefined' ? localStorage.getItem('role') : null;

  // const token = localStorage.getItem("token")
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

  useEffect(() => {
    const key = localStorage.getItem("key");
    if (key !== null) {
      setKeyLook(true);
    }

    if (carousel.current) {
      const scrollWidth = carousel.current.scrollWidth;
      const offsetWidth = carousel.current.offsetWidth;
      setWidth(scrollWidth - offsetWidth + 50);
    }

    Axios.get(`https://testenumeroalfa.centralmeat.com.br/estacao/getAll`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .catch(function (error) {
        console.log(error);
      })
      .then((resp: any) => {

        var data = resp.data;
        var station: Array<any> = [];

        data.forEach((item: any) => {
          if (item.status_estacao === !inativa) {
            station.push({
              id: item.id_estacao,
              backgroundColor: "#8CC1FF",
              stationName: item.apelido,
              macAddress: item.mac_adress,
              icons: item.campos.map((icon: any) => icon.tipo_parametro.tipo_sensor)
            });
          }
        });

        setStations(station);
      });


  }, [keyLook])

  return (
    <>
      <motion.div
        style={{
          width: 1700,
          height: 200,
          overflow: "hidden",
          cursor: "grab",
        }}
        ref={carousel}
        whileTap={{ cursor: "grabbing" }}
      >
        <motion.div
          drag="x"
          dragConstraints={{ right: 0, left: -width }}
          style={{
            display: "flex",
            flexDirection: "row",
            gap: "30px",
            width: "2700px",
          }}
        >
          {stations.length !== 0 ?
            stations.map((item, index) => (
              <Card
                background-size={inativa ? "cover" : undefined}
                backgroundColor={inativa ? undefined : item.backgroundColor}
                filter={inativa ? "brightness(0.60) opacity(0.75) drop-shadow(4px 4px 4px rgba(0, 0, 0, 0.25))" : undefined}
                stationName={item.stationName}
                macAdress={item.macAddress}
                selectedCardId={item.id}
                icons={item.icons}
                inativa={inativa}
                key={index}
              />
            ))
            : <Text fontFamily="Prompt">Nenhuma estação.</Text>
          }
        </motion.div>
      </motion.div>
    </>
  )
}

export default SliderEstacoes;
