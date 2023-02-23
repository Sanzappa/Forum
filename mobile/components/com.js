import { Text, View } from 'react-native';
import ComAnswer from "./answer"

export default function Chamado(props) {
    const { resp, user, data, answer, nav } = props;

    function answerC() {
        if (answer !== undefined) {
            var date = new Date(answer.dataComment)
            var df = date.toLocaleDateString('pt-BR', { timeZone: 'UTC' })
            return (
                <ComAnswer user={answer.usuarioComment} respAnswer={answer.resposta} data={df} ></ComAnswer>
            )
        } else {
            return(
                <View style={styles.answer}>
                    <TouchableOpacity onPress={nav}><Text style={styles.textAnswer}>Responder</Text></TouchableOpacity>
                </View>
            )
        }
    }

    return (
        <View>
            <View style={styles.cardComentario}>
                <View style={styles.cardCima}>
                    <Text style={styles.postMessage}>{resp}</Text>
                </View>
                <View style={styles.cardBaixo} >
                    <Text style={styles.infoUserNome} >{user}</Text>
                    <Text style={styles.infoUserData} >{data}</Text>
                </View>
            </View>

            {
                answerC()
            }
        </View>

    )
}

import { StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const styles = StyleSheet.create({
    cardComentario: {
        height: "80px",
        width: "80%",
        borderLeftWidth: "2px",
        borderColor: "#000",
        backgroundColor: "#cacbcc",
        borderRadius: "3px",
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        marginTop: '20px',
        marginBottom: "20px"
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
    answer: {
        height: "40px",
        width: "60%",
        backgroundColor: "#3b3ee3",
        borderRadius: "3px",
        display: 'flex',
        justifyContent: 'center',
        alignItems: "center",
        marginTop: '5px',
        marginLeft: "30px"
    },
    textAnswer: {
        color: "#fff",
        letterSpacing: "2px",
        fontSize: "13pt",
        fontWeight: "700"
    },
});