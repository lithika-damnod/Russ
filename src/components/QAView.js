import {motion} from "framer-motion"; 
import {useState} from "react"; 
import { useDispatch } from "react-redux";

// reducers 
import { showStepOne } from "../features/view/viewSlice"; 

// components
import Button from "./Button"; 
import ArrowRightAltRoundedIcon from '@mui/icons-material/ArrowRightAltRounded';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';

// css 
import "./QAView.css"; 

const letters = Array.from("Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia, molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentiumoptio, eaque rerum! Provident similique accusantium nemo autem. Veritatis obcaecati tenetur iure eius earum ut molestias architecto voluptate aliquamnihil, eveniet aliquid culpa officia aut! Impedit sit sunt quaerat, odit,tenetur error, harum nesciunt ipsum debitis quas aliquid. Reprehenderit, quia. Quo neque error repudiandae fuga?"); 
function QAView() { 

    const dispatch = useDispatch(); 

    // states 
    const [answerVisibility, setAnswerVisibility] = useState(false); 

    // event handlers 
    const handleSubmitClicks = () => { 
        setAnswerVisibility(true); 
    }

    return (
        <>
            <div className="qa-wrapper">
                <div className="prompt">
                    Type your question below
                </div>
                <textarea className="question-input"></textarea>
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
                <motion.div style={{ display: "flex", color: "black" }}>
                    <ArrowRightAltRoundedIcon fontSize="large" style={{  margin: "0" }} />
                </motion.div> 
            </motion.div>
        </>
    ); 
}