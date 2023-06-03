import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

const CreateRoom = () => {

    const [roomName, setRoomName] = useState('');
    const {socket} = useSelector(state=>state.auth);

    const handleSubmit = (event) => {
        event.preventDefault();

        //Gửi yêu cầu tạo phòng đến API
        const createRoomRequest = {
            action: 'onchat',
            data: {
                event: 'CREATE_ROOM',
                data: {
                    name: roomName
                }
            }
        };

        // Gửi yêu cầu sử dụng WebSocket
        const socketCreate = socket
        socketCreate.send(JSON.stringify(createRoomRequest));

        // Xử lý phản hồi từ API
        socketCreate.onmessage = (event) => {
            const response = JSON.parse(event.data);
            console.log(response);

        };

    };

    const handleChange = (event) => {
        setRoomName(event.target.value);
    };
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="text" value={roomName} onChange={handleChange} />
                <button type="submit">Tạo phòng</button>
            </form>
        </div>
    )
}

export default CreateRoom