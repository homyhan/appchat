import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2'
import {fetchListUser} from "./thunk";
import {getWebSocket} from "../../utils/websocket";

const CreateRoom = () => {
    const dispatch = useDispatch();
    const [roomName, setRoomName] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        const socket = getWebSocket();
        if(roomName==="" ||roomName.split(" ").join("")===""){
            return alert("Vui long nhap noi dung");
        }

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
            if(response.status==="success"){
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: response.status,
                    showConfirmButton: false,
                    timer: 1500
                })
                setRoomName("");
                dispatch(fetchListUser(socketCreate))
            }else{
                Swal.fire({
                    icon: 'error',
                    title: response.status,
                    text: response.mes,

                })
            }

        };

    };

    const handleChange = (event) => {
        setRoomName(event.target.value);
    };
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="text" value={roomName} onChange={handleChange} />
                <button type="submit" style={{padding:'10px 18px'}}>Tạo phòng</button>
            </form>
        </div>
    )
}

export default CreateRoom