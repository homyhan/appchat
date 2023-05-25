import React from "react";
import "./ChatMain.css";

const ChatBox = () => {
  return (
    <section style={{ padding: "0px" }} className="chat">
      <div className="header-chat">
        <i className="icon fa fa-user-o" aria-hidden="true" />
        <p className="name">Nguyễn Đình Lưu</p>
        <i
          className="icon clickable fa fa-ellipsis-h right"
          aria-hidden="true"
        />
      </div>
      <div className="messages-chat">
        <div className="message">
          <div
            className="photo"
            style={{
              backgroundImage:
                "url(https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80)",
            }}
          >
            <div className="online" />
          </div>
          <p className="text"> Hi, how are you ? </p>
        </div>
                        
        <div className="message text-only">
          <div className="response">
            <p className="text"> Hey Megan ! It's been a while 😃</p>
          </div>
        </div>
        <div className="message text-only">
          <div className="response">
            <p className="text"> Hey Megan ! It's been a while 😃</p>
          </div>
        </div>
        <div className="message text-only">
          <div className="response">
            <p className="text"> Hey Megan ! It's been a while 😃</p>
          </div>
        </div>
        <div className="message text-only">
          <div className="response">
            <p className="text"> Hey Megan ! It's been a while 😃</p>
          </div>
        </div>
        <div className="message text-only">
          <div className="response">
            <p className="text"> Hey Megan ! It's been a while 😃</p>
          </div>
        </div>
        <div className="message text-only">
          <div className="response">
            <p className="text"> Hey Megan ! It's been a while 😃</p>
          </div>
        </div>
        <div className="message text-only">
          <div className="response">
            <p className="text"> Hey Megan ! It's been a while 😃</p>
          </div>
        </div>
        <div className="message text-only">
          <div className="response">
            <p className="text"> Hey Megan ! It's been a while 😃</p>
          </div>
        </div>
        <div className="message text-only">
          <div className="response">
            <p className="text"> Hey Megan ! It's been a while 😃</p>
          </div>
        </div>
        <div className="message text-only">
          <div className="response">
            <p className="text"> Hey Megan ! It's been a while 😃</p>
          </div>
        </div>
        <div className="message text-only">
          <div className="response">
            <p className="text"> Hey Megan ! It's been a while 😃</p>
          </div>
        </div>
        <div className="message text-only">
          <div className="response">
            <p className="text"> Hey Megan ! It's been a while 😃</p>
          </div>
        </div>
        <div className="message text-only">
          <div className="response">
            <p className="text"> Hey Megan ! It's been a while 😃</p>
          </div>
        </div>
        <div className="message text-only">
          <div className="response">
            <p className="text"> Hey Megan ! It's been a while 😃</p>
          </div>
        </div>
        <div className="message text-only">
          <div className="response">
            <p className="text"> Hey Megan ! It's been a while 😃</p>
          </div>
        </div>
        <div className="message text-only">
          <div className="response">
            <p className="text"> Hey Megan ! It's been a while 😃</p>
          </div>
        </div>
        <div className="message text-only">
          <div className="response">
            <p className="text"> Hey Megan ! It's been a while 😃</p>
          </div>
        </div>
        <div className="message text-only">
          <div className="response">
            <p className="text"> Hey Megan ! It's been a while 😃</p>
          </div>
        </div>
        <div className="message text-only">
          <div className="response">
            <p className="text"> Hey Megan ! It's been a while 😃</p>
          </div>
        </div>
        <div className="message text-only">
          <div className="response">
            <p className="text"> Hey Megan ! It's been a while 😃</p>
          </div>
        </div>
        <div className="message text-only">
          <div className="response">
            <p className="text"> Hey Megan ! It's been a while 😃</p>
          </div>
        </div>
                       
      </div>
      <div className="footer-chat">
        <i
          className="icon fa fa-smile-o clickable"
          style={{ fontSize: "25pt" }}
          aria-hidden="true"
        />
        <input
          type="text"
          className="write-message"
          placeholder="Type your message here"
        />
        <i
          className="icon send fa fa-paper-plane-o clickable"
          aria-hidden="true"
        />
      </div>
    </section>
  );
};

export default ChatBox;
