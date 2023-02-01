import { useState, useEffect, useRef } from "react"; 
import { motion, useAnimationControls } from "framer-motion"
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
    const errorControls = useAnimationControls(); 

    // states 
    const [draggingOver, setDraggingOver] = useState(false); 
    const [regionColor, setRegionColor] = useState("#D9D9D9"); 
    const [regionBorderColor, setRegionBorderColor] = useState("black"); 
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
        setRegionBorderColor("black"); 
    }

    const ocr = (file) => { 
        Tesseract.recognize(file, 'eng', {})
            .then(out => { 
                dispatch(setScanResults(out.data.text)); 
            })  
    }

    const validateUserInput = () => { 
        if (selectedFile === undefined) { 
            setRegionBorderColor("#ce0000"); 
            errorControls.start({
                x: [3, -4, 3, 0], 
                transition: { 
                    duration: 0.2, 
                    repeat: 2, 
                    type: "spring", 
                    stiffness: 250, 
                    damping: 5,
                }
            })
        }
        else { 
            setRegionBorderColor("black"); 
            dispatch(showVerify()); 
            ocr(selectedFile); 
        }
    }

    return (
        <>
            <div className="file-input-wrapper">
                <div className="prompt">
                    Snap a photo of your passage and drag it here to upload
                </div>
                <motion.div className="file-drop-region"
                    onClick={handleFileInputs}
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    style={{backgroundColor: regionColor, borderColor: regionBorderColor}} 
                    animate={errorControls}
                >
                    <input type="file" ref={fileInputRef} accept="image/png, image/jpeg" style={{ display: "none" }} onChange={handleFileChange} />
                    <FileUploadRoundedIcon style={{ fontSize: "3.7rem", color: "rgba(128, 120, 120, 0.8)" }} />
                    <div className="description">
                        <span id="line1">Drag and Drop here</span>
                        <span id="line2">Or</span>
                        <span id="line3">Browse files</span>
                    </div>
                </motion.div>
                <div className="position-controllers">
                    <Button id="prev-btn" backgroundColor="#000000cf"
                        onClick={() => dispatch(showStepOne())}
                    >Back</Button>
                    <Button id="next-btn" onClick={validateUserInput}>Verify</Button>
                </div>
            </div>
        </>
    )
}

export default FileInput;