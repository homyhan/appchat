import { produce } from "immer";
const initialState = {
  listUser: [],  
  listMesPeople:[],
  listMesRoom:null,  
  toUser: null,
  listNewUser:[]
};

export const chatReducer = (state = initialState, { type, payload }) => {
    return produce(state, (draft) => {
      if (type === "USERLIST") {
        draft.listUser = payload;
      }
      if(type==="LIST_MES_PEOPLE"){
        draft.listMesRoom=null;
        draft.listMesPeople = payload
      }
      if(type==="LIST_MES_ROOM"){
        draft.listMesPeople=[]
        draft.listMesRoom = payload
      }      
      
      if(type === "TO_USER1"){
        
        console.log(payload);
        draft.toUser = {
          nameUserChat: payload.nameChatUser,
          isRoom: payload.isRoom
        }
      }
      if(type==="LISTNEWUSER"){
        console.log(state);
        console.log(payload)
        draft.listNewUser.push(payload);


      }
      if(type==="LOGOUT"){
        draft.listUser=[];
        draft.listMesPeople=[];
        draft.listMesPeople=null;
        draft.toUser=null;
        draft.listNewUser=[]
      }
      if(type === "JOIN_NEW_GR"){
        draft.listMesPeople=[];
        draft.listMesRoom={}
      }
  
    });
  };