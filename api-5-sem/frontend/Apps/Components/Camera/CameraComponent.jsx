import React, { useEffect, useState, useRef } from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  Modal,
  Image,
  ActivityIndicator,
} from "react-native";
import { Camera } from "expo-camera";
import { FontAwesome } from "@expo/vector-icons";
import api from "../../Services/Axios";
import { useRoute } from "@react-navigation/core";
import {useNavigation} from "@react-navigation/core";

import axios from "axios";

export default function CameraComponent() {
  const [typeCamera, setTypeCamera] = useState(Camera.Constants.Type.back);
  const [hasPermission, setHasPermission] = useState(null);
  const [capturedPhoto, setCapturedPhoto] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [totalPragas, setTotalPragas] = useState(0)
  const camRef = useRef(null);

  const navigation = useNavigation()


  const route = useRoute()
  const {idArmadilha} = route.params;


  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
      console.log(status);
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }

  if (hasPermission === false) {
    return <Text>Acesso Negado!</Text>;
  }

  async function takePicture() {
    if (camRef) {
      const data = await camRef.current.takePictureAsync();
      setCapturedPhoto(data.uri);
      setModalIsOpen(true);
    }
  }

  async function savePicture() {
    if (capturedPhoto) {
      try {
        setIsSaving(true);

        const data = new FormData();
        data.append("file", {
          uri: capturedPhoto,
          type: "image/jpeg",
          name: "photo.jpg",
        });

        const data_IA = new FormData();
        data_IA.append("imagem", {
          uri: capturedPhoto,
          type: "image/jpeg",
          name: "imagem.jpg"
        })

        // const response = await fetch("http://192.168.28.72:3000/files/upload", {
        //   method: "POST",
        //   body: data,
        // });

        
        // const s3 = await api.post("/files/upload", data, {
        //   headers: {
        //     "Content-Type": "multipart/form-data",
        //   },
        // });


        const dataAtual = new Date();
        const data_formatada = dataAtual.toISOString().slice(0,19).replace('T', ' ')
        console.log('comecando ai')
        const processamento_pragas = await axios.post('http://192.168.101.202:5000/processar-imagem', data_IA, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then(async response => {
            console.log('resultado do processamento de pragas: ', response.data);
            setTotalPragas(response.data.resultado)
            console.log(typeof(response.data.resultado))
            const armazenando_dados_pragas = await api.post('/dados-armadilhas', {
              "tipo_praga":"praga",
              "quantidade":parseFloat(response.data.resultado),
              "data_coleta": data_formatada,
              "id_armadilha": idArmadilha
            })
            navigation.navigate('Main')
          })
          .catch(error => {
            console.error("Erro no upload:", error);
          });

        


   

      } catch (error) {
        console.error("Upload error:", error);
      } finally {
        setIsSaving(false);
        setModalIsOpen(false);
      }
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <Camera
        style={{ flex: 1, aspectRatio: 3 / 4 }}
        type={typeCamera}
        ref={camRef}
      />

      <View style={styles.containerButtons}>
        <TouchableOpacity style={styles.buttonCamera} onPress={takePicture}>
          <FontAwesome name="camera" size={23} color={"white"} />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.buttonRotate}
          onPress={() => {
            setTypeCamera(
              typeCamera === Camera.Constants.Type.back
                ? Camera.Constants.Type.front
                : Camera.Constants.Type.back
            );
          }}
        >
          <FontAwesome name="rotate-right" size={23} color={"#fff"} />
        </TouchableOpacity>
      </View>

      {capturedPhoto && (
        <Modal animationType="slide" transparent={false} visible={modalIsOpen}>
          <View style={{ flex: 1, backgroundColor: "#323335" }}>
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                margin: 20,
              }}
            >
              <Image
                style={{ width: "100%", height: 300, borderRadius: 20 }}
                source={{ uri: capturedPhoto }}
              />

              <View style={{ flex: 0, flexDirection: "row" }}>
                <TouchableOpacity
                  style={{ margin: 10 }}
                  onPress={() => {
                    setModalIsOpen(false), setIsSaving(false);
                  }}
                >
                  <FontAwesome name="window-close" size={50} color={"red"} />
                </TouchableOpacity>

                <TouchableOpacity style={{ margin: 10 }} onPress={savePicture}>
                  {isSaving ? (
                    <ActivityIndicator size={50} color="green" />
                  ) : (
                    <FontAwesome name="check" size={50} color={"green"} />
                  )}
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  containerButtons: {
    flex: 0,
    flexDirection: "row",
    justifyContent: "center",
    height: 80,
    backgroundColor: "#323335",
  },
  buttonRotate: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F45D16",
    borderRadius: 100,
    margin: 10,
    marginRight: 20,
    height: 50,
    width: 80,
  },
  buttonCamera: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F45D16",
    borderRadius: 100,
    margin: 10,
    marginLeft: 30,
    height: 50,
    width: 80,
  },
});
