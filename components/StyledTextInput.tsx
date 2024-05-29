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
        margin: 2,
        width:'60%'
    }
})