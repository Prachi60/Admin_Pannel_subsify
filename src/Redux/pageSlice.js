import { createSlice } from "@reduxjs/toolkit";

const pageSlice= createSlice({
    name:"page",
    initialState:{
        title:"Dashboard",
    },
    reducers:{
        setPageTitle:(state,action)=>{
            state.title=action.payload;
        }
    }
})

export const {setPageTitle} =pageSlice.actions;
export default pageSlice.reducer;