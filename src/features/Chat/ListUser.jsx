import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMesPeople, fetchMesRoom } from "./thunk";
import "./ChatMain.css";
import CreateRoom from "./CreateRoom";
import { FindPerson } from "./FindPerson";

const ListUser = ({ scrollRef }) => {
    const dispatch = useDispatch();
    const [activeUser, setActiveUser] = useState(null);
    const { listUser } = useSelector((state) => state.chat);
    const { socket, user } = useSelector((state) => state.auth);

    const handleScrollToBottom = () => {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    };

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
            handleScrollToBottom();
        } else {
            await dispatch(fetchMesPeople(socket, username));
            handleScrollToBottom();
        }
        setActiveUser(username);
    };

    return (
        <section
            style={{ paddingRight: "0px", paddingLeft: "0px" }}
            className="discussions"
        >
            <div style={{ display: "flex" }} className="discussion search">
                <CreateRoom></CreateRoom>
                <FindPerson></FindPerson>
                {/* <div className="searchbar">
          <i className="fa fa-search" aria-hidden="true" />
          <input type="text" placeholder="Search..." />
        </div> */}
            </div>
            <div id="style-11" className="listUserChat">
                {listUser?.map((item, index) => {
                    return (
                        <div
                            key={index}
                            style={
                                item.name === user.username || item.name === ""
                                    ? { display: "none" }
                                    : {}
                            }
                            className={`discussion ${activeUser === item.name ? "active" : ""}`}
                            onClick={() => handleChat(item.name, item.type)}
                        >
                            <div
                                className="photo"
                                style={
                                    item.type === 0
                                        ? {
                                            backgroundImage:
                                            // "url(https://png.pngtree.com/png-clipart/20220508/ourmid/pngtree-avatar-girl-social-media-cartoon-short-hair-png-image_4565201.png)",
                                                "url(https://img.freepik.com/premium-vector/portrait-brunette-woman-avatar-female-person-vector-icon-adult-flat-style_605517-159.jpg?w=2000)",
                                        }
                                        : {
                                            backgroundImage:
                                                "url(https://img.freepik.com/premium-vector/businesspeople-character-avatar-icon_24877-18272.jpg)",
                                        }
                                }
                                // style={{
                                //   backgroundImage:
                                //     "url(https://img.freepik.com/premium-vector/businesspeople-character-avatar-icon_24877-18272.jpg)",
                                // }}
                                // style={{
                                //   backgroundImage:
                                //     "url(http://e0.365dm.com/16/08/16-9/20/theirry-henry-sky-sports-pundit_3766131.jpg?20161212144602)",
                                // }}
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
