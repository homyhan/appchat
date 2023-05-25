import React from "react";
import ListUser from "./ListUser";
import CreateRoom from "./CreateRoom";
import ChatBox from "./ChatBox";
import "./ChatMain.css"

const ChatMain = () => {
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
            {/* <section className="discussions">
              <div className="discussion search">
                <div className="searchbar">
                  <i className="fa fa-search" aria-hidden="true" />
                  <input type="text" placeholder="Search..." />
                </div>
              </div>
              <div className="discussion message-active">
                <div
                  className="photo"
                  style={{
                    backgroundImage:
                      "url(https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80)",
                  }}
                >
                  <div className="online" />
                </div>
                <div className="desc-contact">
                  <p className="name">Nguyễn Đình Lưu</p>
                  <p className="message">9 pm at the bar if possible 😳</p>
                </div>
                <div className="timer">12 sec</div>
              </div>
              <div className="discussion">
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
                  <p className="name">Dave Corlew</p>
                  <p className="message">
                    Let's meet for a coffee or something today ?
                  </p>
                </div>
                <div className="timer">3 min</div>
              </div>
              <div className="discussion">
                <div
                  className="photo"
                  style={{
                    backgroundImage:
                      "url(https://images.unsplash.com/photo-1497551060073-4c5ab6435f12?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=667&q=80)",
                  }}
                ></div>
                <div className="desc-contact">
                  <p className="name">Jerome Seiber</p>
                  <p className="message">I've sent you the annual report</p>
                </div>
                <div className="timer">42 min</div>
              </div>
              <div className="discussion">
                <div
                  className="photo"
                  style={{
                    backgroundImage:
                      "url(http://thomasdaubenton.xyz/portfolio/images/photo.jpg)",
                  }}
                >
                  <div className="online" />
                </div>
                <div className="desc-contact">
                  <p className="name">Thomas Dbtn</p>
                  <p className="message">See you tomorrow ! 🙂</p>
                </div>
                <div className="timer">2 hour</div>
              </div>
              <div className="discussion">
                <div
                  className="photo"
                  style={{
                    backgroundImage:
                      "url(https://images.unsplash.com/photo-1553514029-1318c9127859?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=80)",
                  }}
                ></div>
                <div className="desc-contact">
                  <p className="name">Elsie Amador</p>
                  <p className="message">What the f**k is going on ?</p>
                </div>
                <div className="timer">1 day</div>
              </div>
              <div className="discussion">
                <div
                  className="photo"
                  style={{
                    backgroundImage:
                      "url(https://images.unsplash.com/photo-1541747157478-3222166cf342?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=967&q=80)",
                  }}
                ></div>
                <div className="desc-contact">
                  <p className="name">Billy Southard</p>
                  <p className="message">Ahahah 😂</p>
                </div>
                <div className="timer">4 days</div>
              </div>
              <div className="discussion">
                <div
                  className="photo"
                  style={{
                    backgroundImage:
                      "url(https://images.unsplash.com/photo-1435348773030-a1d74f568bc2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1050&q=80)",
                  }}
                >
                  <div className="online" />
                </div>
                <div className="desc-contact">
                  <p className="name">Paul Walker</p>
                  <p className="message">You can't see me</p>
                </div>
                <div className="timer">1 week</div>
              </div>
            </section> */}

            <ListUser></ListUser>

            {/* <section className="chat">
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
                  <p className="text">
                    {" "}
                    What are you doing tonight ? Want to go take a drink ?
                  </p>
                </div>
                <p className="time"> 14h58</p>
                <div className="message text-only">
                  <div className="response">
                    <p className="text"> Hey Megan ! It's been a while 😃</p>
                  </div>
                </div>
                <div className="message text-only">
                  <div className="response">
                    <p className="text"> When can we meet ?</p>
                  </div>
                </div>
                <p className="response-time time"> 15h04</p>
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
                  <p className="text"> 9 pm at the bar if possible 😳</p>
                </div>
                <p className="time"> 15h09</p>
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
            </section> */}

            <ChatBox></ChatBox>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatMain;
