import React from "react";
import { useParams } from "react-router-dom";
import ChatApp from "./ChatApp";

export default function GroupChat() {
  const { id, name } = useParams();
  console.log({ id, name });
  const avatar =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIYjGdFwB-xbQXA5UYIvqet63iFSVR7T71w9bebOI&s";
  return (
    <div>
      <ChatApp name={name} id={id} type="group" avatar={avatar} />
    </div>
  );
}
