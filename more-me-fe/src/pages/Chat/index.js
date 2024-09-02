import { AddShoppingCart } from "@mui/icons-material";
import { Badge, Drawer, Grid, LinearProgres, LinearProgress, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { ProductCartWidget } from "src/sections/@dashboard/products";
import { ChatDivContainer, Container, LeftContainer, RightContainer, StyledButton, Wrapper } from "./App.styles";
import { getConversationMessages, getSellingItems } from "src/api";

import { MessageBox } from "react-chat-elements";

import "react-chat-elements/dist/main.css"
import ChatListComponent from "./ChatList";
import MessageListComponent from "./MessageList";
import MessageInputComponent from "./MessageInput";
import { useNavigate } from "react-router-dom";
import { Divider } from '@mui/material';
import Header from "src/layouts/dashboard/header";

// const getProducts = async (category = '') => await getSellingItems(category);

export default function ChatPage() {
  const [currentConversation, setCurrentConversation] = useState(0);
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  useEffect(() => {
  }, [currentConversation])

  if (!currentUser)
    return navigate("/login")

  return (
    <>
      {/* <Header onOpenNav={() => setOpen(true)} /> */}
      <Wrapper>
        <Container>
          <LeftContainer>
            <ChatDivContainer>
              <ChatListComponent setCurrentConversation={setCurrentConversation} />
            </ChatDivContainer>
          </LeftContainer>

          <RightContainer>
            {currentConversation ? 
            <>
              <MessageListComponent conversation={currentConversation} />
              <Divider />
              <MessageInputComponent conversation={currentConversation} />
            </> : 
            <img width='80%' height='90%' src="/assets/images/messaging-bg.svg" style={{ objectFit: 'cover' }} />
            }
          </RightContainer>
        </Container>
      </Wrapper>
    </>
  );
}
