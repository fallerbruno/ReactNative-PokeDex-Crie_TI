import React, { useContext, useEffect, useRef, useState } from 'react';
import { Button, FlatList, Text, View } from 'react-native';
import { Modalize } from 'react-native-modalize';
import { AppContext } from '../context/AppContext';
import { theme } from '../styles/Theme';
import RnGH, { TextInput } from 'react-native-gesture-handler';
import { Picker } from '@react-native-picker/picker';
import CustomButton from '../components/CustomButton';
import axios from 'axios';
import Header from '../components/Header';
const base64 = require('base-64');
// import { Container } from './styles';

const ViewMessages = () => {
  const { username, password, id, age, sex } = useContext(AppContext);
  const [listMessagesSend, setListMessagesSend] = useState([])
  const [listUsers, setListUsers] = useState([])
  const [listMessagesReciped, setListMessagesReciped] = useState([])
  const [newMessage, setNewMessage] = useState({
    subject: "",
    message: "",
    read: false,
    senderId: id,
    recipentId: 0,
    recipentName: ""

  })
  console.log(id)
  const [loading, setLoading] = useState(false);
  const modalA = useRef(null);
  const modalB = useRef(null);
  const modalC = useRef(null);

  const [modalAOpen, setModalAOpen] = useState(false);
  const [modalBOpen, setModalBOpen] = useState(false);
  const [modalCOpen, setModalCOpen] = useState(false);

  function onOpenModalA() {
    if (modalAOpen) {
      modalA.current?.close();
    } else {
      modalA.current?.open();
    }
  }

  function onOpenModalB() {
    if (modalAOpen) {
      modalB.current?.close();
    } else {
      modalB.current?.open();
    }
  }

  function onOpenModalC() {
    if (modalCOpen) {
      modalC.current?.close();
    } else {
      modalC.current?.open();
    }
  }

  useEffect(() => {
    MessagesSend()
  },[])

  async function MessagesSend() {
    const response = await fetch(`http://177.44.248.33:3000/message?senderId=${id}`, {
      method: 'GET',
      headers: {
        'Authorization': 'Basic ' +
          base64.encode(username + ":" + password)
      }
    });
    const json = await response.json();


    if (json) {
      setListMessagesSend(json);
    } else {
      Alert.alert('Ops, deu ruim 😥', json.message);
    }

  }

  useEffect(() => {
    MessagesReciped()
  },[] )

  async function MessagesReciped() {
    const response = await fetch(`http://177.44.248.33:3000/message?recipientId=${id}`, {
      method: 'GET',
      headers: {
        'Authorization': 'Basic ' +
          base64.encode(username + ":" + password)
      }
    });
    const json = await response.json();


    if (json) {
      setListMessagesReciped(json);
    } else {
      Alert.alert('Ops, deu ruim 😥', json.message);
    }

  }

  useEffect(() => {
    ListUsers()
  }, [])

  async function ListUsers() {
    const response = await fetch(`http://177.44.248.33:3000/users`, {
      method: 'GET',
      headers: {
        'Authorization': 'Basic ' +
          base64.encode(username + ":" + password)
      }
    });
    const json = await response.json();


    if (json) {
      setListUsers(json);
    } else {
      Alert.alert('Ops, deu ruim 😥', json.message);
    }

  }


  function sendMessage() {
    const data = {
      subject: newMessage.subject,
      message: newMessage.message,
      read: 0,
      senderId: id,
      recipientId: newMessage.recipentId,
    }
    console.log(data)
    axios('http://177.44.248.33:3000/message/', {
      method: 'post',
      headers: {
        'Authorization': 'Basic ' +
          base64.encode('admin@admin.com' + ":" + 'admin')
      },
      data: data

    })
      .then(function (response) {
        setNewMessage(subject = "",
          message = "",
          read = false,
          senderId = id,
          recipentId = 0,
          recipentName = "")
        onOpenModalC()
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  function RenderItem1({ item }) {
    return (
      <View style={{ borderWidth: 1, borderColor: "white", borderRadius: 16, padding: 10, margin: 5 }}>
        <Text style={theme.labelWhite}> To : {item.recipient.name}</Text>
        <Text style={theme.labelWhite} > Subject:  {item.subject}</Text>
        <Text style={theme.labelWhite}> Message:  {item.message}</Text>
        <Text style={theme.labelWhite}> Date: {item.updatedAt.split('-').join('/').slice(0, 10)}</Text>
      </View>
    )
  }

  function RenderItem2({ item }) {
    return (
      <View style={{ borderWidth: 1, borderColor: "white", borderRadius: 16, padding: 10, margin: 5 }}>
        <Text style={theme.labelWhite}> From : {item.sender.name}</Text>
        <Text style={theme.labelWhite} > Subject:  {item.subject}</Text>
        <Text style={theme.labelWhite}> Message:  {item.message}</Text>
        <Text style={theme.labelWhite}> Date: {item.updatedAt.split('-').join('/').slice(0, 10)}</Text>
      </View>
    )
  }


  return (
    <>
      <Header label="Messages" />
      <View style={[theme.container, theme.conintanerblack, {padding: 10}]}>
        <CustomButton
          onPress={() => onOpenModalA()}
          width="100%"
          label="Sended Messages"
          backgroundColor="#9F6E97"
        />
        <CustomButton
          onPress={() => onOpenModalB()}
          width="100%"
          label="Recevied Messages"
          backgroundColor="#8BD674"
        />
        <CustomButton
          onPress={() => onOpenModalC()}
          width="100%"
          label="New Message"
          backgroundColor="#D4C294"
        />

        <Modalize
          ref={modalA}
          onOpen={() => setModalAOpen(true)}
          onClose={() => setModalAOpen(false)}
          modalStyle={theme.modal2}
        >
          <View style={[theme.container, theme.conintanerblack]}>
            <Text style={theme.titleWhite}>Sended Messages</Text>
            <FlatList
              //ListHeaderComponent={}
              //ItemSeparatorComponent={}
              data={listMessagesSend}
              onRefresh={() => MessagesSend()}
              refreshing={loading}
              keyExtractor={item => item.id}
              renderItem={RenderItem1}
              numColumns={1}
            />
          </View>

        </Modalize>

        <Modalize
          ref={modalB}
          onOpen={() => setModalBOpen(true)}
          onClose={() => setModalBOpen(false)}
          modalStyle={theme.modal2}>
          <View style={[theme.container, theme.conintanerblack]}>
            <Text style={theme.titleWhite}>Recevied Messages</Text>
            <FlatList
              //ListHeaderComponent={}
              //ItemSeparatorComponent={}
              data={listMessagesReciped}
              onRefresh={() => MessagesReciped()}
              refreshing={loading}
              keyExtractor={item => item.id}
              renderItem={RenderItem2}
              numColumns={1}
            />
          </View>
        </Modalize>

        <Modalize
          ref={modalC}
          onOpen={() => setModalCOpen(true)}
          onClose={() => setModalCOpen(false)}
          modalStyle={theme.modal2}>
          <View style={[theme.container, theme.conintanerblack]}>
            <Text style={theme.titleWhite}>New Message</Text>
            <Text style={[theme.labelWhite, { textAlign: "center" }]}>Fields Have Max 255 characteres</Text>
            <Text style={theme.labelWhite}>Subject</Text>
            <TextInput
              keyboardType='ascii-capable'
              autoCapitalize='none'
              value={newMessage.subject}
              onChangeText={(value) => setNewMessage({ ...newMessage, subject: value })}
              style={theme.inputModal}
              placeholder="Subject" />
            <Text style={theme.labelWhite}>Message</Text>
            <TextInput
              keyboardType='ascii-capable'
              autoCapitalize='none'
              value={newMessage.message}
              onChangeText={(value) => setNewMessage({ ...newMessage, message: value })}
              style={theme.inputModal}
              placeholder="Message" />
            <Picker
              mode='dropdown'
              selectedValue={newMessage.recipentName}
              onValueChange={(value, label) => setNewMessage({ ...newMessage, recipentId: value, recipentName: label })}
              dropdownIconColor={"#91D8DF"}>
              <Picker.Item label="Select a Value" enabled={false} style={theme.labelWhite} color={'#91D8DF'} />
              {
                listUsers.map((item) => {
                  return <Picker.Item
                    key={item.id}
                    value={item.id}
                    label={item.name}
                    style={theme.labelWhite}
                    color={"#59A805"}
                  />
                })
              }
            </Picker>
            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
              <CustomButton label="SEND" width="48%" backgroundColor={'#58ABF6'} onPress={() => sendMessage()} />
              <CustomButton label="CANCEL" width="48%" backgroundColor={'#FFA756'} onPress={() => onOpenModalC()} />
            </View>

          </View>
        </Modalize>
      </View>
    </>
  )
}

export default ViewMessages;