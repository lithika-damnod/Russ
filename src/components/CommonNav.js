
import { useDispatch } from "react-redux";

// reducers 
import { showHero } from "../features/view/viewSlice"; 

// css 
import "./CommonNav.css"; 

function CommonNav() { 
    const dispatch = useDispatch(); 
    return (
        <>
            <div className="nav">
                <div className="logo"
                    onClick={() => dispatch(showHero())} 
                >Russ</div>
            </div>
            <div className="horizontal-divider-wrapper">
                <div className="horizontal-divider"></div>
            </div> 
        </>
    ); 
}

export default CommonNav