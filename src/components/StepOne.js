import { useDispatch } from "react-redux";
import { motion } from "framer-motion";

// components
import Button from "./Button"; 

// reducers 
import { showHero, showFileInput, showTextInput } from "../features/view/viewSlice"; 

// css
import "./StepOne.css"; 

// mui icons 
import KeyboardAltRoundedIcon from '@mui/icons-material/KeyboardAltRounded';
import ImageRoundedIcon from '@mui/icons-material/ImageRounded';

function StepOne() { 

    const dispatch = useDispatch(); 
    return (
        <>
            <div className="step-one-wrapper">
                <motion.div className="prompt"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.2, delay: 0.15, }}
                >
                    Ready to get answers to your questions? Insert your text here
                </motion.div>
                <div className="mob-input-options">
                    <motion.div className="h-option-divider"
                        initial={{ opacity: 0, x: window.innerWidth }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: 0.25, ease:"easeIn" }}
                    ></motion.div>
                    <div className="option-wrapper"
                        onClick={() => dispatch(showFileInput())}
                    >
                        <motion.div className="option-frame-container" style={{ marginRight: "1.5rem" }}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.3, delay: 0.3, ease:"easeInOut" }}
                        >
                            <ImageRoundedIcon style={{ fontSize: "3rem" }} />
                        </motion.div>
                        <motion.span
                            initial={{ opacity: 0, y: 5 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.1, delay: 0.35, }}
                        >
                            Browse and Scan 
                        </motion.span>
                    </div>
                    <motion.div className="h-option-divider"
                        initial={{ opacity: 0, x: -(window.innerWidth) }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: 0.3, ease:"easeIn" }}
                    ></motion.div>
                    <motion.div className="option-wrapper"
                        onClick={() => dispatch(showTextInput())}
                    >
                        <motion.span
                            initial={{ opacity: 0, y: 5 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.1, delay: 0.45 }}
                        >
                            Type using Keyboard
                        </motion.span>
                        <motion.div className="option-frame-container" style={{ marginLeft: "1.5rem" }}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.35, ease:"easeInOut" }}
                        >
                            <KeyboardAltRoundedIcon style={{ fontSize: "3rem" }} />
                        </motion.div>
                    </motion.div>
                    <motion.div className="h-option-divider"
                        initial={{ opacity: 0, x: window.innerWidth }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: 0.4, ease:"easeIn" }}
                    ></motion.div>
                </div>
                <motion.div className="position-controllers"
                    initial={{ y: 40 }}
                    animate={{ y: 0 }}
                    transition={{ 
                        type: "spring", 
                        stiffness: 200, 
                        damping: 17,
                    }} 
                >
                    <Button id="prev-btn" backgroundColor="#000000cf"
                        onClick={() => dispatch(showHero())}
                    >Back</Button>
                </motion.div>
            </div>
        </>
    )
}

export default StepOne;