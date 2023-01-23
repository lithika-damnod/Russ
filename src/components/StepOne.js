import { motion } from "framer-motion"; 
import { useDispatch } from "react-redux";

// reducers 
import { showFileInput, showTextInput } from "../features/view/viewSlice"; 

// css
import "./StepOne.css"; 

// icons 
import CameraAltOutlinedIcon from '@mui/icons-material/CameraAltOutlined';
import KeyboardAltOutlinedIcon from '@mui/icons-material/KeyboardAltOutlined';


function StepOne() { 

    const dispatch = useDispatch(); 
    return (
        <>
            <div className="step-one-container">
            <div className="prompt-wrapper">
                <div className="step-no-header">1.</div>
                <div className="step-prompt">Ready to get answers to your questions? Insert your text here</div> 
            </div>
            <div className="user-input-section">
                <motion.div className="btn scan-btn"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.9 }}
                    transition={{ 
                        type: "spring", 
                        stiffness: 200, 
                        damping: 17,
                    }} 
                    onClick={() => dispatch(showFileInput())}
                >
                    <p>Scan using photos</p>
                    <CameraAltOutlinedIcon />
                </motion.div>
                <motion.div className="btn insert-btn"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.9 }}
                    transition={{ 
                        type: "spring", 
                        stiffness: 200, 
                        damping: 17,
                    }} 
                    onClick={() => dispatch(showTextInput())}
                >
                    <p>Type text using keyboard</p>
                    <KeyboardAltOutlinedIcon />
                </motion.div>
            </div>
            </div>
        </>
    )
}

export default StepOne;