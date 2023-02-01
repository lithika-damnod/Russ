import { useState } from "react";
import { motion, useAnimationControls } from "framer-motion"; 
import { useDispatch } from "react-redux";

// reducers 
import { showStepOne, showQAView } from "../features/view/viewSlice"; 
import { setScanResults } from "../features/scan/scanSlice";

// css
import "./TextInput.css"; 

// components 
import Button from "./Button"; 

function TextInput() { 
    const dispatch = useDispatch(); 
    const errorControls = useAnimationControls(); 


    // states 
    const [textareaBorderColor, setTextareaBorderColor] = useState("black"); 
    const [textareaValue, setTextareaValue ] = useState(""); 

    // methods 
    const validatePromptInput = () => { 
        if(textareaValue==="") { 
            setTextareaBorderColor("#ce0000");
            errorControls.start({
                x: [3, -4, 3, 0], 
                transition: { 
                    duration: 0.2, 
                    repeat: 2, 
                    type: "spring", 
                    stiffness: 250, 
                    damping: 5,
                }
            })
        }
        else { 
            dispatch(showQAView()); 
        }
    }

    return (
        <>
            <div className="text-input-wrapper">
                <div className="prompt">
                    Your passage awaits to be unlocked, please type it in the input box provided
                </div>
                <motion.textarea className="input-textarea" onChange={e => {
                        setTextareaValue(e.target.value); 
                        dispatch(setScanResults(e.target.value)); 
                        setTextareaBorderColor("black"); 
                    }}
                    style={{ borderColor: textareaBorderColor }} 
                    animate={errorControls}
                ></motion.textarea>
                <div className="position-controllers">
                    <Button id="prev-btn" backgroundColor="#000000cf"
                        onClick={() => dispatch(showStepOne())}
                    >Back</Button>
                    <Button id="next-btn"
                        onClick={validatePromptInput}
                    >Next</Button>
                </div>
            </div>
        </>
    )
}

export default TextInput;