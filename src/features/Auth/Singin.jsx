import React, {useEffect, useRef, useState} from "react";
import "./Signin.css";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {fetchListUser} from "../Chat/thunk";
import Swal from 'sweetalert2'
import {setWebsocket} from "../../utils/websocket";

const Singin = () => {
    const [isLogged, setIsLogged] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if(username==="" ||username.split(" ").join("")==="" || password==="" ||password.split(" ").join("")===""){
            return Swal.fire({
                text: "Please do not use the spacebar",
                icon: 'warning',

            })
        }

        // Gửi yêu cầu đăng ký đến API
        const requestData = {
            action: "onchat",
            data: {
                event: "REGISTER",
                data: {
                    user: username,
                    pass: password,
                },
            },
        };

        // Gửi yêu cầu sử dụng WebSocket
        const socket = new WebSocket("ws://140.238.54.136:8080/chat/chat");
        socket.onopen = () => {
            socket.send(JSON.stringify(requestData));
        };

        // Xử lý phản hồi từ API
        socket.onmessage = (event) => {
            const response = JSON.parse(event.data);
            console.log(response)
            if(response.status==="success"){
                Swal.fire({
                    position: 'top-end',
                    icon: response.status,
                    title: response.mes,
                    showConfirmButton: false,
                    timer: 1500
                })
            }else{
                Swal.fire({
                    icon: 'error',
                    title: response.status,
                    text: response.mes,

                })
            }
            socket.close();
        };
    };

    const handleSubmitLogin = (event) => {
        event.preventDefault();

        // Gửi yêu cầu đăng nhập đến API
        const requestData = {
            action: "onchat",
            data: {
                event: "LOGIN",
                data: {
                    user: username,
                    pass: password,
                },
            },
        };

        // Gửi yêu cầu sử dụng WebSocket
        const socket = new WebSocket("ws://140.238.54.136:8080/chat/chat");

        socket.onopen = () => {
            socket.send(JSON.stringify(requestData));
        };

        // Xử lý phản hồi từ API
        socket.onmessage = async (event) => {
            const response = JSON.parse(event.data);
            setWebsocket(socket);
            console.log(response);
            if (response.status === "success") {
                setWebsocket(socket)
                localStorage.setItem("DATA_RELOGIN", JSON.stringify(response.data));
                localStorage.setItem("USERNAME", JSON.stringify(username));
                localStorage.setItem("PASS", JSON.stringify(btoa(password)));

                sessionStorage.setItem("USERNAME", JSON.stringify(username));
                sessionStorage.setItem("CODE", JSON.stringify(response?.data?.RE_LOGIN_CODE));
                localStorage.setItem('loggedInUser', JSON.stringify({ user: username, pass: '12345' }));

                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: response.status,
                    showConfirmButton: false,
                    timer: 1500
                })
                await dispatch({
                    type: "LOGIN",
                    payload: {
                        code: response.data,
                        username,

                    },
                });

                // Kiểm tra nếu chưa gọi yêu cầu "GET_USER_LIST" sau khi đăng nhập thành công
                // if (!isLogged) {
                //     setIsLogged(true);
                //     await dispatch(fetchListUser(socket));
                //
                // }

                return navigate("/chat");
            } else {
                Swal.fire({
                    icon: 'error',
                    title: response.status,
                    text: response.mes,

                })
                console.log("login error");
            }

            // socket.close();
        };
        return () => {
            socket.close(); // Đóng kết nối khi component bị hủy
        };
    };

    return (
        <div className="main">
            <input type="checkbox" id="chk" aria-hidden="true"/>
            <div className="signup">
                <form onSubmit={handleSubmit}>
                    <label htmlFor="chk" aria-hidden="true">
                        Sign up
                    </label>
                    <input
                        type="text"
                        value={username}
                        onChange={handleUsernameChange}
                        required
                    />

                    <input
                        type="password"
                        value={password}
                        onChange={handlePasswordChange}
                    />
                    <button type="submit">Sign up</button>
                </form>
            </div>
            <div className="login">
                <form onSubmit={handleSubmitLogin}>
                    <label htmlFor="chk" aria-hidden="true">
                        Login
                    </label>
                    <input
                        type="text"
                        value={username}
                        onChange={handleUsernameChange}
                        required
                    />
                    <input
                        type="password"
                        value={password}
                        onChange={handlePasswordChange}
                        required
                    />
                    <button type="submit">Login</button>
                </form>
            </div>
        </div>
    );
};

export default Singin;
