import { createSlice } from "@reduxjs/toolkit"; 

export const scanSlice = createSlice({
    name: 'scan',
    initialState: {
        text: "", 
    },
    reducers: { 
        setScanResults: (state, text) => { 
            state.text = text.payload; 
        }, 
    }, 
})


export const {setScanResults} = scanSlice.actions; 
export default scanSlice.reducer; 