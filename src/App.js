import { useEffect, useState } from 'react';
import './App.css';
import { getDatabase, ref, push, set, onChildAdded } from "firebase/database";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";

function App() {

  const provider = new GoogleAuthProvider();
  const auth = getAuth();

  const googleLogin = () =>{

    signInWithPopup(auth, provider)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;
    setName({user:result.user.displayName, email:result.user.email })
    // IdP data available using getAdditionalUserInfo(result)
    // ...
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
  });
}
  
  // =========auth completed=========

  const [user, setName] = useState("");
  const [chat, setChat] = useState([]);
  const [msg, setMsg] = useState('');

  const db = getDatabase();
  const chatlist = ref(db, "chat");

  const updateHeight = ()=>{
    const el = document.getElementById("chat");
    if(el){
      el.scrollTop = el.scrollHeight;
    }
  }

  useEffect(()=>{
    onChildAdded(chatlist, (data) => {
      setChat(chat=>[...chat,data.val()])
      setTimeout(() => {
        updateHeight();
      }, 100);
    });
  },[])

  
  const sendchat = ()=>{
    const chatref = push(chatlist);
    set(chatref,{
      user, message:msg
    })

    setMsg("")
  }

  return (
    <div className="App">

      {user.email?null:
      <div className='signIn'>
        <h1>Chat App</h1>
        <button onClick={e=>{googleLogin()}} className='signgo'> <span>Sign In With Google</span>  
          <img src="https://static.vecteezy.com/system/resources/previews/012/871/371/original/google-search-icon-google-product-illustration-free-png.png" alt="google logo" width="30px" />
         </button>
      </div>
      }
      
      {
        user?
      <div> 

      <h2 id="userName">User: {user.user}</h2>
      <div id="chat" className="chat-container">

      { chat.map( c=><div key={c.i} className={`container ${c.user.email===user.email? 'me' :''}`}>
        <p className='chatbox'>
          <strong>{c.user.user}:</strong>
          <span>{c.message}</span>
        </p>
      </div>)}

      </div>
      <div className='btn'>
        <input type="text" placeholder='enter you message' required value={msg} onInput={e=>setMsg(e.target.value)} />
        <button onClick={e=>sendchat()}>Send</button>
      </div>
    </div>
      : null }


    </div>
  );
}

export default App;
