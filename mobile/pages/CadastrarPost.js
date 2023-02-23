import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, View, Image, TextInputBase } from 'react-native';
import { Button, Picker, TouchableOpacity } from 'react-native-web';

import AsyncStorage from '@react-native-async-storage/async-storage';

import TagCom from "../components/tagCom";

export default function App({ navigation }) {

  const [selectedValue, setSelectedValue] = useState("");
  const [duvida, setDuvida] = useState("")
  const [user, setUser] = useState("")
  const [idPost, setIdPost] = useState(0)

  const [tag, setTag] = useState([])

  useEffect(() => {
    function carregarTag() {
      const options = { method: 'GET' };
  
      fetch('http://localhost:5000/forum/tag', options)
        .then(response => response.json())
        .then(resp => {
          setTag(resp)
        })
    }

    var resp
    const getData = async () => {
      try {
        const value = await AsyncStorage.getItem('Info')
        const value2 = await AsyncStorage.getItem('PostId')
        resp = JSON.parse(value)
        console.log(parseInt(value2))
        if (value !== null && value2 !== null) {
          setUser(resp[0])
          setIdPost(parseInt(value2))
        }
      } catch (e) {
  
      }
    }
  
    setTimeout(() => {
      carregarTag()
      getData()
    }, 500)
  }, [idPost])

  useEffect(() => {
    console.log(idPost)
  }, [tag])

  

  function cadastrar() {

    var at = new Date()

    var fat = at.getFullYear() + "/" +(at.getMonth() + 1) + "/" + at.getDate()

    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        "duvida": duvida,
        "user": user,
        "data": fat
      })
    };

    fetch('http://localhost:5000/forum/cadastrarPost', options)
      .then(response => response.json())
      .then(response => {
        if (response !== null) {
          const options2 = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              "tag": selectedValue,
              "idPost": idPost
            })
          };

          fetch('http://localhost:5000/forum/postsTag', options2)
            .then(response => response.json())
            .then(resp => {
              if (resp !== null) {
                console.log(resp);
                navigation.jumpTo('Feed');
              }
            })
        }
      })
  }

  return (
    <View style={styles.container}>
      <TextInput style={styles.inp} multiline={true} numberOfLines={10} placeholder={"Digite sua dúvida aqui"} onChangeText={(duvida) => { setDuvida(duvida) }} />
      <Picker
        selectedValue={selectedValue}
        style={{ height: 50, width: 150, backgroundColor: "#4287f5", borderColor: "#000", color: "#fff" }}
        onValueChange={(itemValue) => setSelectedValue(itemValue)}
      >

        {
          tag.map((e, index) => {
            return (
              <TagCom key={index} tag={e.tag} ></TagCom>
            )
          })
        }
      </Picker>
      <TouchableOpacity style={styles.btn} onPress={cadastrar}><Text style={styles.btnText}>Registrar</Text></TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3154a3',
    alignItems: 'center',
    justifyContent: "space-around",
    padding: "150px"
  },
  inp: {
    backgroundColor: "#1e3568",
    height: "150px",
    width: "280px",
    borderRadius: "10px",
    color: "#fff",
    padding: "10px"
  },
  btn: {
    height: 60,
    width: 200,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1e3568",
    marginTop: 20,
    borderRadius: 5
  },
  btnText: {
    color: "#fff",
    fontSize: "15pt",
    fontWeight: "700",
    letterSpacing: "2px"
  },

});