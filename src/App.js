import { useSelector } from 'react-redux';

// css 
import './App.css';

// components 
import Hero from "./components/Hero"; 
import StepOne from "./components/StepOne";  
import CommonNav from "./components/CommonNav"; 
import TextInput from "./components/TextInput";
import FileInput from "./components/FileInput";
import QAView from "./components/QAView";

function App() {

  // redux states 
  const heroVisibility = useSelector((state) => state.view.hero); 
  const stepOneVisibility = useSelector((state) => state.view.stepone); 
  const textInputVisibility = useSelector((state) => state.view.textinput); 
  const fileInputVisibility = useSelector((state) => state.view.fileinput); 
  const QAViewVisibility = useSelector((state) => state.view.qaview); 
  
  console.log({
      "hero": heroVisibility, 
      "firststep": stepOneVisibility, 
      "textinput": textInputVisibility ,
      "fileinput": fileInputVisibility, 
      "qaview": QAViewVisibility, 
  }); 

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
