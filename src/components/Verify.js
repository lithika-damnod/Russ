import { useDispatch, useSelector } from "react-redux";

// reducers 
import { showQAView, showFileInput } from "../features/view/viewSlice"; 
import { setScanResults } from "../features/scan/scanSlice";

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
                <textarea className="input-textarea" defaultValue={scannedText} onChange={e => setScanResults(e.target.value)}></textarea>
                <div className="position-controllers">
                    <Button id="prev-btn" backgroundColor="#000000cf"
                        onClick={() => dispatch(showFileInput())}
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