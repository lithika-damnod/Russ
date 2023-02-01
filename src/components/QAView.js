import { motion, useAnimationControls } from "framer-motion"; 
import { useState } from "react"; 
import { useDispatch, useSelector } from "react-redux";

// reducers 
import { showStepOne } from "../features/view/viewSlice"; 

// components
import Button from "./Button"; 
import ArrowRightAltRoundedIcon from '@mui/icons-material/ArrowRightAltRounded';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';

// css 
import "./QAView.css"; 
import axios from "axios";

var letters;  

function QAView() { 

    const dispatch = useDispatch(); 
    const errorControls = useAnimationControls(); 

    // redux states
    const prompt = useSelector((state) => state.scan.text); 

    // states 
    const [answerVisibility, setAnswerVisibility] = useState(false); 
    const [question, setQuestion] = useState(""); 
    const [textareaDisability, setTextareaDisability] = useState(false); 
    const [textareaBorderColor, setTextareaBorderColor] = useState("black"); 

    // event handlers 
    const handleSubmitClicks = () => { 
        if(question === "") { 
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
            setTextareaDisability(true); 
            const endpoint = "https://api.openai.com/v1/completions"; 
            const api_key = process.env.REACT_APP_OPENAI_API_KEY; 
            const data = {
                "model": "text-davinci-003",
                "prompt": `${prompt}\n\n${question}`,
                "temperature": 0.5,
                "max_tokens": 100, 
                "n": 1, 
                "logprobs": null,
            }
            const headers = {
                "Authorization": `Bearer ${api_key}`
            }

            axios.post(endpoint, data, {
                headers: headers
            })
            .then(function (response) { 
                letters = Array.from(response.data["choices"][0]["text"]);  
                setAnswerVisibility(true); 
            })

        }
    }

    return (
        <>
            <div className="qa-wrapper">
                <div className="prompt">
                    Type your question below
                </div>
                <motion.textarea className="question-input"
                    value={question}
                    onChange={e => { 
                        setQuestion(e.target.value); 
                        setTextareaBorderColor("black"); 
                    }}
                    disabled={textareaDisability}
                    style={{ borderColor: textareaBorderColor }}
                    animate={errorControls}
                ></motion.textarea>
                <div className="position-controllers">
                    <motion.div className="custom-back-btn"
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.9 }}
                        transition={{ 
                            type: "spring", 
                            stiffness: 200, 
                            damping: 17,
                        }} 
                        onClick={() => dispatch(showStepOne())}
                    >
                        <ArrowBackRoundedIcon style={{ color: "white" }} /> 
                    </motion.div>
                    <Button id="submit-btn" fontSize="1rem" borderRadius="0" onClick={handleSubmitClicks} >See Answer</Button>
                </div>
                { answerVisibility &&  <AnswerContainer /> } 
            </div>
        </>
    ); 
}

export default QAView; 


function AnswerContainer() { 
    // variants for container 
    const answerContainer = { 
        hidden: { opacity: 0 },
        visible: (i=1) => ({
            opacity: 1, 
            transition: { 
                staggerChildren: 0.03,
                delayChildren: 0.04*i, 
            }
        })
    }
    // variants for each children inside container (letters)
    const answerChild = { 
        hidden: { 
            opacity: 0, 
        }, 
        visible: { 
            opacity: 1, 
        }
    }

    return (
        <>
            <motion.div className="answer-text"
                variants={answerContainer}
                initial="hidden"
                animate="visible" 
            >
                {letters.map((char, index) => (
                    <motion.span
                        variants={answerChild}
                        key={index}
                    >
                        {char}
                    </motion.span>
                ))}
            </motion.div>
            <motion.div className="try-another-btn"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }} 
                transition={{ 
                    duration: 0.5, 
                    delay: 1.3, 
                }}
            >
                <div>
                    Try Another
                </div> 
                <motion.div style={{ display: "flex", color: "black" }}
                    animate={{ 
                        x: [3, 0, 3] 
                    }} 
                    transition={{
                        duration: 0.5, 
                        ease: "easeInOut", 
                        repeat: Infinity, 
                        repeatDelay: 0.6, 
                    }} 
                >
                    <ArrowRightAltRoundedIcon fontSize="large" style={{  margin: "0" }} />
                </motion.div> 
            </motion.div>
        </>
    ); 
}