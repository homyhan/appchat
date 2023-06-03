// export const fetchMesPeople = (socketCreate, userOrther) => (dispatch) => {
//     const getMesPeople = {
//       action: "onchat",
//       data: {
//         event: "GET_PEOPLE_CHAT_MES",
//         data: {
//           name: userOrther,
//           page: 1,
//         },
//       },
//     };
//     socketCreate.send(JSON.stringify(getMesPeople));
//     socketCreate.onmessage = (evt) => {
//       const res = JSON.parse(evt.data);
//       console.log(res);
//       dispatch({
//         type: "LIST_MES_PEOPLE",
//         payload: res.data,
//
//       });
//     };
//   };

export const fetchMesPeople = (socketCreate, userOrther) => (dispatch) => {
    let currentSender = null; // Biến lưu trữ người gửi hiện tại

    const handleNewMessage = (res) => {
        // Kiểm tra nếu tin nhắn mới nhận là từ người gửi hiện tại
        if (res.data.sender === currentSender) {
            dispatch({
                type: "LIST_MES_PEOPLE",
                payload: res.data,
            });
        }
    };

    const getMesPeople = {
        action: "onchat",
        data: {
            event: "GET_PEOPLE_CHAT_MES",
            data: {
                name: userOrther,
                page: 1,
            },
        },
    };

    socketCreate.send(JSON.stringify(getMesPeople));

    socketCreate.onmessage = (evt) => {
        const res = JSON.parse(evt.data);
        console.log(res);
        dispatch({
            type: "LIST_MES_PEOPLE",
            payload: res.data,
        });
        if (res.event === "SEND_CHAT") {
            console.log("send chat", res.data);
            currentSender = res.data.name; // Cập nhật người gửi hiện tại

            const getMesPeople = {
                action: "onchat",
                data: {
                    event: "GET_PEOPLE_CHAT_MES",
                    data: {
                        name: userOrther,
                        page: 1,
                    },
                },
            };

            socketCreate.send(JSON.stringify(getMesPeople));
        }

        handleNewMessage(res);
    };
};
  // export const fetchMesRoom = (socketCreate, userOrther) => (dispatch) => {
  //   const getMesPeople = {
  //     action: "onchat",
  //     data: {
  //       event: "GET_ROOM_CHAT_MES",
  //       data: {
  //         name: userOrther,
  //         page: 1,
  //       },
  //     },
  //   };
  //   socketCreate.send(JSON.stringify(getMesPeople));
  //   socketCreate.onmessage = (evt) => {
  //     const res = JSON.parse(evt.data);
  //     console.log(res);
  //     dispatch({
  //       type: "LIST_MES_ROOM",
  //       payload: res.data,
  //     });
  //   };
  //
  // };

export const fetchMesRoom = (socketCreate, userOrther) => (dispatch) => {
    let currentSender = null;

    const handleNewMessage = (res) => {
        // Kiểm tra nếu tin nhắn mới nhận là từ người gửi hiện tại
        if (res.data.sender === currentSender) {
            dispatch({
                type: "LIST_MES_ROOM",
                payload: res.data,
            });
        }
    };
    const getMesPeople = {
        action: "onchat",
        data: {
            event: "GET_ROOM_CHAT_MES",
            data: {
                name: userOrther,
                page: 1,
            },
        },
    };
    socketCreate.send(JSON.stringify(getMesPeople));
    socketCreate.onmessage = (evt) => {
        const res = JSON.parse(evt.data);
        console.log(res);
        dispatch({
            type: "LIST_MES_ROOM",
            payload: res.data,
        });
        if(res.event==="SEND_CHAT"){
            console.log("send chat gr", res);



            currentSender = res.data.name;
            const getMesPeople = {
                action: "onchat",
                data: {
                    event: "GET_ROOM_CHAT_MES",
                    data: {
                        name: userOrther,
                        page: 1,
                    },
                },
            };
            socketCreate.send(JSON.stringify(getMesPeople));

        }
        handleNewMessage(res);
    };

};

export const fetchListUser = (socketCreate)=> async (dispatch)=>{
    const getUserListRequest = {
      action: "onchat",
      data: {
        event: "GET_USER_LIST",
      },
    };
    
    socketCreate.send(JSON.stringify(getUserListRequest));
    
    socketCreate.onmessage = async (evt) => {
     const res = JSON.parse(evt.data);
      
      console.log("nhan signin", res);
      await dispatch({
        type: "USERLIST",
        payload: res.data,
      });
    };    
  }


export const joinRoom = (socketCreate, userOrther) => (dispatch) => {
    console.log(userOrther);
    const joinRoom = {
        action: "onchat",
        data: {
            event: "JOIN_ROOM",
            data: {
                name: userOrther,
            },
        },
    };

    socketCreate.send(JSON.stringify(joinRoom));
    socketCreate.onmessage = (evt) => {
        const res = JSON.parse(evt.data);
        console.log(res);
        dispatch({
            type: "LIST_MES_ROOM",
            payload: res.data,
        });
    };
};

export const logout = (socketCreate)=>(dispatch)=>{
    const logout = {
        action: "onchat",
        data: {
            event: "LOGOUT"
        }
    }
    socketCreate.send(JSON.stringify(logout));
    socketCreate.onmessage = (evt)=>{
        const res = JSON.parse(evt.data);
        dispatch({
            type:"LOGOUT",

        })
        console.log("logout", res);
    }
}


