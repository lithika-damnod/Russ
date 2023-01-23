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
        }, 
        showStepOne: (state) => { 
            state.hero = false; 
            state.stepone = true; 
        }, 
        showTextInput: (state) => { 
            state.hero = false; 
            state.textinput = true; 
        }, 
        showFileInput: (state) => { 
            state.hero = false; 
            state.fileinput = true; 
        }, 
        showQAView: (state) => { 
            state.hero = false; 
            state.qaview = true; 
        }, 
    }, 
})


export const { showHero, showStepOne, showTextInput, showFileInput, showQAView } = viewSlice.actions; 
export default viewSlice.reducer; 