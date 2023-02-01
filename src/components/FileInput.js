import { useState, useEffect, useRef } from "react"; 
import Tesseract from 'tesseract.js';

// css
import "./FileInput.css"; 

// components 
import Button from "./Button"; 
import FileUploadRoundedIcon from '@mui/icons-material/FileUploadRounded';
import { useDispatch } from "react-redux";

// reducers 
import { showStepOne, showVerify } from "../features/view/viewSlice"; 
import { setScanResults } from "../features/scan/scanSlice"; 

function FileInput() { 

    const dispatch = useDispatch(); 

    // states 
    const [draggingOver, setDraggingOver] = useState(false); 
    const [regionColor, setRegionColor] = useState("#D9D9D9"); 
    const [selectedFile, setSelectedFile] = useState();

    // refs 
    const fileInputRef = useRef(null); 

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
        setDraggingOver(false); 
    }
    const handleFileChange = (event) => { 
        setSelectedFile(event.target.files[0]);
    }

    const ocr = (file) => { 
        Tesseract.recognize(file, 'eng', {})
            .then(out => { 
                dispatch(setScanResults(out.data.text)); 
            })  
    }

    return (
        <>
            <div className="file-input-wrapper">
                <div className="prompt">
                    Snap a photo of your passage and drag it here to upload
                </div>
                <div className="file-drop-region"
                    onClick={handleFileInputs}
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    style={{backgroundColor: regionColor}} 
                >
                    <input type="file" ref={fileInputRef} accept="images/*" style={{ display: "none" }} onChange={handleFileChange} />
                    <FileUploadRoundedIcon style={{ fontSize: "3.7rem", color: "rgba(128, 120, 120, 0.8)" }} />
                    <div className="description">
                        <span id="line1">Drag and Drop here</span>
                        <span id="line2">Or</span>
                        <span id="line3">Browse files</span>
                    </div>
                </div>
                <div className="position-controllers">
                    <Button id="prev-btn" backgroundColor="#000000cf"
                        onClick={() => dispatch(showStepOne())}
                    >Back</Button>
                    <Button id="next-btn"
                        onClick={() => { 
                            dispatch(showVerify()); 
                            ocr(selectedFile); 
                        }}
                    >Verify</Button>
                </div>
            </div>
        </>
    )
}

export default FileInput;