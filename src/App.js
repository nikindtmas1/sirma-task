import {useState, useEffect} from "react";
import { csv } from 'd3';
//import {moment} from 'moment';

function App() {

  useEffect(() => {
    csv('dataOne.csv')
    .then(data => {console.log(data)})
  },[]);
  
  const [dataFiles, setDataFiles] = useState();
  
    const handleFileSelected = (e) => {
      
      const files = Array.from(e.target.files)
      setDataFiles(files)
      //console.log("files:", files)
   
    }
    
    if(dataFiles){
      console.log("files:",dataFiles)
      
    }
  
    // useEffect(() => {
    //   csv('data.csv')
    //   .then(data => console.log(data))
    // },[]);

  return (
    <div className="App">
      <header className="App-header">
        
        <form action="/actoni_page.php">
          <label for="myfile">Select a file:</label>
          <input onChange={handleFileSelected} type="file" id="myfile" name="myfile" />
          <br></br>
          <input  type="submit" />
        </form>
      </header>
    </div>
  );
}

export default App;
