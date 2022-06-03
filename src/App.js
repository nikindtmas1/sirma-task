

function App() {

  
    const handleFileSelected = (e) => {
      const files = Array.from(e.target.files)
      console.log("files:", files)
      console.log(e.currentTarget);
    }
  
    
  

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
