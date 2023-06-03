import React, {useRef} from "react";
import ListUser from "./ListUser";
import CreateRoom from "./CreateRoom";
import ChatBox from "./ChatBox";
import "./ChatMain.css"

const ChatMain = () => {
  const scrollRef = useRef(null);
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
