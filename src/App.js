import { useState } from 'react';
import './App.css';

function App() {

  const [name, setName] = useState("naveen");
  const [chat, setChat] = useState([
    {name:'naveen',message:'messageOneOhyaa'},
    {name:'abhijeet',message:'messageOneOhyaa'},
    {name:'abhijeet',message:'yup man'}
  ])

  const [msg, setMsg] = useState('');
  const sendchat = ()=>{
    const c = [...chat];
    c.push({name:name,message:msg});
    setChat(c);
    setMsg("")
  }

  return (
    <div className="App">

      <div>
        <input type="text" placeholder='enter your name' onBlur={e=>setName(e.target.value)} />
      </div>

      <h2>User: {name}</h2>
      <div className="chat-container">

      { chat.map( c=><div className={`container ${c.name===name? 'me' :''}`}>
        <p className='chatbox'>
          <strong>{c.name}:</strong>
          <span>{c.message}</span>
        </p>
      </div>)}
      
      <div className='container'>
        <p className='chatbox'>
          <strong>name:</strong>
          <span>Chat Message</span>
        </p>
      </div>

      </div>
      <div className='btn'>
        <input type="text" placeholder='enter you message' value={msg} onInput={e=>setMsg(e.target.value)} />
        <button onClick={e=>sendchat()}>Send</button>
      </div>
    </div>
  );
}

export default App;
