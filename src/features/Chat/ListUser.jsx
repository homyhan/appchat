import React, { useEffect, useState } from 'react'

const ListUser = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
      // Gửi yêu cầu lấy danh sách người dùng đến API
      const requestData = {
        action: 'onchat',
        data: {
          event: 'GET_USER_LIST'
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
    }, []);
  
    return (
      <div>
        <h2>Danh sách người dùng</h2>
        <ul>
          {users.map((user) => (
            <li key={user.id}>{user.name}</li>
          ))}
        </ul>
      </div>
    );
}

export default ListUser