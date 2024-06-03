import { StyleSheet, Text, View } from "react-native";
import { useTheme, TextInput, Button } from "react-native-paper";

const StyledButton = (props)=>{
    const {children} = props;
    return(
        <Button style={styles.styledbutton} {...props}>
            {children}
        </Button>
    )
}

const styles = StyleSheet.create({
    styledbutton:{
        margin: 5,
        padding: 5,
    }
})

export default StyledButton;