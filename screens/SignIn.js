import React, { useState } from "react";
import { Text, View } from "react-native";
import { TextInput, Button, Subheading  } from "react-native-paper";
import { getAuth, signInWithEmailAndPassword  } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";




const SignIn = () => {
    const navigation = useNavigation()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [isLoading, setIsLoading] = useState("")
    const [error, setError] = useState("");



    const signIn = async   () => {
        setIsLoading(true);
        const auth =  getAuth();

            const response = await  signInWithEmailAndPassword(auth, email, password)
              .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                navigation.popToTop();
                // ...
              })
              .catch((error) => {
                setIsLoading(false);
                setError(e.message);
              });
            return response;
        
    
    }
          
          
    return (
        <View style={{ margin: 16 }}>
            {!!error &&( <Subheading style={{color:"red",textAlign:"center",marginTop:16}}>{error}</Subheading>)}



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
                <Button compact onPress={()=> navigation.navigate("SignUp") }>Sign Up</Button>
                <Button
                mode="contained" 
                onPress={signIn} 
                loading={isLoading}>Sign In</Button>
            </View>
        </View>
    )
}

export default SignIn;