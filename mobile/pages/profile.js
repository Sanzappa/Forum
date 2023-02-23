import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { useState } from 'react';


import AsyncStorage from '@react-native-async-storage/async-storage';


export default function telaHome({ navigation }) {

    const [user, setUser] = useState("")

    var resp
    const getData = async () => {
        try {
          const value = await AsyncStorage.getItem('Info')
          resp = JSON.parse(value)
          if (value !== null) {
            setUser(resp[0])
          }
        } catch (e) {
    
        }
      }

      setTimeout(() => {
        getData()
      }, 0)


    return (
        <View style={styles.v}>
            <Text style={styles.user}>{user}</Text>
            <TouchableOpacity style={styles.btn} onPress={() => {navigation.reset({
                index: 0,
                routes: [{name: 'Login'}]
            })}}><Text style={styles.text}>Voltar para o Lobby</Text></TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    v: {
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-around",
        flexDirection: "column",
        backgroundColor: "#505050",
        padding: "200px"
    },
    user: {
        backgroundColor: "#346beb",
        width: "200px",
        height: "60px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: "5px",
        fontSize: "20pt",
        fontWeight: "600",
        letterSpacing: "2px",
        color: "#fff"
    },
    btn: {
        height: "50px",
        width: "170px",
        backgroundColor: "#cc0e0e",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: "10px"
    },
    text: {
        color: "#fff",
        letterSpacing: "2px",
        fontSize: "10pt"
    }
});