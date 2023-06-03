import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMesPeople, fetchMesRoom, joinRoom } from "./thunk";
export const FindPerson = () => {
  const [isChecked, setIsChecked] = useState(false);
  const [isRoom, setIsRoom] = useState(0);
  const [userOrther, setUserOrther] = useState("");
  const { socket } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const handleSubmit = (event) => {
    event.preventDefault();

    if(userOrther==="" ||userOrther.split(" ").join("")===""){
      return alert("Vui long nhap noi dung");
    }
   
    const findPerson = {
      action: "onchat",
      data: {
        event: "CHECK_USER",
        data: {
          user: userOrther,
        },
      },
    };
        // Gửi yêu cầu sử dụng WebSocket
    // const socket = socket;
    socket.send(JSON.stringify(findPerson));

    // Xử lý phản hồi từ API
    socket.onmessage = async (event) => {
      const response = JSON.parse(event.data);
      console.log(response);
      if (response.status === "success") {
        console.log("Có tồn tại user");        

        await dispatch({
          type: "TO_USER1",
          payload: {
            nameChatUser: userOrther,
            isRoom: isRoom,
          },
        });

        if (isRoom === 0) {
          await dispatch(fetchMesPeople(socket, userOrther));
        } else {
          await dispatch(fetchMesRoom(socket, userOrther));

          
        }
      } else {
        console.log("User không tồn tại");
      }
      //   socket.close();
    };
    
  };
  const handleChange = (event) => {
    setUserOrther(event.target.value);
  };

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
    if (!isChecked) {
      setIsRoom(1);

    } else {

      setIsRoom(0);

    }
  };
  return (
    <div>
      <form >        
        <div style={{justifyContent:'center', marginTop:'20px'}} className="d-flex input-group">
          <input style={{width: 'auto', margin:'0px'}} type="text" />
          <input
          style={{width: '22px', margin:'0px'}}
            type="checkbox"
            
          />
        </div>

        <button type="submit">Tìm</button>
      </form>
    </div>
  );
}


