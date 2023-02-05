import { useState, useEffect } from "react";
import { motion, useAnimationControls } from "framer-motion"; 
import { useDispatch } from "react-redux";

// reducers 
import { showStepOne, showQAView } from "../features/view/viewSlice"; 
import { setScanResults } from "../features/scan/scanSlice";
import { setStepOneHistory } from "../features/history/historySlice";

// css
import "./TextInput.css"; 

// components 
import Button from "./Button"; 

function TextInput() { 
    const dispatch = useDispatch(); 
    const errorControls = useAnimationControls(); 

    // effects
    useEffect(() => { 
        errorControls.start({
            opacity: 1, 
            transition: {
                duration: 0.1,
                delay: 0.2, 
                ease:"easeInOut",
            }
        })
    }, [errorControls])

    useEffect(() => { 
        dispatch(setStepOneHistory("text")); 
    }, [dispatch])

    // states 
    const [textareaBorderColor, setTextareaBorderColor] = useState("black"); 
    const [textareaValue, setTextareaValue ] = useState(""); 

    // methods 
    const validatePromptInput = () => { 
        if(textareaValue==="") { 
            setTextareaBorderColor("#ce0000");
            errorControls.start({
                x: [8, -9, 8, 0], 
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
            <motion.div className="text-input-wrapper"
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10, transition: { duration: 0.07 } }}
            >
                <motion.div className="prompt"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 20, opacity: 0, transition: { duration: 0.1 }}}
                    transition={{ duration: 0.2, delay: 0.15, }}
                >
                    Your passage awaits to be unlocked, please type it in the input box provided
                </motion.div>
                <motion.textarea className="input-textarea" onChange={e => {
                        setTextareaValue(e.target.value); 
                        dispatch(setScanResults(e.target.value)); 
                        setTextareaBorderColor("black"); 
                    }}
                    style={{ borderColor: textareaBorderColor }} 
                    initial={{ opacity: 0 }}
                    animate={errorControls}
                    exit={{ opacity: 0, transition: { duration: 0.1 }}}
                ></motion.textarea>
                <div className="position-controllers">
                    <motion.span style={{ margin: 0}}
                        initial={{ y: 40 }}
                        animate={{ y: 0 }}
                        exit={{ y: 40, opacity: 0 }}
                        transition={{ 
                            type: "spring", 
                            stiffness: 200, 
                            damping: 17,
                        }} 
                    >
                        <Button id="prev-btn" backgroundColor="#000000cf"
                            onClick={() => dispatch(showStepOne())}
                        >Back</Button>
                    </motion.span>
                    <motion.span style={{ margin: 0}}
                        initial={{ y: 40 }}
                        animate={{ y: 0 }}
                        exit={{ y: 40, opacity: 0 }}
                        transition={{ 
                            type: "spring", 
                            stiffness: 200, 
                            damping: 17,
                            delay: 0.025,
                        }} 
                    >
                        <Button id="next-btn"
                            onClick={validatePromptInput}
                        >Next</Button>
                    </motion.span>
                </div>
            </motion.div>
        </>
    )
}

export default TextInput;