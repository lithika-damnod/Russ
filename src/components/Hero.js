import { motion } from "framer-motion"; 
import { useDispatch } from "react-redux";
import ReactGA from "react-ga"; 
import "./Hero.css"; 

// mui icons 
import CallMadeRoundedIcon from '@mui/icons-material/CallMadeRounded';

// reducers 
import { showStepOne } from "../features/view/viewSlice"; 

function Hero() { 

    const dispatch = useDispatch(); 

    // event handlers
    const handleTryButtonClick = () => { 
        // TODO: disable pointer events for the button 
        
        ReactGA.event({
            category: 'Button', 
            action: 'Clicked on Try It Button'
        })

        dispatch(showStepOne()); // change view 
    }

    return (
        <>
            <motion.div className="hero-wrapper"
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10, transition: { duration: 0.13 } }}
            >
                <div className="hero-container">
                    <motion.div className="headline"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }} 
                        transition={{ 
                            duration: 0.5, 
                            delay: 0.2, 
                        }}
                    >
                        Unlock <span className="bold-head">secrets</span> of any text 
                    </motion.div>
                    <motion.div className="try-it-btn-wrapper"
                        initial={{ y: 50 }}
                        animate={{ y: 0 }}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        transition={{ 
                            type: "spring", 
                            stiffness: 200, 
                            damping: 17,
                        }} 
                        onClick={handleTryButtonClick}
                    >
                        <span className="text">
                            Try It
                        </span>
                        <motion.div
                            animate={{ 
                                y: [1, -2.5, 1] 
                            }} 
                            transition={{
                                duration: 0.5, 
                                ease: "easeInOut", 
                                repeat: Infinity, 
                                repeatDelay: 0.6, 
                            }} 
                            className="arrow-icon"
                        >
                            <CallMadeRoundedIcon fontSize="large" style={{color: "white"}} />
                        </motion.div>
                    </motion.div>
                </div>
            </motion.div>
        </>
    )
}

export default Hero; 
