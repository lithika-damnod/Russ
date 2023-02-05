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
import { setStepOneHistory } from "../features/history/historySlice"; 

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
        errorControls.start({
            opacity: 1, 
            transition: {
                duration: 0.1,
                delay: 0.2, 
                ease:"easeInOut",
            }
        })
    }, [errorControls])

    useEffect(() => { 
        if(draggingOver) {
            setRegionColor("rgb(194 191 191)"); 
        }
        else { 
            setRegionColor("#D9D9D9"); 
        }
    }, [draggingOver])

    useEffect(() => { 
        dispatch(setStepOneHistory("file")); 
    }, [dispatch])

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

        if (event.dataTransfer.files && event.dataTransfer.files[0]) {
            setSelectedFile(event.dataTransfer.files[0]); 
        }
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
                x: [8, -9, 8, 0], 
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
            <motion.div className="file-input-wrapper"
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10, transition: { duration: 0.075 } }}
            >
                <motion.div className="prompt"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 20, opacity: 0, transition: { duration: 0.1 }}}
                    transition={{ duration: 0.2, delay: 0.15, }}
                >
                    Snap a photo of your passage and drag it here to upload
                </motion.div>
                <motion.div className="file-drop-region"
                    onClick={handleFileInputs}
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    style={{backgroundColor: regionColor, borderColor: regionBorderColor}} 
                    initial={{ opacity: 0 }}
                    animate={errorControls}
                    exit={{ opacity: 0, transition: { duration: 0.1, delay: 0.1, ease:"easeInOut"  }}}
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
                    <motion.span style={{ margin: 0}}
                        initial={{ y: 40 }}
                        animate={{ y: 0 }}
                        exit={{ y: 40, opacity: 0 }}
                        transition={{ 
                            type: "spring", 
                            stiffness: 200, 
                            damping: 17,
                        }} 
                    >
                        <Button id="prev-btn" backgroundColor="#000000cf"
                            onClick={() => dispatch(showStepOne())}
                        >Back</Button>
                    </motion.span>
                    <motion.span style={{ margin: 0}}
                        initial={{ y: 40 }}
                        animate={{ y: 0 }}
                        exit={{ y: 40, opacity: 0 }}
                        transition={{ 
                            type: "spring", 
                            stiffness: 200, 
                            damping: 17,
                            delay: 0.025,
                        }} 
                    >
                        <Button id="next-btn" onClick={validateUserInput}>Verify</Button>
                    </motion.span>
                </div>
            </motion.div>
        </>
    )
}

export default FileInput;