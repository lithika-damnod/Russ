import { useDispatch, useSelector } from "react-redux";

// reducers 
import { showStepOne, showQAView } from "../features/view/viewSlice"; 

// css
import "./TextInput.css"; 

// components 
import Button from "./Button"; 

function Verify() { 
    const dispatch = useDispatch(); 

    const scannedText = useSelector((state) => state.scan.text); 

    return (
        <>
            <div className="text-input-wrapper">
                <div className="prompt">
                    Please review the text extracted from images for accuracy and legibility.
                </div>
                <textarea className="input-textarea" defaultValue={scannedText}></textarea>
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

export default Verify;