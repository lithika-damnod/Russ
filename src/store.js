import { configureStore } from "@reduxjs/toolkit";
import viewReducer from "./features/view/viewSlice"; 
import scanReducer from "./features/scan/scanSlice";
import refreshReducer from "./features/refresh/refreshSlice";
import historyReducer from "./features/history/historySlice"; 

export default configureStore({
    reducer: {
        view: viewReducer, 
        scan: scanReducer, 
        refresh: refreshReducer, 
        history: historyReducer, 
    }, 
})