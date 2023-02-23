import { useEffect, useState } from 'react';
import { Text, View } from 'react-native';

export default function Chamado(props) {
    const { resp, user, data, id } = props;
    const [PostId, setPostId] = useState("")

    useEffect(() => {

        console.log(id);
        const options = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                "idPost": id
            })
          };
          
          fetch('http://localhost:5000/forum/readTag', options)
            .then(response => response.json())
            .then(response => {
                if (response !== null) {
                    setPostId(response[0].tag)
                    console.log(response[0].tag);
                }
            })

    }, [id])

    return (
        <View style={styles.post}>
            <View style={styles.postinfo}>
                <Text style={styles.postMessage}>{resp}</Text>
            </View>
            <View style={styles.postinfo2}>
                <Text style={styles.postTag}>{PostId}</Text>
                <View style={styles.infoUser}>
                    <Text style={styles.infoUserNome}>{user}</Text>
                    <Text style={styles.infoUserData}>{data}</Text>
                </View>
            </View>
        </View>
    )
}

import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    post: {
        minHeight: '100px',
        width: '85%',
        backgroundColor: 'white',
        marginTop: '20px',
        display: "flex",
        flexDirection: "colum",
        alignItems: "center",
        justifyContent: "space-between",
        borderRadius: "5px"
    },
    postinfo: {
        width: "100%",
        padding: "5px"
    },
    postinfo2: {
        width: "100%",
        padding: "10px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row"
    },
    infoUser: {
        display: "flex",
        flexDirection: "row",
        width: "65%",
        justifyContent: "space-between"
    },
    postTag: {
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
    infoUserNome: {
        fontSize: "80%",
        fontWeight: "600",
        letterSpacing: "1px",
    },
    infoUserData: {
        fontWeight: "500"
    },
    postMessage: {
        fontWeight: 'bold',
        alignItems: 'center'
    },

});