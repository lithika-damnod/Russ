import { motion } from "framer-motion";
import { useDispatch } from "react-redux";

// reducers 
import { showHero } from "../features/view/viewSlice"; 

// css 
import "./CommonNav.css"; 

function CommonNav() { 
    const dispatch = useDispatch(); 
    return (
        <>
            <motion.div className="nav"
                exit={{ opacity: 0, transition: { duration: 0.1 }}}
            >
                <div className="logo"
                    onClick={() => dispatch(showHero())} 
                >Russ</div>
            </motion.div>
            <div className="horizontal-divider-wrapper">
                <motion.div className="horizontal-divider"
                    exit={{ opacity: 0, transition: { duration: 0.1 }}}
                ></motion.div>
            </div> 
        </>
    ); 
}

export default CommonNav