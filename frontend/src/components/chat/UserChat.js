import React from "react";
import ChatApp from "./ChatApp";
import { useParams } from "react-router-dom";

export default function UserChat() {
  const { id, name } = useParams(); //recipientId(in case of one - one) and group id(in case of group chat)
  console.log({ id, name });
  const avatar =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVt2535sPRTpg3PdokHPOs8oPQeYCuL4RFsHvZ018&s";
  return (
    <div>
      <ChatApp name={name} id={id} type="user" avatar={avatar} />
    </div>
  );
}
