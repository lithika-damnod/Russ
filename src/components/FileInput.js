import { useState, useEffect, useRef } from "react"; 

// css
import "./FileInput.css"; 

// components 
import Button from "./Button"; 
import FileUploadRoundedIcon from '@mui/icons-material/FileUploadRounded';
import { useDispatch } from "react-redux";

// reducers 
import { showStepOne, showQAView } from "../features/view/viewSlice"; 

function FileInput() { 

    const dispatch = useDispatch(); 

    // states 
    const [draggingOver, setDraggingOver] = useState(false); 
    const [regionColor, setRegionColor] = useState("#D9D9D9"); 

    // refs 
    const fileInputRef = useRef(null); 

    // effects 
    useEffect(() => { 
        if(draggingOver) {
            setRegionColor("rgb(194 191 191)"); 
        }
        else { 
            setRegionColor("#D9D9D9"); 
        }
    }, [draggingOver])

    // event handlers 
    const handleFileInputs = () => { 
        // open file  ( file-explorer or finder .. )
        fileInputRef.current.click();
    }

    const handleDragOver = (event) => { 
        event.preventDefault();
        setDraggingOver(true); 
    }
    const handleDragLeave = (event) => { 
        event.preventDefault();
        setDraggingOver(false); 
    }
    const handleDrop = (event) => { 
        event.preventDefault(); 
        console.log(event); 
        setDraggingOver(false); 
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
                    onDragLeave={handleDragLeave}
                    style={{backgroundColor: regionColor}}
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

export default FileInput;