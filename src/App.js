import { useFormik } from 'formik';
import './App.css';
import { useEffect, useState } from 'react';
import ChatRoom from './features/Chat/ChatRoom';
import Test from './features/Chat/Test';

const URL = 'ws://140.238.54.136:8080/chat/chat';

function App() {
 
  	const [messages, setMessages] = useState([]);
  	const [ws, setWs] = useState(new WebSocket(URL));  			

  	useEffect(() => {
	    ws.onopen = () => {
	      console.log('WebSocket Connected');
	    }

	    ws.onmessage = (e) => {
	      const message = JSON.parse(e.data);
		  console.log("e", e);
	      setMessages([message, ...messages]);
		  if (message.type === "login") {
			if (message.success) {
			  console.log("Login success");
			} else {
			  console.log("Login failed");
			}
		  }
	    }

	    return () => {
	      ws.onclose = () => {
	        console.log('WebSocket Disconnected');
	        setWs(new WebSocket(URL));
	      }
	    }
  	}, [ws.onmessage, ws.onopen, ws.onclose, messages]);
	  const formik = useFormik({
		initialValues:{
			user:"",
			pass:""
		},
		validateOnChange: true,
		onSubmit: async (values)=>{
			console.log(values);
		}
	})
  return (
    <div className="App">
		<form onSubmit={formik.handleSubmit}>
			<input placeholder='user' name='user' onChange={formik.handleChange}></input>
      		<input placeholder='pass' name='pass' onChange={formik.handleChange}></input>
			<button type='submit'>submit</button>
		</form>
      
	  <p>CHAT</p>
	  <ChatRoom></ChatRoom>

	  <b>Test</b>
	  <Test></Test>
      
    </div>
  );
}

export default App;


// const [messages, setMessages] = useState([]);
//   const [ws, setWs] = useState(new WebSocket(URL));

//   useEffect(() => {
//     ws.onopen = () => {
//       console.log('WebSocket Connected');
//     }

//     ws.onmessage = (e) => {
//       const message = JSON.parse(e.data);
//       console.log("e", e);
//       setMessages([message, ...messages]);
//       if (message.type === "login") {
//         if (message.success) {
//           console.log("Login success");
//         } else {
//           console.log("Login failed");
//         }
//       }
//     }

//     return () => {
//       ws.onclose = () => {
//         console.log('WebSocket Disconnected');
//         setWs(new WebSocket(URL));
//       }
//     }
//   }, [ws.onmessage, ws.onopen, ws.onclose, messages]);

//   return (
//     <div className="App">
//       <Test ws={ws} />
//     </div>