import { motion, useAnimationControls } from "framer-motion"; 
import "./Hero.css"; 

function Hero() { 
    return (
        <div className="hero-container">
            <motion.h3 className="hero-title"
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 0.8,
                  delay: 0.3,
                  ease: [0, 0.71, 0.2, 1.01]
                }} 
            >
                Russ
            </motion.h3>
            <motion.h5 className="hero-description"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }} 
                transition={{ 
                    duration: 0.5, 
                    delay: 0.3, 
                }}
            >
                Get instant answers to your questions about any text with Passage Q&A - an AI-powered reading companion that analyzes and summarizes any text you provide and answer questions based on the information in the passage
            </motion.h5>
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
                <motion.span className="material-symbols-rounded"
                    animate={{ 
                        y: [1, -2.5, 1] 
                    }} 
                    transition={{
                        duration: 0.5, 
                        ease: "easeInOut", 
                        repeat: Infinity, 
                        repeatDelay: 0.6, 
                    }}
                >
                    call_made
                </motion.span>
            </motion.div>
        </div>
    )
}

export default Hero; 