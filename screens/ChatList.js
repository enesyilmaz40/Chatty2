import React, { useState, useEffect } from "react";
import { Text, View } from "react-native";
import { List, Avatar, Divider, FAB, Portal, Dialog, Button, TextInput } from "react-native-paper";
import { collection, Firestore, addDoc, getFirestore,where, getDocs,doc, onSnapshot,query, onSnapshotsInSync } from "firebase/firestore";
import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useNavigation } from "@react-navigation/core";


const firebaseConfig = {
    apiKey: "AIzaSyA8gF3eGgyeWxt68LyspIuVW06mpfT1Tok",
    authDomain: "chat-app-2f1aa.firebaseapp.com",
    projectId: "chat-app-2f1aa",
    storageBucket: "chat-app-2f1aa.appspot.com",
    messagingSenderId: "330910868444",
    appId: "1:330910868444:web:2c1e4e760d753f28dca519"
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const ChatList = () => {
    const [isDialogVisible, setIsDialogVisible] = useState(false);
    const [email, setEmail] = useState("");
    const [userEmail, setUserEmail] = useState("");
    useEffect(async () => {
        const auth = getAuth();
        const response =  await onAuthStateChanged(auth, (user) => {
            setEmail(user?.email ?? "")
        });
        return response;

    }, []);
    const [isLoading, setIsLoading] = useState(false);
    const navigation = useNavigation();

    const createChat = async () => {
        if (!email || !userEmail) return;
        setIsLoading(true);
        try {
            const docRef = await addDoc(collection(db, "users"), {
                users: [email, userEmail],
            });
            console.log("Document written with ID: ", docRef.id);
            setIsLoading(false);
            setIsDialogVisible(false);
            navigation.navigate('Chat');

        } catch (e) {
            console.error("Error adding document: ", e);
        }

    }
    useEffect(async () => {
        const q = query(collection(db, "chats"), where("users", "array-contains", email));

        const querySnapshot = await getDocs(q);
        querySnapshot((doc) => {
          // doc.data() is never undefined for query doc snapshots
          console.log(doc, " => ", doc.data());
        });
        return querySnapshot;
    }, [email]);

    return (
        <View style={{ flex: 1 }}>
            <List.Item title="User"
                description="Hi, I will be waiting for you"
                left={() => <Avatar.Text label="UN" size={56} />}
            />
            <Divider inset />
            <Portal>
                <Dialog visible={isDialogVisible} onDismiss={() => setIsDialogVisible(false)}>
                    <Dialog.Title>New Chat</Dialog.Title>
                    <Dialog.Content>
                        <TextInput
                            label="Enter user email"
                            value={userEmail}
                            onChangeText={(text) => setUserEmail(text)}
                        />
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button onPress={() => createChat()} loading={isLoading} >Save
                        </Button>
                        <Button onPress={() => setIsDialogVisible(false)}>Cancel</Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>
            <FAB icon="plus"
                style={{ position: "absolute", bottom: 16, right: 16 }}
                onPress={() => setIsDialogVisible(true)}
            />
        </View>
    )
}

export default ChatList;