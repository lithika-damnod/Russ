import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion"; 
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState, useEffect } from "react"; 

// mui 
import CircularProgress from '@mui/material/CircularProgress';

// reducers 
import { showQAView, showFileInput } from "../features/view/viewSlice"; 
import { setScanResults } from "../features/scan/scanSlice";

// css
import "./TextInput.css"; 

// components 
import Button from "./Button"; 

function Verify() { 
    const dispatch = useDispatch(); 

    // redux states 
    const scannedText = useSelector((state) => state.scan.text); 

    // states 
    const [progressVisibility, setProgressVisibility] = useState(true); // initially true  
     
    useEffect(() => { 
        if(scannedText !== "") { 
            setProgressVisibility(false); 
        }
    }, [scannedText])

    const theme = createTheme({
        palette: {
            primary: {
                main: '#000000',
                darker: '#000000',
            },
        }
    }); 

    return (
        <>
            <div className="text-input-wrapper">
                <div className="prompt">
                    Please review the text extracted from images for accuracy and legibility.
                </div>
                { progressVisibility && (
                    <div className="progress-wrapper">
                        <motion.div
                            initial={{ opacity: 0}} 
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 2 }}
                        >
                            <ThemeProvider theme={theme}>
                                <CircularProgress disableShrink color="primary" size={60} thickness={2} />
                            </ThemeProvider>
                        </motion.div>
                    </div>
                )}
                { !progressVisibility && (
                    <motion.textarea className="input-textarea" defaultValue={scannedText} onChange={e => dispatch(setScanResults(e.target.value))}
                        initial={{ opacity: 0}} 
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                    ></motion.textarea>
                )}
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