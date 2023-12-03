import { useState, useCallback, useEffect, useRef } from "react";

function App() {
  const [length, setlenght] = useState(8);
  const [numberAllowed, setnumberAllowed] = useState(false);
  const [characterAllowed, setcharacterAllowed] = useState(false);
  const [Password, setpassword] = useState("");

  // userRef
  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let string = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) string += "0123456789";
    if (characterAllowed) string += "!@#$%^&*_-+=~?";

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * string.length);
      pass += string.charAt(char);
    }

    setpassword(pass);
  }, [length, numberAllowed, characterAllowed, setpassword]);

  const copyPasswordToClipBoard = useCallback (() =>{
    console.log(passwordRef.current.value)
    passwordRef.current?.select()
    // if current is not null select function will run
    passwordRef.current?.setSelectionRange(0, 20)
    // select character  for 0 to 20 only
    window.navigator.clipboard.writeText(Password)
  },[Password])

  useEffect(() => {
    // the code we want to exexute


    passwordGenerator();

    // optional return function
  }, [length, numberAllowed, characterAllowed, passwordGenerator]);// dependencies

  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 text-orange-500 bg-gray-700">
        <h1 className="text-white text-center my-3">password generator</h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input
            type="text"
            value={Password}
            className="outline-none w-full py-1 px-3"
            placeholder="password"
            readOnly
            ref={passwordRef}
          />
          <button 
          className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0"
          onClick={copyPasswordToClipBoard}
          >
            copy
          </button>
        </div>
        <div className="flex text-sm gap-x-2">
          <div className="flex items-center gap-x-1">
            <input
              type="range"
              min={6}
              max={100}
              value={length}
              className="cursor-pointer"
              onChange={(e) => {
                setlenght(e.target.value);
              }}
            />
            <label>Length: {length}</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={numberAllowed}
              id="numberInput"
              onChange={() => setnumberAllowed((prev) => !prev)}
            />
            <label htmlFor="numberInput">Numbers</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={characterAllowed}
              id="characterInput"
              onChange={() => setcharacterAllowed((prev) => !prev)}
            />
            <label htmlFor="characterInput">Character</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
