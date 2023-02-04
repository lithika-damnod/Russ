import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import ReactGA from "react-ga"; 

// css 
import './App.css';

// components 
import Hero from "./components/Hero"; 
import StepOne from "./components/StepOne";  
import CommonNav from "./components/CommonNav"; 
import TextInput from "./components/TextInput";
import FileInput from "./components/FileInput";
import Verify from './components/Verify';
import QAView from "./components/QAView";
import { AnimatePresence } from 'framer-motion';


function App() {

  // redux states 
  const heroVisibility = useSelector((state) => state.view.hero); 
  const stepOneVisibility = useSelector((state) => state.view.stepone); 
  const textInputVisibility = useSelector((state) => state.view.textinput); 
  const fileInputVisibility = useSelector((state) => state.view.fileinput); 
  const verifyVisibility = useSelector((state) => state.view.verify); 
  const QAViewVisibility = useSelector((state) => state.view.qaview); 
  
  useEffect(()=> { 
    ReactGA.initialize(process.env.REACT_APP_GOOGLE_ANALYTICS_TRACKING_ID)
    ReactGA.pageview('/')
  }, [])


  return (
    <div className="main-wrapper">

      <AnimatePresence>
        { heroVisibility && <Hero />}
      </AnimatePresence>

      <AnimatePresence>
        { stepOneVisibility && (
          <>
            <CommonNav />
            <StepOne /> 
          </>
        )}
      </AnimatePresence>

      <AnimatePresence>
        { textInputVisibility && (
          <>
            <CommonNav />
            <TextInput />
          </>
        )}
      </AnimatePresence>

      <AnimatePresence>
        { fileInputVisibility && (
          <>
            <CommonNav />
            <FileInput />
          </>
        )}
      </AnimatePresence>

      <AnimatePresence>
        { verifyVisibility && (
          <>
            <CommonNav />
            <Verify />
          </>
        )}
      </AnimatePresence>

      { QAViewVisibility && (
        <>
          <CommonNav />
          <QAView />
        </>
      )}

    </div> 
  );
}

export default App;
