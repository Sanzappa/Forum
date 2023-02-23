import { Picker } from 'react-native-web';



export default function Chamado(props) {
    const { tag } = props;
    
    return (
        <Picker.Item label={tag} value={tag}/>
    )
}