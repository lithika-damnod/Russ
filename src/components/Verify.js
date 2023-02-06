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
            <motion.div className="text-input-wrapper"
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10, transition: { duration: 0.075 } }}
            >
                <motion.div className="prompt"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 20, opacity: 0, transition: { duration: 0.1 }}}
                    transition={{ duration: 0.2, delay: 0.15, }}
                >
                    Please review the text extracted from images for accuracy and legibility.
                </motion.div>
                { progressVisibility && (
                    <motion.div className="progress-wrapper"
                        initial={{ opacity: 0 }}
                        animate={{
                            opacity: 1, 
                            transition: {
                                duration: 0.1,
                                delay: 0.2, 
                                ease:"easeInOut",
                            }
                         }}
                        exit={{ opacity: 0, transition: { duration: 0.1 }}}
                    >
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
                    </motion.div>
                )}
                { !progressVisibility && (
                    <motion.textarea className="input-textarea" defaultValue={scannedText} onChange={e => dispatch(setScanResults(e.target.value))}
                        initial={{ opacity: 0}} 
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0, transition: { duration: 0.1 }}}
                        transition={{ duration: 0.5 }}
                    ></motion.textarea>
                )}
                <div className="position-controllers">
                    <motion.span style={{ margin: 0 }}
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
                            onClick={() => dispatch(showFileInput())}
                        >Back</Button>
                    </motion.span>
                    <motion.span style={{ margin: 0 }}
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
                        <Button id="next-btn"
                            onClick={() => dispatch(showQAView())}
                        >Next</Button>
                    </motion.span>
                </div>
            </motion.div>
        </>
    )
}

export default Verify;