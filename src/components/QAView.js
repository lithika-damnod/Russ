import {motion} from "framer-motion"; 
import {useState} from "react"; 

// components
import Button from "./Button"; 
import ArrowRightAltRoundedIcon from '@mui/icons-material/ArrowRightAltRounded';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';

// css 
import "./QAView.css"; 

const letters = Array.from("To encourage further conversation and be even more polite, you want to ask about them, too. As you can see from the examples above, adding the question “How about you?” or “And what about you?” will give the other person an opportunity to respond. You’ll see this on most of the examples that follow.");
function QAView() { 

    // states 
    const [answerVisibility, setAnswerVisibility] = useState(false); 

    // event handlers 
    const handleSubmitClicks = () => { 
        setAnswerVisibility(true); 
    }

    return (
        <>
            <div className="qa-container">
                <div className="prompt-wrapper">
                    <div className="q-header">Q.</div>
                    <textarea className="q-input" autoFocus></textarea>
                </div>
                <div className="submit-space">
                    <Button onClick={handleSubmitClicks}>See Answer</Button>
                </div>
                <div className="answer-prompt-wrapper"> 
                    <div className="a-header">A.</div>
                    { answerVisibility &&  <AnswerContainer /> } 
                </div>
                <div className="side-btn-left">
                    <ArrowBackRoundedIcon style={{ fontSize: "2.2rem" }} />
                </div>
                <div className="side-btn-right">
                    <span>Try Another</span> 
                    <ArrowRightAltRoundedIcon style={{ fontSize: "2.2rem" }} />
                </div>
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
        <motion.div className="a-container"
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
    ); 
}