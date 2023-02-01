import { createSlice } from "@reduxjs/toolkit"; 

export const viewSlice= createSlice({
    name: 'view',
    initialState: {
        hero: false, 
        stepone: false, 
        textinput: true, 
        fileinput: false,  
        verify: false, 
        qaview: false, 
    },
    reducers: { 
        showHero: (state) => { 
            state.hero = true; 
            state.stepone = false; 
            state.textinput = false; 
            state.fileinput = false;  
            state.qaview = false; 
            state.verify = false; 
        }, 
        showStepOne: (state) => { 
            state.hero = false; 
            state.stepone = true; 
            state.textinput = false; 
            state.fileinput = false;  
            state.qaview = false; 
            state.verify = false; 
        }, 
        showTextInput: (state) => { 
            state.hero = false; 
            state.stepone = false; 
            state.textinput = true; 
            state.fileinput = false;  
            state.qaview = false; 
            state.verify = false; 
        }, 
        showFileInput: (state) => { 
            state.hero = false; 
            state.stepone = false; 
            state.textinput = false; 
            state.fileinput = true;  
            state.qaview = false; 
            state.verify = false; 
        }, 
        showQAView: (state) => { 
            state.hero = false; 
            state.stepone = false; 
            state.textinput = false; 
            state.fileinput = false;  
            state.qaview = true; 
            state.verify = false; 
        }, 
        showVerify: (state) => { 
            state.hero = false; 
            state.stepone = false; 
            state.textinput = false; 
            state.fileinput = false;  
            state.qaview = false; 
            state.verify = true; 
        }, 
    }, 
})


export const { showHero, showStepOne, showTextInput, showFileInput, showVerify, showQAView } = viewSlice.actions; 
export default viewSlice.reducer; 