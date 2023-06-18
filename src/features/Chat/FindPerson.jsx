import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {fetchListUser, fetchMesPeople, fetchMesRoom, joinRoom} from "./thunk";
import Swal from 'sweetalert2'
import {getWebSocket} from "../../utils/websocket";

export const FindPerson = () => {
  const [isChecked, setIsChecked] = useState(false);
  const [isRoom, setIsRoom] = useState(0);
  const [userOrther, setUserOrther] = useState("");
  // const { socket } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const handleSubmit = (event) => {
    event.preventDefault();
    const socket = getWebSocket();
    if(userOrther==="" ||userOrther.split(" ").join("")===""){
      return Swal.fire({
        text: "Content cannot be left blank",
        icon: 'warning',

      })
    }
   
    const findPerson = {
      action: "onchat",
      data: {
        event: "CHECK_USER",
        data: {
          user: userOrther,
        },
      },
    };

    // Gửi yêu cầu sử dụng WebSocket
    // const socket = socket;
    socket.send(JSON.stringify(findPerson));

    // Xử lý phản hồi từ API
    socket.onmessage = async (event) => {
      const response = JSON.parse(event.data);
      if (response.status === "success") {

        await dispatch({
          type: "TO_USER1",
          payload: {
            nameChatUser: userOrther,
            isRoom: isRoom,
          },
        });

        if (isRoom === 0) {
          await dispatch(fetchMesPeople(socket, userOrther));
          setUserOrther("");
        } else {
          await  dispatch({
            type: "JOIN_NEW_GR"
          })
          await dispatch(fetchMesRoom(socket, userOrther));
          Swal.fire(
              'Join group?',
              '',
              'question'
          ).then(async (rs)=>{
            if(rs.isConfirmed){
              await dispatch(fetchMesRoom(socket, userOrther));
              await dispatch(joinRoom(socket, userOrther));
              await dispatch(fetchListUser(socket));
              setUserOrther("");
              setIsChecked(false);

            }
          })

          
        }
      } else {
        Swal.fire({
          icon: 'error',
          title: "Error",
          text: "Please check again",

        })
        console.log("User không tồn tại");
      }
      //   socket.close();
    };
    
  };
  const handleChange = (event) => {
    setUserOrther(event.target.value);
  };

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
    if (!isChecked) {
      setIsRoom(1);

    } else {

      setIsRoom(0);

    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>        
        <div style={{justifyContent:'center', marginTop:'20px'}} className="d-flex input-group">
          <input style={{width: 'auto', margin:'0px'}} type="text" value={userOrther} onChange={handleChange} />
          <input
          style={{width: '22px', margin:'0px'}}
            type="checkbox"
            checked={isChecked}
            onChange={handleCheckboxChange}
          />
        </div>

        <button type="submit" style={{padding:'10px 18px'}}>Search</button>
      </form>
    </div>
  );
};