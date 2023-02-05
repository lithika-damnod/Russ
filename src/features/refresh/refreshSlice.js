import { createSlice } from "@reduxjs/toolkit"; 

export const refreshSlice= createSlice({
    name: 'refresh',
    initialState: {
        refresh: false,
    },
    reducers: { 
        toggleRefresh: (state) => {
            let currentState = state.refresh; 
            state.refresh = !currentState; 
        },
    }, 
    
})


export const { toggleRefresh } = refreshSlice.actions; 
export default refreshSlice.reducer; 