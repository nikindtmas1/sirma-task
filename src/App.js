import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import DataTable from 'react-data-table-component';
//import { csv } from 'd3';
//import {moment} from 'moment';

function App() {

  const [columns, setColumns] = useState([]);
  const [data, setData] = useState([]);
 
  // process CSV data
  const processData = dataString => {
    const dataStringLines = dataString.split(/\r\n|\n/);
    const headers = dataStringLines[0].split(/,(?![^"]*"(?:(?:[^"]*"){2})*[^"]*$)/);
 
    const list = [];
    for (let i = 1; i < dataStringLines.length; i++) {
      const row = dataStringLines[i].split(/,(?![^"]*"(?:(?:[^"]*"){2})*[^"]*$)/);
      if (headers && row.length === headers.length) {
        const obj = {};
        for (let j = 0; j < headers.length; j++) {
          let d = row[j];
          if (d.length > 0) {
            if (d[0] === '"')
              d = d.substring(1, d.length - 1);
            if (d[d.length - 1] === '"')
              d = d.substring(d.length - 2, 1);
          }
          if (headers[j]) {
            obj[headers[j]] = d;
          }
        }
 
        // remove the blank rows
        if (Object.values(obj).filter(x => x).length > 0) {
          
          list.push(obj);
        }
      }
    }
 
    // prepare columns list from headers
    const columns = headers.map(c => ({
      name: c,
      selector: c,
    }));
 
    
    for(let i = 0; i < list.length; i++){

      console.log(list[i].ProjectID);
    }

    const sortedList = list.sort(function(a, b) {
      return a.ProjectID - b.ProjectID;
    });
    console.log(sortedList);
    
    const newArr = sortedList.slice(0, 2);

    // for (let index = 0; index < sortedList.length; index++) {
    //   const element = sortedList[index];
    //   console.log(element.ProjectID);
    //   console.log(sortedList[index+1].ProjectID);

    //   if(sortedList[index].ProjectID === sortedList[index+1].ProjectID){
    //     console.log("ok");
        
    //   }
      
    // }
    setData(newArr);
    setColumns(columns);
  }
 
  // handle file upload
  const handleFileUpload = e => {
    const file = e.target.files[0];
    
    const reader = new FileReader();
    reader.onload = (evt) => {
      /* Parse data */
      const bstr = evt.target.result;
      // const wb = XLSX.read(bstr, { type: 'binary' });
      
      // /* Get first worksheet */
      // const wsname = wb.SheetNames[0];
     
      // const ws = wb.Sheets[wsname];
    
      // /* Convert array of arrays */
      // const data = XLSX.utils.sheet_to_csv(ws, { header: 1 });
      
      processData(bstr);
    };
    reader.readAsBinaryString(file);
  }
 
  return (
    <div>
      <h3>Read CSV file</h3>
      <input
        type="file"
        accept=".csv,.xlsx,.xls"
        onChange={handleFileUpload}
      />
      <DataTable
        pagination
        highlightOnHover
        columns={columns}
        data={data}
      />
    </div>
  );
  
  // const [dataFiles, setDataFiles] = useState();
  
  //   const handleFileSelected = (e) => {
      
  //     const files = Array.from(e.target.files)
  //     setDataFiles(files)
  //     console.log("files:", files)
   
  //   }
    
    // if(dataFiles){
    //   console.log("files:",dataFiles)
      
    // }
  


  // return (
  //   <div className="App">
  //     <header className="App-header">
        
        
  //       {/* <form action="/actoni_page.php">
  //         <label for="myfile">Select a file:</label>
  //         <input onChange={handleFileSelected} type="file" id="myfile" name="myfile" />
  //         <br></br>
  //         <input  type="submit" />
  //       </form> */}
  //     </header>
  //   </div>
  // );
}

export default App;
