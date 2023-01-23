import { useDispatch } from "react-redux";

// reducers 
import { showStepOne, showQAView } from "../features/view/viewSlice"; 

// css
import "./TextInput.css"; 

// components 
import Button from "./Button"; 

function TextInput() { 
    const dispatch = useDispatch(); 
    return (
        <>
            <div className="text-input-container">
                <div className="prompt-wrapper">
                    <span className="prompt-text">
                        Your passage awaits to be unlocked, please type it in the input box provided
                    </span>
                </div>
                <textarea className="input-textarea"></textarea>
                <div className="btn-section">
                    <Button id="prev-btn" backgroundColor="#000000cf"
                        onClick={() => dispatch(showStepOne())}
                    >Back</Button>
                    <Button id="next-btn"
                        onClick={() => dispatch(showQAView())}
                    >Next</Button>
                </div>
            </div>
        </>
    )
}

export default TextInput;