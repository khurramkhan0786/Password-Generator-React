import { useState , useCallback, useEffect ,useRef } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'

function App() {
   const [numberAllowed ,setNumberAllowed] = useState(false)
   const [charAllowed , setCharAllowed] =useState(false)
   const [length , setLength] = useState(8)
   const [password,setPassword] = useState("")
  
   //useRef hook
   const passwordRef = useRef(null)


   //callback hook useCallback(function , Dependencies) -> function ko memorize karta hai zitna ho sake
   const passwordGenerater = useCallback( () =>{
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(numberAllowed) str+="0123456789"
    if(charAllowed)  str+="!@#$%^&*(){}[]:'~`?/.,<>\+-_="
    for(let i=1;i<=length;i++){
        let char = Math.floor(Math.random()*str.length+1)
        pass += str.charAt(char)
    }
       setPassword(pass)
   } , 
  [length, charAllowed, numberAllowed, setPassword])


 
  const copyPasswordToClipboard = useCallback(()=>{
    passwordRef.current?.select();  //for select will shown in copy password 
    passwordRef.current?.setSelectionRange(0, 9);
   window.navigator.clipboard.writeText(password) 
  },[password])



  //useEffect hook -> jab bhi page load hota hai to first time p ye call hota hai
    useEffect(() =>{
    passwordGenerater()
    },[length,numberAllowed, charAllowed, passwordGenerater])



     return (
     <>
     <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4
      py-3 my-8 text-orange-500 bg-gray-800'>
        <h1 className='text-white text-center my-3'>Password Generoter</h1>


      {/*================== this is password input text and copy button ======================== */}
      <div className='flex shadow rounded-lg overflow-hidden mb-4'>
        <input 
        type="text"
        value={password}
        className='outline-none w-full py-1 px-3'
        placeholder='Password'
        readOnly
        ref={passwordRef}
         />
       <button  onClick={copyPasswordToClipboard}
       className='outline-none bg-blue-700 text-white px-3
       py-0.5 shrink-0 
       border-2 border-blue-500  active:bg-green-500'>copy</button>
      </div>

      <div className='flex text-sm gap-x-2'>

 {/* ================ set length ============================== */}

        <div className='flex items-center gap-x-1'>
          <input type="range" min={6} max={100} value={length} 
          className='cursor-pointer' 
          onChange ={(e) =>{setLength(e.target.value)}}/>
          <label htmlFor="">Length: {length}</label>
        </div>
         
{/*========================for number checkbox ===================== */}

        <div className='flex items-center gap-x-1'>
          <input type="checkbox"
          defaultChecked={numberAllowed}
          id="numberInput"
          onChange={()=>{
            setNumberAllowed((prev) => !prev)
          }}
           />
           <label htmlFor="numberInput">Numbers</label>
        </div>
       

{/* /* ======================= for character checkbox ========================== */  }

        <div className='flex items-center gap-x-1'>
          <input type="checkbox"
          defaultChecked={charAllowed}
          id="characterInput"
          onChange={()=>{
            setCharAllowed((prev) => !prev)
          }}
           />
           <label htmlFor="characterInput">Characters</label>
        </div>
      </div>
    </div>
    </>
  )
}

export default App
