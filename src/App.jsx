import React, { useState, useEffect, useCallback, useRef } from 'react';

import { ToastContainer, toast } from 'react-toastify';

function App() {
  
  const [length,setLength] = useState(8)
  const [number, setNumber] = useState(false)
  const [char, setChar] = useState(false)
  const [password, setPassword] = useState('')

  const passwordRef = useRef(null)

  const increment = useCallback(() => {

      let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
      let specialChar = '@$%&'
      let num = '1234567890'

      if (number) str += num
      if (char) str += specialChar 
  
      let finalPassword = ''

      for (let i = 0; i < Number(length); i++) {
        finalPassword += str[Math.floor(Math.random() * str.length)];
      }
      setPassword(finalPassword);
  }, [length, number, char]);

  const copyToClipBoard  = useCallback(()=>{
    passwordRef.current?.select()
    window.navigator.clipboard.writeText(password)
    toast('Copied!', {
      position: "top-center",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
    }, []);
  },[password])

  useEffect(()=>{
    increment()
  },[increment])

  return (
    <>
    <div className="h-screen w-full bg-gradient-to-r from-indigo-500 to-purple-500 flex justify-center items-center">
    <ToastContainer />
      <div className="bg-white p-10 rounded-lg shadow-lg max-w-md">
        <h1 className="text-4xl font-bold">Password Generator</h1>
        <p className="text-xl">Generate a strong and unique password</p>
        <div className="flex flex-row items-center mt-4">
          <input
            type="text"
            id="output"
            className="focus:outline-none bg-gray-200 px-2 py-1 rounded-md w-full"
            readOnly
            value={password} 
            ref={passwordRef}
          />
          <button
            className="bg-indigo-500 text-white px-4 py-2 rounded-md ml-2 cursor-pointer"
            onClick={copyToClipBoard}
          >
            Copy
          </button>
        </div>
        <form className="flex flex-col mt-4">
          <div className="flex flex-col items-center mb-4">
            <div className="flex flex-row justify-between w-full">
            <label htmlFor="length" className="w-20">Length:</label>
            <p id="lengthValue">{length}</p>
            </div>
            <input type="range" id="length" className="border-2 px-2 py-1 rounded-md w-full"
             onChange={(e)=>{setLength(e.target.value)}}
             min={8}
             value={length}
             max={20}
             />
          </div>

          <div className="flex flex-row items-center mb-4">
            <input type="checkbox" id="number" className="mr-2"
             onChange={()=>{setNumber((pre)=> !pre)}} 
             />

            <label htmlFor="number">Include numbers</label>
          </div>
      
          <div className="flex flex-row items-center mb-4">
            <input type="checkbox" id="specialChar" className="mr-2"
            onChange={()=>{setChar((pre)=> !pre)}} 
            />
            <label htmlFor="specialChar">Include special characters</label>
          </div>
        </form>
      </div>
    </div>
    </>
  );
}

export default App;
