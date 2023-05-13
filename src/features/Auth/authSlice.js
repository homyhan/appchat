import {produce} from 'immer';
const initialState ={
    user: null,    
}

export const authReducer = (state= initialState, {type, payload})=>{
    return produce(state, (darft)=>{
        
        
    })
}