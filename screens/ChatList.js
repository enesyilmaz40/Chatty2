import React,{useState,useEffect} from "react";
import { Text, View } from "react-native";
import { List, Avatar, Divider, FAB, Portal, Dialog,Button,TextInput } from "react-native-paper";
import { collection, Firestore,addDoc} from "firebase/firestore"; 
import firebase from "firebase/app";


const ChatList = () => {
    const [isDialogVisible, setIsDialogVisible]=useState(false);
 
    return (
        <View style={{ flex: 1 }}>
            <List.Item title="User"
                description="Hi, I will be waiting for you"
                left={() => <Avatar.Text label="UN" size={56} />}
            />
            <Divider inset />
            <Portal>
                <Dialog visible={isDialogVisible} onDismiss={()=>setIsDialogVisible(false)}>
                    <Dialog.Title>New Chat</Dialog.Title>
                    <Dialog.Content>
                      <TextInput label="Enter user email"/>
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button  >Save
                        </Button>
                        <Button  onPress={()=>setIsDialogVisible(false)}>Cancel</Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>
            <FAB icon="plus" 
            style={{ position: "absolute", bottom: 16, right: 16 }}
            onPress={()=>setIsDialogVisible(true)}
            />
        </View>
    )
}

export default ChatList;