// Inicio.jsx
import { View, Text, ScrollView, StyleSheet, Image } from "react-native";
import CardTotal from "../Components/cardTotal";
import React, { useState, useEffect } from "react";
import api from "../Services/Axios";
import CardFazendas from "../Components/CardFazendas";
import { useNavigation } from "@react-navigation/core";
import { useAuth } from "../Context/authContext";
import TabNav from "../Navigations/main.routes";

export default function Inicio() {
  const navigation = useNavigation();

  const [fazendas, setFazendas] = useState([]);
  const [totalArmadilhas, setTotalArmadilhas] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const { idUser } = useAuth();
  const { role } = useAuth();

  useEffect(() => {
    async function fetchFazendas() {
      try {
        const response = await api.get(`/fazendas/user/${idUser}`);
        setFazendas(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log("Erro ao buscar fazendas:", error);
        setIsLoading(false);
      }
    }

    async function fetchTotalArmadilhas() {
      try {
        // const response = await api.get(`/files/list`);
        // setTotalArmadilhas(response.data.length);
      } catch (error) {
        console.log("Erro ao buscar total de armadilhas:", error);
      }
    }

    fetchFazendas();
    fetchTotalArmadilhas();
  }, []);
  console.log(role)
  return (
    <ScrollView>
      <Text style={styles.textTitle}>Agro Vision</Text>
      <View style={styles.boxContainer}>
        <CardTotal
          title="Total de Fazendas"
          number={fazendas.length}
          subTitle="campos cadastrados"
          type="fazenda"
        />
        <CardTotal
          title="Total de Armadilhas"
          number={"+"}
          subTitle="Cadastrar Imagens"
          type="armadilha"
        />
      </View>

      <Text style={styles.textSubTitle}>Fazendas Cadastradas</Text>
      {isLoading ? (
        <Text style={styles.loadingText}>Carregando...</Text>
      ) : fazendas.length > 0 ? (
        fazendas.map((fazenda, index) => (
          <CardFazendas
            key={index}
            idFazenda={fazenda.id_fazenda}
            title={fazenda.nome_fazenda}
            numArmadilhas={"0"}
            numPragas={"0"}
            setFazendas={setFazendas}
            fazenda={fazenda}
          />
        ))
      ) : (
        <Text style={styles.loadingText}>Nenhuma fazenda cadastrada</Text>
      )}

      {fazendas.length > 0 ? (
        <Text style={styles.footerText}>Agro Vision</Text>
      ) : null}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },

  textTitle: {
    fontSize: 50,
    color: "#fff",
    textAlign: "center",
    marginTop: 50,
    marginBottom: 20,
    fontWeight: "bold",
  },

  textSubTitle: {
    fontSize: 25,
    color: "#fff",
    margin: 10,
    marginTop: 20,
    marginBottom: 10,
    fontWeight: "bold",
  },

  boxContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  BoxFazenda: {
    width: 185,
    height: 185,
    backgroundColor: "#E4E4E4",
    borderRadius: 10,
    margin: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  BoxArmadilha: {
    width: 185,
    height: 185,
    backgroundColor: "#E4E4E4",
    borderRadius: 10,
    margin: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  boxText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  BoxFazendaImagem: {
    width: 370,
    height: 200,
    backgroundColor: "#E4E4E4",
    borderRadius: 10,
    margin: 10,
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  image: {
    width: 170,
    height: 150,
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-start",
    gap: 20,
  },
  loadingText: {
    color: "#fff",
    textAlign: "center",
    marginTop: 20,
    fontSize: 18,
  },
  footerText: {
    color: "#fff",
    textAlign: "center",
    marginTop: 20,
    marginBottom: 80,
    fontSize: 18,
  },
});
