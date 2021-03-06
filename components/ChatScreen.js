import styled from "styled-components";
import {useAuthState} from "react-firebase-hooks/auth"
import {auth, db} from "../firebase";
import { useRouter } from "next/router";
import { Avatar , IconButton} from "@material-ui/core";
import MoreVertIcon from '@material-ui/icons/MoreVert';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import SendIcon from '@material-ui/icons/Send';
import MicIcon from '@material-ui/icons/Mic';
import { useCollection } from "react-firebase-hooks/firestore";
import Message from "./Message"
import { useRef, useState } from "react";
import firebase from "firebase";
import getRecipientEmail from "../utils/getRecipientEmail";
import TimeAgo from "timeago-react";

function ChatScreen( { chat, messages }) {
  const [user] = useAuthState(auth);
  const endOfMessagesRef = useRef(null);
  const [input , setInput] = useState("")
  const router = useRouter();
  const [messagesSnapshot] = useCollection(
    db
    .collection("chats")
    .doc(router.query.id)
    .collection('message')
    .orderBy('timestamp','asc')
  );

const [recipientSnapshot] = useCollection(
  db.collection("users").where("email", "==", getRecipientEmail(chat.users, user))
);

  const showMessages = () => {
    if(messagesSnapshot) {
      return messagesSnapshot.docs.map(message => (
        <Message
         key={message.id}
         user={message.data().user}
         message = {{
           ...message.data(),
           timestamp: message.data().timestamp?.toDate().getTime(),
         }}
        />
      ));
    } else {
      return JSON.parse(messages).map(message => (
        <Message  key={message.id} user={message.user} message={message} />
      ));
    }
  };

  const scrollToBottom = () => {
    endOfMessagesRef.current.scrollIntoView({
      behaviour: "smooth",
      block:"start",
    });
  }

  const sendMessage = (e) => {
     e.preventDefault();

    db.collection("users").doc(user.uid).set(
      {
      lastSeen : firebase.firestore.FieldValue.serverTimestamp(),

    },
     { merge:true }
   );

    db.collection('chats').doc(router.query.id).collection('message').add({
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      message : input,
      user: user.email,
      photoURL: user.photoURL,
    });
    setInput("");
    scrollToBottom();
  };

    const recipient = recipientSnapshot?.docs?.[0]?.data();
  const recipientEmail = getRecipientEmail(chat.users, user);
  const recipientName = recipientEmail.substr(0, recipientEmail.length-10);


  return(
    <Container>
     <Header>
     {recipient ? (
       <Avatar src = {recipient?.photoURL} />
     ): (
       <Avatar>{recipientEmail[0]}</Avatar>
     )}


        <HeaderInformation>
        <h3>
        {recipientName}
        </h3>
        {recipientSnapshot ? (
          <p>Last active :{' '}
          {recipient?.lastSeen?.toDate() ? (
          <TimeAgo datetime = {recipient?.lastSeen?.toDate()} />
        ) :(
          "Unavailable"
      )}
        </p>
      ) :(
        <p>Loading last active</p>
      ) }

        </HeaderInformation>
        <HeaderIcons>
        <IconButton>
        <PowerSettingsNewIcon onClick={() => auth.signOut()} />
        </IconButton>

        </HeaderIcons>
       </Header>
       <MessageContainer>
       {showMessages()}
       <EndOfMessage ref ={endOfMessagesRef} />
       </MessageContainer>
       <InputContainer>
       <InsertEmoticonIcon />
         <Input value={input} onChange={e => setInput(e.target.value)} />
         <Button disabled={!input} type="submit" onClick={sendMessage}> <SendIcon /></Button>
         <MicIcon />
       </InputContainer>
    </Container>

  )
}

export default ChatScreen;

const Container = styled.div``;

const Header = styled.div`
position:sticky;
background-color:white;
z-index:100;
top:0;
display:flex;
padding:11px;
height:80px;
align-items: center;
border-bottom: 1px solid whitesmoke;
`;

const HeaderInformation = styled.div`
margin-left:15px;
margin-bottom:20px;
flex:1;

> h3{
  margin-bottom:0px;
}
> p {
  font-size:11px;
  color:gray;
  margin:0;
}
`;

const HeaderIcons = styled.div``;

const Input = styled.input`
flex:1;
outline:0;
border:none;
border-radius:10px;
padding:20px;
bottom:0;
background-color:whitesmoke;
margin-left:15px;
margin-right:15px;

`;

const InputContainer = styled.form`
display:flex;
align-items:center;
padding:10px;
position:sticky;
bottom:0;
background-color:white;
z-index:100;
`;

const EndOfMessage = styled.div`
margin-bottom:50px;
`;

const MessageContainer = styled.div`
padding:30px;
background-color:#e5ded8;
min-height:90vh;
`;

const Button = styled.button`
border:none;

`;
