import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./ChatMain.css";
import CreateRoom from "./CreateRoom";
import { FindPerson } from "./FindPerson";
import { fetchMesPeople, fetchMesRoom } from "./thunk";

const ListUser = () => {
  const dispatch = useDispatch();
  const { listUser } = useSelector((state) => state.chat);
  const { socket, user } = useSelector((state) => state.auth);
  const handleChat = async (username, type) => {
    console.log(username === "");
    await dispatch({
      type: "TO_USER1",
      payload: {
        nameChatUser: username,
        isRoom: type,
      },
    });
    if (type === 1) {
      await dispatch(fetchMesRoom(socket, username));
    } else {
      await dispatch(fetchMesPeople(socket, username));
    }

    console.log(username, type);
  };

  return (
    <section style={{ paddingRight: "0px" }} className="discussions">
      <div style={{ display: "flex" }} className="discussion search">
        <CreateRoom></CreateRoom>
        <FindPerson></FindPerson>
      </div>
      <div className="listUserChat">
        {listUser?.map((item, index) => {
          return (
            <div
              key={index}
              style={
                item.name === user.username || item.name === ""
                  ? { display: "none" }
                  : {}
              }
              className="discussion"
              onClick={() => handleChat(item.name, item.type)}
            >
              <div
                className="photo"
                style={{
                  backgroundImage:
                    "url(http://e0.365dm.com/16/08/16-9/20/theirry-henry-sky-sports-pundit_3766131.jpg?20161212144602)",
                }}
              >
                <div className="online" />
              </div>
              <div className="desc-contact">
                <p className="name">{item.name}</p>
                <p className="message">
                  Let's meet for a coffee or something today ?
                </p>
              </div>
              <div className="timer">3 min</div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default ListUser;
