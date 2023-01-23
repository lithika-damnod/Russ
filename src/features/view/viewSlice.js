import { createSlice } from "@reduxjs/toolkit"; 

export const viewSlice= createSlice({
    name: 'view',
    initialState: {
        hero: true, 
        stepone: false, 
        textinput: false, 
        fileinput: false,  
        qaview: false, 
    },
    reducers: { 
        showHero: (state) => { 
            state.hero = true; 
            state.stepone = false; 
            state.textinput = false; 
            state.fileinput = false;  
            state.qaview = false; 
        }, 
        showStepOne: (state) => { 
            state.hero = false; 
            state.stepone = true; 
            state.textinput = false; 
            state.fileinput = false;  
            state.qaview = false; 
        }, 
        showTextInput: (state) => { 
            state.hero = false; 
            state.stepone = false; 
            state.textinput = true; 
            state.fileinput = false;  
            state.qaview = false; 
        }, 
        showFileInput: (state) => { 
            state.hero = false; 
            state.stepone = false; 
            state.textinput = false; 
            state.fileinput = true;  
            state.qaview = false; 
        }, 
        showQAView: (state) => { 
            state.hero = false; 
            state.stepone = false; 
            state.textinput = false; 
            state.fileinput = false;  
            state.qaview = true; 
        }, 
    }, 
})


export const { showHero, showStepOne, showTextInput, showFileInput, showQAView } = viewSlice.actions; 
export default viewSlice.reducer; 