import { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { TouchableOpacity } from 'react-native-web';

import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App({ navigation, route }) {

    const [idPost] = useState(route.params)
    const [resposta, setResposta] = useState("")
    const [user, setUser] = useState("")

    useEffect(() => {

        var resp
        const getData = async () => {
            try {
                const value = await AsyncStorage.getItem('Info')
                resp = JSON.parse(value)
                console.log(resp[0])
                if (value !== null) {
                    setUser(resp[0])
                }
            } catch (e) {

            }
        }

        setTimeout(() => {
            getData()
        }, 500)
    }, [])

    function cadastrarComment() {

        var at = new Date()
        var fat = at.getFullYear() + "/" + (at.getMonth() + 1) + "/" + at.getDate()

        console.log( idPost.idPost + resposta + user + fat);

        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "idPost": idPost.idPost,
                "resposta": resposta,
                "usuario": user,
                "data": fat
            })
        };

        fetch('http://localhost:5000/forum/comment', options)
            .then(response => response.json())
            .then(response => {
            if (response !== null) {
                navigation.navigate("Post")
            }
            })
    }

    return (
        <View style={styles.container}>
            <TextInput style={styles.inp} multiline={true} numberOfLines={10} placeholder={"Digite seu comentário aqui"} onChangeText={(resposta) => { setResposta(resposta) }} />

            <TouchableOpacity style={styles.btn} onPress={cadastrarComment}><Text style={styles.btnText}>Registrar</Text></TouchableOpacity>
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