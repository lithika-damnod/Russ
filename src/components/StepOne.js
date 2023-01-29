import { useDispatch } from "react-redux";

// components
import Button from "./Button"; 

// reducers 
import { showHero, showFileInput, showTextInput } from "../features/view/viewSlice"; 

// css
import "./StepOne.css"; 

// mui icons 
import KeyboardAltRoundedIcon from '@mui/icons-material/KeyboardAltRounded';
import ImageRoundedIcon from '@mui/icons-material/ImageRounded';

function StepOne() { 

    const dispatch = useDispatch(); 
    return (
        <>
            <div className="step-one-wrapper">
                <div className="prompt">
                    Ready to get answers to your questions? Insert your text here
                </div>
                <div className="mob-input-options">
                    <div className="h-option-divider"></div>
                    <div className="option-wrapper"
                        onClick={() => dispatch(showFileInput())}
                    >
                        <div className="option-frame-container" style={{ marginRight: "1.5rem" }}>
                            <ImageRoundedIcon style={{ fontSize: "3rem" }} />
                        </div>
                        Browse and Scan 
                    </div>
                    <div className="h-option-divider"></div>
                    <div className="option-wrapper"
                        onClick={() => dispatch(showTextInput())}
                    >
                        Type using Keyboard
                        <div className="option-frame-container" style={{ marginLeft: "1.5rem" }}>
                            <KeyboardAltRoundedIcon style={{ fontSize: "3rem" }} />
                        </div>
                    </div>
                    <div className="h-option-divider"></div>
                    <div className="position-controllers">
                        <Button id="prev-btn" backgroundColor="#000000cf"
                            onClick={() => dispatch(showHero())}
                        >Back</Button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default StepOne;