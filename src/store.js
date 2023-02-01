import { configureStore } from "@reduxjs/toolkit";
import viewReducer from "./features/view/viewSlice"; 
import scanReducer from "./features/scan/scanSlice";

export default configureStore({
    reducer: {
        view: viewReducer, 
        scan: scanReducer, 
    }, 
})