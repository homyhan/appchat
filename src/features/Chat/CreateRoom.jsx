import React, { useState } from 'react'

const CreateRoom = () => {
    const [roomName, setRoomName] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    // Gửi yêu cầu tạo phòng đến API
    const requestData = {
      action: 'onchat',
      data: {
        event: 'CREATE_ROOM',
        data: {
          name: roomName
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
      
      socket.close();
    };
  };

  const handleChange = (event) => {
    setRoomName(event.target.value);
  };
  return (
    <div>
         <form onSubmit={handleSubmit}>
        <label>
          Tên phòng:
          
        </label>
        <input type="text" value={roomName} onChange={handleChange} />
        <button type="submit">Tạo phòng</button>
      </form>
    </div>
  )
}

export default CreateRoom