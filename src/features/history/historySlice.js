import { createSlice } from "@reduxjs/toolkit"; 

export const historySlice= createSlice({
    name: 'history',
    initialState: {
        stepOne: "text",
    },
    reducers: { 
        setStepOneHistory: (state, mode) => {
            state.stepOne = mode; 
        },
    }, 
    
})


export const { setStepOneHistory } = historySlice.actions; 
export default historySlice.reducer; 


/* 
    stepOne: modes 
        "text" <- default,  
        "file"
*/ 