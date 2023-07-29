import { useEffect, useState } from 'react';
import './App.css';
import { getDatabase, ref, push, set, onChildAdded } from "firebase/database";

function App() {

  const [name, setName] = useState("");
  const [chat, setChat] = useState([]);
  const [msg, setMsg] = useState('');

  const db = getDatabase();
  const chatlist = ref(db, "chat");

  useEffect(()=>{
    onChildAdded(chatlist, (data) => {
      setChat(chat=>[...chat,data.val()])
    });
  },[])

  
  const sendchat = ()=>{
    const chatref = push(chatlist);
    set(chatref,{
      name, message:msg
    })

    setMsg("")
  }

  return (
    <div className="App">

      <div>
      {name?null:

        <input type="text" placeholder='enter your name' onBlur={e=>setName(e.target.value)} />
      }
      </div>
      
      {
        name?
      <div> 

      <h2>User: {name}</h2>
      <div className="chat-container">

      { chat.map( c=><div key={c.i} className={`container ${c.name===name? 'me' :''}`}>
        <p className='chatbox'>
          <strong>{c.name}:</strong>
          <span>{c.message}</span>
        </p>
      </div>)}
      
      {/* <div className='container'>
        <p className='chatbox'>
          <strong>name:</strong>
          <span>Chat Message</span>
        </p>
      </div> */}

      </div>
      <div className='btn'>
        <input type="text" placeholder='enter you message' value={msg} onInput={e=>setMsg(e.target.value)} />
        <button onClick={e=>sendchat()}>Send</button>
      </div>
    </div>
      : null }


    </div>
  );
}

export default App;
