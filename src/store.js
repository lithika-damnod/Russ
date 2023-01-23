import { configureStore, ConfigureStore } from "@reduxjs/toolkit";
import viewReducer from "./features/view/viewSlice"; 

export default configureStore({
    reducer: {
        view: viewReducer, 
    }, 
})