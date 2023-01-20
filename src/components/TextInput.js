// css
import "./TextInput.css"; 

// components 
import Button from "./Button"; 

function TextInput() { 

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
                    <Button id="prev-btn" backgroundColor="#000000cf">Back</Button>
                    <Button id="next-btn">Next</Button>
                </div>
            </div>
        </>
    )
}

export default TextInput;