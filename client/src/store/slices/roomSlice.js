import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    rooms:[],
    currentRoom:{},
}

const roomSlice = new createSlice({
    name:"room",
    initialState,
    reducers:{
        updateRooms:function(state,action){
            state.rooms = action.payload;
        },

        setCurrentRoom: function(state,action){
            state.currentRoom = action.payLoad;
        }
    }
})

export const {updateRooms, setCurrentRoom} = roomSlice.actions;

export default roomSlice.reducer;