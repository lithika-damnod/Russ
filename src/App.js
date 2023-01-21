import {useState} from "react"; 
// css 
import './App.css';
// components 
import Hero from "./components/Hero"; 
import StepOne from "./components/StepOne";  
import CommonNav from "./components/CommonNav"; 
import TextInput from './components/TextInput';
import FileInput from './components/FileInput';
import QAView from './components/QAView';

function App() {
  // veiw states 
  const [heroVisibility, setHeroVisibility] = useState(true);  // initially true 
  const [stepOneVisibility, setStepOneVisibility] = useState(false);   
  const [textInputVisibility, setTextInputVisibility] = useState(false);   
  const [fileInputVisibility, setFileInputVisibility] = useState(false);   
  const [QAViewVisibility, setQAViewVisibility] = useState(false);   

  return (
    <div className="main-wrapper">

      { heroVisibility && <Hero />}

      { stepOneVisibility && (
        <>
          <CommonNav />
          <StepOne />
        </>
      )}

      { textInputVisibility && (
        <>
          <CommonNav />
          <TextInput />
        </>
      )}

      { fileInputVisibility && (
        <>
          <CommonNav />
          <FileInput />
        </>
      )}

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
