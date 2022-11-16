import React,{useEffect} from "react";
import { Text } from "react-native";
import { NavigationContainer,useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ChatList from './screens/ChatList';
import Chat from './screens/Chat';
import SignIn from './screens/SignIn';
import SignUp from './screens/SignUp';
import Settings from './screens/Settings';
import {Ionicons} from '@expo/vector-icons'
import { Provider } from "react-native-paper";
import firebase from 'firebase/app'
import { initializeApp } from 'firebase/app';
import { getAuth,onAuthStateChanged  } from "firebase/auth";
 import 'firebase/compat/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyA8gF3eGgyeWxt68LyspIuVW06mpfT1Tok",
  authDomain: "chat-app-2f1aa.firebaseapp.com",
  projectId: "chat-app-2f1aa",
  storageBucket: "chat-app-2f1aa.appspot.com",
  messagingSenderId: "330910868444",
  appId: "1:330910868444:web:2c1e4e760d753f28dca519"
};
 initializeApp(firebaseConfig);


const Stack = createNativeStackNavigator();
const Tabs = createBottomTabNavigator();



const TabsNavigator = () =>{
  const navigation =useNavigation();
  useEffect(()=>{

    const auth = getAuth();
onAuthStateChanged(auth, (user) => {
  if (user) {
 
    const uid = user.uid;

  } else {
  
    navigation.navigate("SignUp");
  }
});
    
  },[])
  return(  <Tabs.Navigator screenOptions={({route})=>({
    tabBarIcon: ({ focused, color, size }) => {

      return <Ionicons name={route.name==="ChatList"?"chatbubbles":"settings"} size={size}
       color={color} />;
    },
    tabBarActiveTintColor: 'tomato',
    tabBarInactiveTintColor: 'gray',
  })}>
    <Tabs.Screen name="ChatList" component={ChatList}/>
    <Tabs.Screen name="Settings" component={Settings}/>
  </Tabs.Navigator>)
}

const App = () => {
  return (

    <NavigationContainer>
      <Provider>
      <Stack.Navigator>
        <Stack.Screen name="Main" component={TabsNavigator} options={{headerShown:false}}/>
        <Stack.Screen name="Chat" component={Chat}/>
        <Stack.Screen name="SignUp" component={SignUp} options={{presentation:"fullScreenModal"}}/>
        <Stack.Screen name="SignIn" component={SignIn}  options={{presentation:"fullScreenModal"}}/>
      </Stack.Navigator>
      </Provider>
    </NavigationContainer>
  )
}
export default App;