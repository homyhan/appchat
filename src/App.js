import './App.css';
import ChatMain from './features/Chat/ChatMain';
import Singin from './features/Auth/Singin';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import RouteComponent from './HOCs/RouteComponent';
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {relogin} from "./features/Chat/thunk";
import {getWebsocket, setWebsocket} from "./utils/websocket";

function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        // Tạo kết nối WebSocket khi component được mount
        const socket = new WebSocket("ws://140.238.54.136:8080/chat/chat");
        const user = JSON.parse(sessionStorage.getItem("USERNAME"));
        const code = JSON.parse(sessionStorage.getItem("CODE"));

        if (user && code) {
            socket.onopen = () => {
                // Gửi yêu cầu RE_LOGIN khi kết nối WebSocket thành công
                const requestData = {
                    action: "onchat",
                    data: {
                        event: "RE_LOGIN",
                        data: {
                            user,
                            code,
                        },
                    },
                };
                socket.send(JSON.stringify(requestData));
            };

            // Xử lý các sự kiện khi nhận được thông điệp từ server
            socket.onmessage = (event) => {
                const res = JSON.parse(event.data);
                // Xử lý thông điệp từ server ở đây
                console.log(res);
                if (res.status === "success") {
                    sessionStorage.setItem(
                        "CODE",
                        JSON.stringify(res?.data?.RE_LOGIN_CODE)
                    );
                    setWebsocket(socket);
                    dispatch({
                        type: "LOGIN",
                        payload: {
                            code: res?.data?.RE_LOGIN_CODE,
                            username: user,
                        },
                    });
                }
            };

            // Đóng kết nối WebSocket khi component bị unmount
            return () => {
                socket.close();
            };
        }

    }, []);

    useEffect(() => {
        const socket = new WebSocket("ws://140.238.54.136:8080/chat/chat");
        const userLocal = JSON.parse(localStorage.getItem("USERNAME"));
        const pass = atob(JSON.parse(localStorage.getItem("PASS")));

        const user = JSON.parse(sessionStorage.getItem("USERNAME"));
        const code = JSON.parse(sessionStorage.getItem("CODE"));

        if (!user && !code) {
            if (userLocal && pass) {
                console.log(userLocal, pass)
                socket.onopen = () => {
                    // Gửi yêu cầu RE_LOGIN khi kết nối WebSocket thành công
                    const requestData = {
                        action: "onchat",
                        data: {
                            event: "LOGIN",
                            data: {
                                user: userLocal,
                                pass,
                            },
                        },
                    };
                    socket.send(JSON.stringify(requestData));
                };

                // Xử lý các sự kiện khi nhận được thông điệp từ server
                socket.onmessage = (event) => {
                    const res = JSON.parse(event.data);
                    // Xử lý thông điệp từ server ở đây
                    console.log(res);
                    if (res.status === "success") {
                        sessionStorage.setItem(
                            "CODE",
                            JSON.stringify(res?.data?.RE_LOGIN_CODE)
                        );
                        sessionStorage.setItem("USERNAME", JSON.stringify(userLocal))
                        setWebsocket(socket);
                        dispatch({
                            type: "LOGIN",
                            payload: {
                                code: res?.data?.RE_LOGIN_CODE,
                                username: userLocal,
                            },
                        });
                    }
                };

                // Đóng kết nối WebSocket khi component bị unmount
                return () => {
                    socket.close();
                };
            }
        }


    }, [])


    return (

        <BrowserRouter>
            <Routes>
                <Route
                    path="/"
                    element={<RouteComponent isAuth={true} Component={Singin} redirectPath="/chat"/>}
                ></Route>
                <Route
                    path="/chat"
                    element={
                        <RouteComponent
                            isLogin={true}
                            Component={ChatMain}
                            redirectPath="/"
                        />
                    }
                ></Route>
                <Route
                    path="/chat/:id"
                    element={
                        <RouteComponent
                            Component={ChatMain}
                            isLogin={true}
                            redirectPath="/"
                        />
                    }
                ></Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
