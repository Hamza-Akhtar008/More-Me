import { LinearProgress } from "@mui/material";
import { useRef, useState } from "react";
import { useQuery } from "react-query";
import { getConversationMessages, postMessage } from "src/api";

import { Input, MessageBox } from "react-chat-elements";
import { MessageInputWrapper } from "./App.styles";


export default function MessageInputComponent({conversation}) {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const [inputValue, setInputValue] = useState('');
  const sender = conversation?.user1Id === currentUser.user.id ? conversation?.user1Id : conversation?.user2Id
  const input = useRef(undefined);
  let inputClear;

  const sendMessage = async (msg) => {
    const data = {
      "user1Id": conversation?.user1Id,
      "user2Id": conversation?.user2Id,
      "senderId": sender,
      "messageText": msg
    }
    postMessage(data).then(() => {
      if (inputClear) {
        inputClear();
      }
      setInputValue('');
    })
  }

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  return (
    <MessageInputWrapper>
      <Input
        ref={input}
        placeholder="Type a message..."
        multiline={false}
        type='text'
        onChange={handleInputChange}
        value={inputValue}
        clear={(clear) => (inputClear = clear)} 
        maxlength={300}
        onKeyPress={(event) => {
          if (event.key === 'Enter') {
            sendMessage(event.target.value)
          }
        }}
      />
    </MessageInputWrapper>
  );
}
