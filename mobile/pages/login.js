
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { TextInput } from 'react-native-web';
import { useState } from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';

export default function telaLogin({ navigation }) {

    const img = require("../../front/viewpoint/docs/logo2.png")

    const [usuario, setUsuario] = useState("")
    const [senha, setSenha] = useState("")
    const [at, setAt] = useState(false)
    const [info] = useState([])

    const storeData = async () => {

        info.push(usuario)
        try {
            await AsyncStorage.setItem('Info', JSON.stringify(info))
        } catch (e) {
            // saving error
        }
    }

    const verificar = () => {
        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "usuario": usuario,
                "senha": btoa(senha)
            })
        };

        fetch('http://localhost:5000/forum/validauser', options)
            .then(response => response.json())
            .then(response => {
                if (response.autoriza === true) {
                    navigation.navigate("Post")
                    storeData()
                }
            })
    }

    return (
        <View style={styles.v}>

            <Image
                style={styles.Logo}
                source={img} />

            <TextInput style={{ ...styles.inp1, borderBottomWidth: at ? 4 : 2, borderColor: at ? "red" : "#7242F5" }} placeholder="Usuario" onChangeText={(usuario) => { setUsuario(usuario) }} />
            <TextInput secureTextEntry={true} style={styles.inp2} placeholder="Senha" onChangeText={(senha) => { setSenha(senha) }} />

            <TouchableOpacity style={styles.btn} onPress={verificar}><Text style={styles.t}>Login</Text></TouchableOpacity>

        </View>
    )
}

const styles = StyleSheet.create({
    v: {
        height: "100%",
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "#505050"
    },
    Logo: {
        width: 150,
        height: 150
    },
    inp1: {
        height: 40,
        width: 300,
        backgroundColor: "#fff",
        borderRadius: 5,
        marginTop: 20,
        paddingLeft: 10,
    },
    inp2: {
        height: 40,
        width: 300,
        backgroundColor: "#fff",
        borderRadius: 5,
        borderBottomWidth: 2,
        borderColor: "#7242F5",
        marginTop: 20,
        paddingLeft: 10
    },
    btn: {
        height: 40,
        width: 300,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#7242f5",
        marginTop: 20,
        borderRadius: 5
    },
    t: {
        fontWeight: "bold",
        color: "#fff",
        fontSize: 18
    }
});