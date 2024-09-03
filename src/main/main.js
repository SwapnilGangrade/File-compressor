import React, { useEffect } from 'react'
import { useState} from 'react';
import './main.css'
import HuffmanCoder from '../huffman';

export const Main = () => {
  
  const [inputfile, setinputfile] = useState(null);
  
  const handlefileinput = (event) => {
    setinputfile(event.target.files[0]);  
  }

  // useEffect(()=>{
  //   if(inputfile==null) 
  //   {
  //     alert("Please upload valid file!")
  //   }

  // }, [inputfile]);

  const coder = new HuffmanCoder();
    

  const compress = () => {
    const uploadedFile = inputfile;//because we are uploading 1 file we need that first file uploaded by upload.files function
    if(uploadedFile === null){//if nothing is there in uploadedFile ->result = undefined
        alert("Please upload a valid file!")
        return;
    }
    const fileReader = new FileReader();
    fileReader.readAsText(uploadedFile, "UTF-8");

    fileReader.onload = () => {//will see text file now
        const text = fileReader.result;//will get all the written text in file 
        if(text.length===0){//file is blank
          alert("Empty files are not subject to compression.")
          return;
        }
        let [encoded] = coder.encode(text);//trigger encode function in huffman.js and will recieve the returned values from function(encoded text,tree structure,compression ratio)
        downloadFile(uploadedFile.name.split('.')[0] +'_encoded.txt', encoded);//triggers function downloadFile
    };
    
  }
        


  const decompress = () => {

    const uploadedFile = inputfile;//because we are uploading 1 file we need that first file uploaded by upload.files function
        if(uploadedFile === null){//if nothing is there in uploadedFile ->result = undefined
          alert("Please upload a valid file!")
          return;
        }
        const fileReader = new FileReader();
        fileReader.readAsText(uploadedFile, "UTF-8");

        fileReader.onload = (fileLoadedEvent) => {//will see text file now
            const text = fileReader.result;//will get all the written text in file 
            if(text.length===0){//file is blank
              alert("Empty files are not subject to compression.")
              return;
            }
            let [decoded, tree_structure, info] = coder.decode(text);//trigger decode function in huffman.js and will recieve the returned values from function(decoded text,tree structure,compression ratio)
            downloadFile(uploadedFile.name.split('.')[0] +'_decoded.txt', decoded);//triggers function downloadFile
        };

  }

  const downloadFile = (fileName, data) => {//file name ->firstletter+_encoded.txt    //data is encoded text recieved from encode function
    let a = document.createElement('a');
    a.href = "data:application/octet-stream,"+encodeURIComponent(data);
    a.download = fileName;
    a.click();
  }

  
  const styleheading = {
    marginBottom : "1.6vh",
    marginLeft : "0vw",
    fontSize : "1.2em"
  }

  const list  = {
    marginLeft : "1.8vw"
  }
  
  const fileupload = {
    marginTop : '10px',
    color : 'red'
  }

   


  return (    
    <div class = "container">
    {/* // <div> */}

        <div class="input-box">
            <input class="inputbox" type="file" onChange={handlefileinput} accept=".txt"></input>
        </div>
        
        <div class="step-guide">
            <h3 style={styleheading} >Step-by-Step Guide</h3>
            <ul style = {list}>
                <li> Upload .txt file in the inputbox.</li>
                <li> Click compress or decompress as per need.</li>
                <li> Your file is ready and will get downloaded automatically.</li>
            </ul>
            <h5 style={fileupload}>Small size files may not compress effectively!</h5>
        </div>
        
        <div class="buttons">
            <button style={{marginRight : "2vw"}} class="submitbtn" type="submit" onClick={compress}>Compress</button>
            <button class="submitbtn" type="submit" onClick={decompress}>Decompress</button>
        </div>
  



    </div>

  )
}




