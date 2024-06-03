import { StyleSheet, Text, View } from "react-native";
import { useTheme, TextInput, Button } from "react-native-paper";

const StyledTextInput = (props)=>{
    
return (
    <TextInput {...props} style={styles.textbox} />
)
}

export default StyledTextInput;

const styles = StyleSheet.create({
    textbox:{
        height: 40,
        margin: 12,
        padding: 10,
        width: '50%',
        maxWidth: 300,
        minWidth: 100,
    }
})