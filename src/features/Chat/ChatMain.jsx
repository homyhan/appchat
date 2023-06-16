import React, {useRef} from "react";
import ListUser from "./ListUser";
import ChatBox from "./ChatBox";
import "./ChatMain.css"
import {useDispatch, useSelector} from "react-redux";
import Swal from 'sweetalert2'
import {getWebSocket} from "../../utils/websocket";

const ChatMain = () => {
  const dispatch = useDispatch();
  const scrollRef = useRef(null);

  const handleLogout= ()=>{
    Swal.fire({
      title: 'Do you want to logout?',
      showCancelButton: true,
      confirmButtonText: 'Yes',

    }).then( async(result) => {
      const socket = getWebSocket();
      if (result.isConfirmed) {

        const logout = {
          action: "onchat",
          data: {
            event: "LOGOUT"
          }
        }
        socket.send(JSON.stringify(logout));
        socket.onmessage = (evt)=>{
          const res = JSON.parse(evt.data);
          console.log(res);
          if(res.status==='success'){
            sessionStorage.removeItem("USERNAME");
            sessionStorage.removeItem("CODE");
          }
          dispatch({
            type: "LOGOUT"
          })

        }

      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info')
      }
    })
  }
  return (
    <>      
      <div className="guiChat">
        <div className="container-fluid">
          <div className="row">
            <nav className="menu">
              <ul className="items">
                <li className="item">
                  <i className="fa fa-home" aria-hidden="true" />+
                </li>
                <li className="item">
                  <i className="fa fa-user" aria-hidden="true" />
                </li>
                <li className="item">
                  <i className="fa fa-pencil" aria-hidden="true" />
                </li>
                <li className="item item-active">
                  <i className="fa fa-commenting" aria-hidden="true" />
                </li>
                <li className="item">
                  <i className="fa fa-file" aria-hidden="true" />
                </li>
                <li className="item">
                  <i className="fa fa-cog" aria-hidden="true" />
                </li>
                <li onClick={handleLogout} className="item">
                  <i className="fa-solid fa-right-from-bracket"></i>
                </li>
              </ul>
            </nav>


            <ListUser scrollRef={scrollRef}></ListUser>


            <ChatBox scrollRef={scrollRef}></ChatBox>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatMain;
