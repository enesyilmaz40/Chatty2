import React, { useState } from "react";
import { Text, View } from "react-native";
import { TextInput, Button, Subheading  } from "react-native-paper";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";
import { async } from "@firebase/util";



const SignUp = () => {
    const navigation = useNavigation()
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [isLoading, setIsLoading] = useState("")
    const [error, setError] = useState("");



    const createAccount =async  () => {
        setIsLoading(true);
        const auth =getAuth();

            const response = await  createUserWithEmailAndPassword(auth,email, password)
                .then((userCredential) => {
                    alert("Account Created");
                    const user = userCredential.user;
                    console.log(user.email);
                   navigation.popToTop();
                })
                .catch(error => 
                    alert(error.message), 
                    setError(error.message));
            return response;
        
    
    }
          
          
    return (
        <View style={{ margin: 16 }}>
            {!!error &&( <Subheading style={{color:"red",textAlign:"center",marginTop:16}}>{error}</Subheading>)}
            <TextInput label="Name"
                value={name}
                onChangeText={(text) => setName(text)} />


            <TextInput label="Email" style={{ marginTop: 12 }}
                value={email}
                onChangeText={(text) => setEmail(text)}
                keyboardType="email-address" />


            <TextInput label="Password" style={{ marginTop: 12 }}
                value={password}
                onChangeText={(text) => setPassword(text)}
                secureTextEntry
            />
            <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 16 }}>
                <Button compact onPress={()=> navigation.navigate("SignIn") }>Sign In</Button>
                <Button
                mode="contained" 
                onPress={createAccount} 
                loading={isLoading}>Sign Up</Button>
            </View>
        </View>
    )
}

export default SignUp;