import { useCallback, useEffect, useRef, useState } from 'react'
import "./App.css";


function App() {
  const [length,setLength] = useState(8);
  const [numberAllowed,setNumberAllowed] = useState(false);
  const [charAllowed,setCharAllowed] = useState(false);
  const [Password,setPassword] = useState("")
  const passref = useRef(null)
  let PasswordGenrator = useCallback(()=>{
    let pass = ""
    let str = "QWERTYUIOPASDFGHJKLZXCVBNMzxcvbnmasdfghjklqwertyuiop"
    if(numberAllowed) str += "0123456789"
    if(charAllowed) str +="@#$%^&*"

    for(let i=1;i<=length;i++){
      let char = Math.floor(Math.random() * str.length +1)
      pass += str[char];
    }
    setPassword(pass)
    console.log(pass)
  },[length,numberAllowed,charAllowed,setPassword])

  useEffect(()=>{
    PasswordGenrator();
  },[length,numberAllowed,charAllowed,PasswordGenrator])
  
  const copypass = useCallback(()=>{
    passref.current?.select()
    window.navigator.clipboard.writeText(Password)
  },[Password]);
  return (
    <>
      <div className="parent">
      <h1>Strong Password Genrator</h1>
        <div id="inputDiv">
          <input
          id="input"
          type='text'
          value={Password}
          placeholder='password'
          ref={passref}
          />
          <button
          id="btn"
          onClick={copypass}
          >Copy</button>
        </div>
        <div>
          <input
          type="range"
          min={8}
          max={20}
          value={length}
          onChange={(e)=>{
            setLength(e.target.value)
          }}
          />
          
          
          <label>length : {length} </label>
          <input
          type="checkbox"
          defaultChecked={numberAllowed}
          onChange={(e)=>{
            setNumberAllowed((pre)=> !pre);
          }}
          ></input>
          <label>Number</label>
          <input
          type="checkbox"
          defaultChecked={charAllowed}
          onChange={(e)=>{
            setCharAllowed((pre)=> !pre)
          }}
          ></input>
          <label>Character</label>
        </div>
      </div>
    </>
  )
}

export default App
