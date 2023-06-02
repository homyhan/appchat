import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMesPeople, fetchMesRoom } from "./thunk";
import "./ChatMain.css";
import CreateRoom from "./CreateRoom";
import { FindPerson } from "./FindPerson";

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
  };



  return (


      <section style={{paddingRight:'0px', paddingLeft: '0px'}} className="discussions">
        <div style={{display:'flex'}} className="discussion search">
          <CreateRoom></CreateRoom>
          <FindPerson></FindPerson>
        </div>
        <div id="style-11" className="listUserChat">
          {listUser?.map((item, index) => {
            return (
                <div key={index} style={item.name === user.username || item.name===""?{display: 'none'}:{}} className="discussion" onClick={() => handleChat(item.name, item.type)}>
                  <div
                      className="photo"
                      style={item.type===0? {
                        backgroundImage:
                            "url(https://img.freepik.com/premium-vector/portrait-brunette-woman-avatar-female-person-vector-icon-adult-flat-style_605517-159.jpg?w=2000)",
                      }: {
                        backgroundImage:
                            "url(https://img.freepik.com/premium-vector/businesspeople-character-avatar-icon_24877-18272.jpg)",
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
