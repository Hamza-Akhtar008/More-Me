import { LinearProgress } from "@mui/material";
import { useState } from "react";
import { useQuery } from "react-query";
import { getConversations } from "src/api";

import { MessageBox } from "react-chat-elements";
import { ChatList, MessageList } from "react-chat-elements"

const getChatList = async () => await getConversations();

export default function ChatListComponent({setCurrentConversation}) {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const { data, isLoading, error } = useQuery(
    ["conversation"],
    () => getChatList()
  );

  if (isLoading) return <LinearProgress />;
  if (error) return <div>Something went wrong</div>;

  const chatList = data.data.map((chat) => {
    const sender = chat.User1.id === currentUser.user.id ? chat.User2 : chat.User1

    return {
      id: chat.id,
      avatar: sender?.profilePic || 'https://avatars.githubusercontent.com/u/80540635?v=4',
      alt: `${sender?.firstName} ${sender?.lastName}`,
      title: `${sender?.firstName} ${sender?.lastName}`,
      // subtitle: "Why don't we go to the No Way Home movie this weekend ?",
      date: chat.createdAt,
      unread: 0,
      user1Id: chat.user1Id,
      user2Id: chat.user2Id
    }
  })

  return (
    <>
      <ChatList
        className='chat-list'
        dataSource={chatList || []} 
        onClick={(c) => setCurrentConversation(c)}
      />
    </>
  );
}
