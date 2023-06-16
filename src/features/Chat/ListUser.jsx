import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {fetchListUser, fetchMesPeople, fetchMesRoom} from "./thunk";
import "./ChatMain.css";
import CreateRoom from "./CreateRoom";
import { FindPerson } from "./FindPerson";
import {getWebSocket} from "../../utils/websocket";

const ListUser = ({ scrollRef }) => {
    const dispatch = useDispatch();
    const [activeUser, setActiveUser] = useState(null);
    const { listUser, toUser, listNewUser } = useSelector((state) => state.chat);
    const { user } = useSelector((state) => state.auth);
    const [newListUser, setNewListUser] = useState([]);
    const [cloneListUser, setCloneListUser] = useState([]);

    const [isLogined, setIsLogged] = useState(false);
    const [isOnline, setIsOnline] = useState(false);


    useEffect(() => {
        if ( Array.isArray(listUser)) {

            setNewListUser([...listUser])
        }

    }, [listUser]);
    // useEffect(() => {
    //     socket.onmessage = async (evt) => {
    //         const res = JSON.parse(evt.data);
    //         console.log(res);
    //         if (!isLogined) {
    //             console.log("res trong useEff", res);
    //             // await dispatch(fetchListUser(socket));
    //             setIsLogged(true);
    //         }
    //         if (res.event === "SEND_CHAT") {
    //             console.log("res.data", res.data);
    //             setNewListUser((prevListMes) => [...prevListMes, res.data]);
    //         }
    //     };
    // }, [socket]);

    useEffect(()=>{

        const cloneNew = newListUser.reduce((acc, item) => {
            const existingItem = acc.find((elem) => elem.name === item.name);
            if (!existingItem) {
                acc.push(item);
            }
            return acc;
        }, []);


        const uniqueArrA = listNewUser.reduce((acc, item) => {
            const existingItem = acc.find((elem) => elem.name === item.name);
            if (!existingItem) {
                acc.push(item);
            }
            return acc;
        }, []);

        setNewListUser((prevArrA) => prevArrA.concat(uniqueArrA))

    }, [listNewUser, listUser])

    useEffect(() => {
        const socket = getWebSocket();

        const apiData = {
            action: 'onchat',
            data: {
                event: 'GET_USER_LIST',
            },
        };
        const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
        if(loggedInUser){
            socket.send(JSON.stringify(apiData));
        }

        socket.onmessage = (event) => {
            const res = JSON.parse(event.data);
            dispatch({
                type:"USERLIST",
                payload: res.data
            })
        };

        return () => {

        };
    }, []);

    const handleScrollToBottom = () => {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    };


    const handleChat = async (username, type) => {
        const socket = getWebSocket();
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
            </div>
            <div id="style-11" className="listUserChat">
                {newListUser?.map((item, index) => {
                    return (
                        <div
                            key={index}
                            style={
                                item.name === user.username || item.name === ""
                                    ? { display: "none" }
                                    : {}
                            }
                            className={`discussion ${activeUser === item.name || toUser?.nameUserChat === item.name ? "active" : ""}`}
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

                            >
                                {/*<div className="online" />*/}
                                {/*{checkUserOnl(item.name) === true ? <div className="online" /> : null}*/}
                                {/*{checkUserOnl(item.name)===true ? <div className="online" />: ''}*/}
                                {/*{checkUser(item.name) ? <div className="online" /> : ''}*/}
                                {/*{checkUser(item.name)}*/}
                            </div>
                            <div className="desc-contact">
                                <p className="name">{item.name}</p>
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
