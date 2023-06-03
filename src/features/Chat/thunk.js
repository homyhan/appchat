export const fetchMesPeople = (socketCreate, userOrther) => (dispatch) => {
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
    };
  };

export const fetchMesRoom = (socketCreate, userOrther) => (dispatch) => {
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
};

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




