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
    return (
        <>
            <div className="text-input-wrapper">
                <div className="prompt">
                    Your passage awaits to be unlocked, please type it in the input box provided
                </div>
                <textarea className="input-textarea" onChange={e => setScanResults(e.target.value)}></textarea>
                <div className="position-controllers">
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