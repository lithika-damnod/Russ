import { AnimatePresence, motion, useAnimationControls } from "framer-motion"; 
import { useEffect, useState } from "react"; 
import { useDispatch, useSelector } from "react-redux";
import { createTheme, ThemeProvider } from '@mui/material/styles';

// mui 
import CircularProgress from '@mui/material/CircularProgress';

// reducers 
import { showStepOne } from "../features/view/viewSlice"; 
import { toggleRefresh } from "../features/refresh/refreshSlice"; 

// components
import Button from "./Button"; 
import ArrowRightAltRoundedIcon from '@mui/icons-material/ArrowRightAltRounded';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';

// css 
import "./QAView.css"; 
import axios from "axios";

var letters = Array.from("lithika damnod bandara dasanayaka lithika damnod bandara dasanayaka");  

function QAView() { 

    const dispatch = useDispatch(); 
    const errorControls = useAnimationControls(); 

    // redux states
    const prompt = useSelector((state) => state.scan.text); 
    const refresh = useSelector((state) => state.refresh.refresh); 

    // states 
    const [answerVisibility, setAnswerVisibility] = useState(false); 
    const [question, setQuestion] = useState(""); 
    const [textareaDisability, setTextareaDisability] = useState(false); 
    const [textareaBorderColor, setTextareaBorderColor] = useState("black"); 
    const [progressVisibility, setProgressVisibility] = useState(false); 

    // event handlers 
    const handleSubmitClicks = () => { 
        if(question === "") { 
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
            setTextareaDisability(true); 
            setProgressVisibility(true);  
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
                setProgressVisibility(false); 
                letters = Array.from(response.data["choices"][0]["text"]);  
                setAnswerVisibility(true); 
            })
        }
    }

    const theme = createTheme({
        palette: {
            primary: {
                main: '#000000',
                darker: '#000000',
            },
        }
    }); 

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
        if(progressVisibility === false) { 
            errorControls.start({ 
                opacity: 1,
            })
        }
    }, [progressVisibility, errorControls])

    useEffect(() => { 
        if(refresh === true) { 
            setQuestion("");   // set the current value in the textarea to an empty string
            setTextareaDisability(false);   
            setAnswerVisibility(false); 
            dispatch(toggleRefresh()); 
        }
    }, [refresh, dispatch])


    return (
        <>
            <motion.div className="qa-wrapper"
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10, transition: { duration: 0.075 } }}
            >
                <motion.div className="prompt"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 20, opacity: 0, transition: { duration: 0.1 }}}
                    transition={{ duration: 0.2, delay: 0.15, }}
                >
                    Type your question below
                </motion.div>
                { progressVisibility && (
                    <div className="progress-view">
                        <motion.div
                            initial={{ opacity: 0}} 
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0, transition: { duration: 2 }}}
                            transition={{ duration: 2 }}
                        >
                            <ThemeProvider theme={theme}>
                                <CircularProgress disableShrink color="primary" size={60} thickness={2} />
                            </ThemeProvider>
                        </motion.div>
                    </div>
                )}
                { !progressVisibility && (
                    <motion.textarea className="question-input"
                        value={question}
                        onChange={e => { 
                            setQuestion(e.target.value); 
                            setTextareaBorderColor("black"); 
                        }}
                        disabled={textareaDisability}
                        style={{ borderColor: textareaBorderColor }}
                        initial={{ opacity: 0 }}
                        animate={errorControls}
                    ></motion.textarea>
                )}
                <motion.div className="position-controllers"
                    initial={{ y: 40 }}
                    animate={{ y: 0 }}
                    exit={{ opacity: 0, transition: { duration: 0.05, delay: 0 } }}
                    transition={{ 
                        type: "spring", 
                        stiffness: 200, 
                        damping: 17,
                    }} 
                >
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
                </motion.div>
                <AnimatePresence>
                    { answerVisibility &&  <AnswerContainer /> } 
                </AnimatePresence>
            </motion.div>
        </>
    ); 
}

export default QAView; 


function AnswerContainer() { 

    const dispatch = useDispatch(); 

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
                exit={{ opacity: 0 }}
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
                exit={{ opacity: 0, transition: { duration: 0.05, delay: 0 } }}
                transition={{ 
                    duration: 0.5, 
                    delay: 1.3, 
                }}
                onClick={() => dispatch(toggleRefresh())} 
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