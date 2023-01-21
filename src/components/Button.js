import { motion } from "framer-motion"; 

// css
import "./Button.css"; 

function Button({children, onClick, id=null, backgroundColor="black", color="white", borderRadius="8px", fontSize="1.3rem", height="auto", width="auto"}) { 
    return (
        <>
            <motion.div 
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.9 }}
                transition={{ 
                    type: "spring", 
                    stiffness: 200, 
                    damping: 17,
                }} 
                onClick={onClick}
                className="custom-btn" id={id} style={{ backgroundColor: backgroundColor, color: color, borderRadius: borderRadius, fontSize: fontSize, height: height, width: width}}>
                    {children}
            </motion.div>
        </>
    ); 
}

export default Button; 