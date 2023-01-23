
import { useDispatch } from "react-redux";

// reducers 
import { showHero } from "../features/view/viewSlice"; 

// css 
import "./CommonNav.css"; 

function CommonNav() { 
    const dispatch = useDispatch(); 
    return (
        <>
            <div className="nav-wrapper">
                <span style={{ cursor: "pointer" }}
                    onClick={() => dispatch(showHero())}
                >Russ</span>      
            </div>
        </>
    ); 
}

export default CommonNav