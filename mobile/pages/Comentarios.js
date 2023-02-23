import { StatusBar } from 'expo-status-bar';
import { Button, Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { TextInput } from 'react-native-web';
import { useState, useEffect, useMemo } from 'react';
import { set } from 'react-native-reanimated';

import Comment from "../components/com"

export default function telaHome({ navigation, route }) {

    const [idPost] = useState(route.params)
    const [posts, setPosts] = useState([])
    const [comment, setComment] = useState([])
    const [user, setUser] = useState("")
    const [answer] = useState([])

    useEffect(() => {
        function carregarPost() {
            console.log(idPost.idPost)
            const options = { method: 'GET' };

            fetch('http://localhost:5000/forum/post/' + idPost.idPost, options)
                .then(response => response.json())
                .then(resp => {
                    if (resp !== "Infelizmente não conseguimos encontrar a pergunta selecionada") {
                        setPosts([resp])
                        setComment(resp.comments)
                    }
                })
        }

        
        setTimeout(() => {
            carregarPost()
        }, 500)
    }, [])

    return (
        <View style={styles.v}>
            {
                posts.map((p, index) => {

                    var date = new Date(p.dataPost)
                    var dt = date.toLocaleDateString('pt-BR', { timeZone: 'UTC' })
                    return (
                        <View style={styles.card} key={index}>
                            <View style={styles.cardCima}>
                                <Text style={styles.postMessage}>{p.postDuvida}</Text>
                            </View>
                            <View style={styles.cardBaixo} >
                                <Text style={styles.infoUserNome} >{p.usuario}</Text>
                                <Text style={styles.infoUserData} >{dt}</Text>
                            </View>
                        </View>
                    )
                })
            }
            <View style={styles.add}>
                <TouchableOpacity style={styles.btnAdd} onPress={() => {navigation.navigate("Cadastro", {idPost:idPost.idPost})}}><Text style={styles.addText}>Comentar</Text></TouchableOpacity>
            </View>
            <ScrollView style={styles.sv}>
                {
                    comment.map((d, index) => {
                        var date = new Date(d.dataComment)
                        var df = date.toLocaleDateString('pt-BR', { timeZone: 'UTC' })
                        return (
                            <Comment key={index} resp={d.resposta} user={d.usuarioComment} data={df} answer={d.answerComments} nav={() => navigation.navigate("Answer", {idComment:d.idComment})}></Comment>
                        )

                    })
                }
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    v: {
        height: "98%",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        backgroundColor: "#486db8",
        width: "100%",

        marginTop: "15px"
    },
    add: {
        marginTop: "20px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "70px",
        width: "100%",
    },
    btnAdd: {
        backgroundColor: "#9042f5",
        height: "80%",
        width: "60%",
        borderRadius: "10px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    addText: {
        color: "#fff",
        letterSpacing: "2px",
        fontSize: "15pt",
        fontWeight: "700"
    },
    sv: {
        height: "100px",
        backgroundColor: "#486db8",
        width: "100%",
        paddingTop: "15px",
        paddingLeft: "50px",
    },
    card: {
        height: "100px",
        width: "90%",
        backgroundColor: "#FFF",
        borderRadius: "10px",
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        marginTop: '20px',
    },
    cardCima: {
        width: "100%",
        padding: "5px"
    },
    cardBaixo: {
        width: "100%",
        padding: "10px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row"
    },
    tag: {
        height: "140%",
        width: "30%",
        backgroundColor: "#064365",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontSize: "10pt",
        fontWeight: "600",
        borderRadius: "5px",
        color: "#fff"
    },
    postMessage: {
        fontWeight: 'bold',
        alignItems: 'center'
    },
    infoUserNome: {
        fontSize: "80%",
        fontWeight: "600",
        letterSpacing: "1px",
    },
    infoUserData: {
        fontWeight: "500"
    },
});