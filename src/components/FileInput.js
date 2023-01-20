import { useRef } from "react"; 

// css
import "./FileInput.css"; 

// components 
import Button from "./Button"; 
import FileUploadRoundedIcon from '@mui/icons-material/FileUploadRounded';

function FileInput() { 
    // refs 
    const fileInputRef = useRef(null); 

    // event handlers 
    const handleFileInputs = () => { 
        // open file  ( file-explorer or finder .. )
        fileInputRef.current.click();
    }

    const handleDragOver = (event) => { event.preventDefault();}
    const handleDrop = (event) => { 
        event.preventDefault(); 
        console.log(event); 
    }

    return (
        <>
            <div className="file-input-container">
                <div className="prompt-wrapper">
                    <span className="prompt-text">
                        Snap a photo of your passage and drag it here to upload
                    </span>
                </div>
                <div className="file-drop-region" 
                    onClick={handleFileInputs}
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                >
                    <input type="file" ref={fileInputRef} style={{ display: "none" }} />
                    <FileUploadRoundedIcon style={{ fontSize: "4rem", color: "rgba(128, 120, 120, 0.62)"}} /> 
                    <div className="description">
                        <span id="line1">Drag and Drop here</span>
                        <span id="line2">Or</span>
                        <span id="line3">Browse files</span>
                    </div>
                </div>
                <div className="btn-section">
                    <Button id="prev-btn" backgroundColor="#000000cf">Back</Button>
                    <Button id="next-btn">Next</Button>
                </div>
            </div>
        </>
    )
}

export default FileInput;