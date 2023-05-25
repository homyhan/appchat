import React, { useEffect, useState } from "react";
import "./Signin.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchListUser } from "../Chat/thunk";

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
      console.log(response); // Do something with the response
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

      console.log(response);
      if (response.status === "success") {
        localStorage.setItem("DATA_RELOGIN", JSON.stringify(response.data));
        localStorage.setItem("USERNAME", JSON.stringify(username));
        console.log("socket khi dn thanh cong", socket);

       await dispatch({
          type: "LOGIN",
          payload: {
            code: response.data,
            username,
            socketObj: socket
          },
        });
        
        // Kiểm tra nếu chưa gọi yêu cầu "GET_USER_LIST" sau khi đăng nhập thành công
        if (!isLogged) {
          setIsLogged(true);
          await dispatch(fetchListUser(socket));
          
        }    

        return navigate("/chat");
      } else {
        console.log("login error");
      }     

      // socket.close();
    };
  };
 

  return (
    <div className="main">
      <input type="checkbox" id="chk" aria-hidden="true" />
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
