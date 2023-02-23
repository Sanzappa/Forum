import { Text, View } from 'react-native';

export default function Chamado(props) {
    const { respAnswer, user, data} = props;

    return (
        <View style={styles.cardAnswer}>
                    <View style={styles.cardCima}>
                        <Text style={styles.postMessage}>{respAnswer}</Text>
                    </View>
                    <View style={styles.cardBaixo} >
                        <Text style={styles.infoUserNome} >{user}</Text>
                        <Text style={styles.infoUserData} >{data}</Text>
                    </View>
                </View>
    )
}

import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    cardAnswer: {
        height: "60px",
        width: "80%",
        borderLeftWidth: "2px",
        borderBottomWidth: "2px",
        borderColor: "#000",
        backgroundColor: "#cacbcc",
        borderRadius: "3px",
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        marginTop: '5px',
        marginLeft: "30px"
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