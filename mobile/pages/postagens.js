import { StatusBar } from 'expo-status-bar';
import { Button, Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { TextInput } from 'react-native-web';
import { useState, useEffect, useMemo } from 'react';
import { set } from 'react-native-reanimated';

import AsyncStorage from '@react-native-async-storage/async-storage';

import PostComponent from '../components/postCom'

export default function telaHome({ navigation }) {

    const [posts, setPosts] = useState([])

    useEffect(() => {
        function carregarPost() {
            const options = { method: 'GET' };

            fetch('http://localhost:5000/forum/posts', options)
                .then(response => response.json())
                .then(resp => {
                    setPosts(resp)
                })
        }

        setTimeout(() => {
            carregarPost()
        }, 500)
    }, [posts])

    const storeData = async (s) => {
        try {
            await AsyncStorage.setItem('PostId', s)
        } catch (e) {
            // saving error
        }
    }

    return (
        <View style={styles.v}>

            <ScrollView style={styles.sv}>
                {
                    posts.map((e, index) => {
                        storeData(index+2)
                        var date = new Date(e.data)
                        var dt = date.toLocaleDateString('pt-BR', { timeZone: 'UTC' })
                        return (
                            <TouchableOpacity key={index} onPress={() => {navigation.navigate("Comentarios", {idPost:e.id})}}>
                                <PostComponent user={e.usuario} resp={e.duvida} data={dt} id={e.id}></PostComponent>
                            </TouchableOpacity>
                        )
                    })
                }


            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    v: {
        height: "100%",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        backgroundColor: "#505050",
        width: "100%",
        paddingLeft: "50px"
    },
    sv: {
        height: "100%",
        backgroundColor: "#505050",
        width: "100%"
    }

});