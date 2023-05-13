import React, { useState } from "react";
import "./Signin.css";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Singin = () => {
    const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
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
      action: 'onchat',
      data: {
        event: 'REGISTER',
        data: {
          user: username,
          pass: password
        }
      }
    };

    

    // Gửi yêu cầu sử dụng WebSocket
    const socket = new WebSocket('ws://140.238.54.136:8080/chat/chat');
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
      action: 'onchat',
      data: {
        event: 'LOGIN',
        data: {
          user: username,
          pass: password
        }
      }
    };

    // Gửi yêu cầu sử dụng WebSocket
    const socket = new WebSocket('ws://140.238.54.136:8080/chat/chat');
    socket.onopen = () => {
      socket.send(JSON.stringify(requestData));
    };

    // Xử lý phản hồi từ API
    socket.onmessage = (event) => {
      const response = JSON.parse(event.data);      
    if(response.status==="success"){
      localStorage.setItem("DATA_RELOGIN", JSON.stringify(response.data));        
      localStorage.setItem("USERNAME", JSON.stringify(username));        
      dispatch({
        type:"LOGIN",
        payload: {
          code: response.data,
          username
        }
      })
      return navigate("/chat");
      
    }else{
        console.log("login error");
    }

    // if (response.event === 'AUTH' && response.status === 'error') {
    //   console.log('Đăng nhập không thành công: ' + response.mes);
    //   // Hiển thị thông báo lỗi cho người dùng
    //   alert('Đăng nhập không thành công: ' + response.mes);
    // } else if (response.success) {
    //   console.log('Đăng nhập thành công');
    //   // Thực hiện các hành động sau khi đăng nhập thành công
    // } else {
    //   console.log('Đăng nhập không thành công');
    // }

      socket.close();
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
          <input type="text" value={username} onChange={handleUsernameChange}  required />
          
          <input type="password" value={password} onChange={handlePasswordChange} />
          <button type="submit">Sign up</button>
        </form>
      </div>
      <div className="login">
        <form onSubmit={handleSubmitLogin}>
          <label htmlFor="chk" aria-hidden="true">
            Login
          </label>
          <input type="text" value={username} onChange={handleUsernameChange} required />
          <input type="password" value={password} onChange={handlePasswordChange} required />
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Singin;
