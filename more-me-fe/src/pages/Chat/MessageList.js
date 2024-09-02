import { LinearProgress } from "@mui/material";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { getConversationMessages } from "src/api";

import { MessageList } from "react-chat-elements"
import { MessageListWrapper } from "./App.styles";

const getMessages = async (id) => await getConversationMessages(id);

export default function MessageListComponent({conversation}) {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const { data, isLoading, error } = useQuery(
    ["conversations", conversation?.id],
    () => getMessages(conversation?.id),
    { refetchInterval: 2000, }
  );

  const scrollToBottom = () => {
    const mlistElement = document.querySelector('.my-chat .rce-mlist');
    if (typeof mlistElement !== 'undefined') {
      mlistElement.style.height = '85vh';
      mlistElement.scrollTop = mlistElement.scrollHeight;
    }
  };

  useEffect(() => {
    setTimeout(() => {
      !isLoading && scrollToBottom()
    }, 500);
  }, [data, isLoading]);

  if (isLoading) return <LinearProgress />;
  if (error) return <div>Something went wrong</div>;


  const chatList = data?.data?.map((msg) => {
    const sender = msg.senderId === currentUser.user.id

    return {
      position: sender ? "right" : "left",
      type: "text",
      title: sender? 'You' : conversation?.title,
      text: msg?.messageText,
    }
  })

  return (
    <MessageListWrapper>
      <MessageList
        className="my-chat"
        toBottomHeight="100%"
        lockable={false}
        dataSource={chatList ||[]}
      />
    </MessageListWrapper>
  );
}
