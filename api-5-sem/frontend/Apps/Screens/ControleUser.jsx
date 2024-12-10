import React, { useState, useEffect } from "react";
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  TouchableOpacity,
  Linking,
  Modal,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import api from "../Services/Axios";
import { useAuth } from "../Context/authContext";
import { useNavigation } from "@react-navigation/core";

export default function ControleUser() {
  const { idUser } = useAuth();
  const navigation = useNavigation();

  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await api.get(`/users`);
        setUsers(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log("Erro ao buscar usuários:", error);
        setIsLoading(false);
      }
    }
    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    try {
      await api.delete(`/users/${id}`);
      setUsers(users.filter((user) => user.id !== id));
      navigation.reset({
        index: 0,
        routes: [{ name: 'Main' }],
      });
    } catch (error) {
      console.log("Erro ao deletar usuário:", error);
    }
  };

  const sendWhatsAppMessage = (phone_number) => {
    try {
      const phoneNumber = phone_number.toString();
      const message = 'Foram encontradas 16 pragas'; // Alterar para enviar a quantidade do ultimo registro de pragas
      const url = `whatsapp://send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;
      Linking.openURL(url);
      setShowModal(true);
      setTimeout(() => {
        setShowModal(false);
      }, 2000);
    } catch (error) {
      console.error('Erro ao enviar mensagem:', error);
    }
  };


  return (
    <View style={styles.container}>
      <Text style={styles.textSubTitle}>Usuários</Text>
      <View style={styles.scrollContainer}>
        <ScrollView style={styles.listContainer}>
          {users.map((user) =>
            user.id_usuario === idUser ? null : (
              <View style={styles.Arquivos} key={user.id_usuario}>
                <View style={styles.secondBox}>
                  <Ionicons
                    name="person"
                    size={30}
                    color="#8DC63E"
                    style={styles.icon}
                  />
                  <Text style={styles.itemText}>{user.nome}</Text>
                </View>
                <Ionicons
                  name="logo-whatsapp"
                  size={30}
                  color="#22C55E"
                  style={styles.icon}
                  onPress={() => sendWhatsAppMessage(user.telefone)}
                />
                <Ionicons
                  name="trash"
                  size={30}
                  color="#C21111"
                  style={styles.icon}
                  onPress={() => handleDelete(user.id_usuario)}
                />
              </View>
            )
          )}
        </ScrollView>
        <TouchableOpacity
          style={styles.sendButton}
          onPress={() => navigation.navigate("CadastroUsuario")}
        >
          <View>
            <Text style={styles.cadButtonText}>Novo Usuário</Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* Modal para exibir aviso de mensagem enviada */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={showModal}
        onRequestClose={() => setShowModal(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Mensagem enviada com sucesso!</Text>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#323335",
    marginTop: 50,
  },
  textSubTitle: {
    fontSize: 25,
    color: "#fff",
    margin: 10,
    marginTop: 20,
    marginBottom: 10,
    fontWeight: "bold",
  },
  scrollContainer: {
    flex: 1,
    alignItems: "flex-end",
    justifyContent: "center",
    width: "100%",
  },
  listContainer: {
    flex: 1,
    width: "100%",
    backgroundColor: "#E4E4E4",
    borderRadius: 10,
    paddingHorizontal: 20,
  },
  Arquivos: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  secondBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
  },
  icon: {
    marginRight: 10,
  },
  sendButton: {
    marginTop: 10,
    marginBottom: 70,
    width: 150,
    height: 50,
    backgroundColor: "#F45D16",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    borderRadius: 10,
  },
  cadButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  itemText: {
    fontSize: 16,
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalText: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
});
