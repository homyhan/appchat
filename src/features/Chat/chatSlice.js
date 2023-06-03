import { produce } from "immer";
const initialState = {
  listUser: [],  
  listMesPeople:[],
  listMesRoom:null,  
  toUser: null,
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
  
    });
  };