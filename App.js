import React, { useState } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";

function App() {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "👋 Hi! What would you like to have today?" }
  ]);
  const [input, setInput] = useState("");

  const handleSend = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { sender: "user", text: input }];
    setMessages(newMessages);
    setInput("");

    try {
      const res = await axios.post("http://127.0.0.1:5000/chat", {
        message: input
      });

      const botMessage = { sender: "bot", text: res.data.response };
      setMessages([...newMessages, botMessage]);
    } catch (error) {
      console.error("Error calling backend:", error);
      const botMessage = { sender: "bot", text: "⚠️ Error: Could not reach server." };
      setMessages([...newMessages, botMessage]);
    }
  };

  return (
    <div style={{ maxWidth: "600px", margin: "40px auto", fontFamily: "Arial" }}>
      <h2 style={{ textAlign: "center" }}>🍲 Recipe Chatbot</h2>
      <div
        style={{
          border: "1px solid #ddd",
          padding: "10px",
          height: "400px",
          overflowY: "auto",
          borderRadius: "8px",
          marginBottom: "10px",
          background: "#f9f9f9"
        }}
      >
        {messages.map((msg, i) => (
          <div
            key={i}
            style={{
              textAlign: msg.sender === "user" ? "right" : "left",
              margin: "8px 0"
            }}
          >
            <div
              style={{
                display: "inline-block",
                padding: "8px 12px",
                borderRadius: "12px",
                background: msg.sender === "user" ? "#007bff" : "#e5e5ea",
                color: msg.sender === "user" ? "white" : "black",
                maxWidth: "80%",
                wordBreak: "break-word"
              }}
            >
              {msg.sender === "bot" ? (
                <ReactMarkdown>{msg.text}</ReactMarkdown>
              ) : (
                msg.text
              )}
            </div>
          </div>
        ))}
      </div>
      <div style={{ display: "flex" }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          style={{ flex: 1, padding: "10px", borderRadius: "6px", border: "1px solid #ddd" }}
        />
        <button
          onClick={handleSend}
          style={{
            marginLeft: "8px",
            padding: "10px 16px",
            background: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "6px"
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default App;





























// import React, { useState } from "react";
// import axios from "axios";
// import ReactMarkdown from "react-markdown";

// function App() {
//   const [messages, setMessages] = useState([
//     { sender: "bot", text: "👋 Hi! What would you like to have today?" }
//   ]);
//   const [input, setInput] = useState("");

// const handleSend = async () => {
//   if (!input.trim()) return;

//   const newMessages = [...messages, { sender: "user", text: input }];
//   setMessages(newMessages);
//   setInput("");

//   try {
//     const res = await axios.post("http://127.0.0.1:5000/chat", {
//       message: input
//     });

//     const botMessage = { sender: "bot", text: res.data.response };
//     setMessages([...newMessages, botMessage]);
//   } catch (error) {
//     console.error("Error calling backend:", error);
//     const botMessage = { sender: "bot", text: "⚠️ Error: Could not reach server." };
//     setMessages([...newMessages, botMessage]);
//   }
// };


//   return (
//     <div style={{ maxWidth: "600px", margin: "40px auto", fontFamily: "Arial" }}>
//       <h2 style={{ textAlign: "center" }}>🍲 Recipe Chatbot</h2>
//       <div
//         style={{
//           border: "1px solid #ddd",
//           padding: "10px",
//           height: "400px",
//           overflowY: "auto",
//           borderRadius: "8px",
//           marginBottom: "10px",
//           background: "#f9f9f9"
//         }}
//       >
//         {messages.map((msg, i) => (
//           <div
//             key={i}
//             style={{
//               textAlign: msg.sender === "user" ? "right" : "left",
//               margin: "8px 0"
//             }}
//           >
//             <span
//               style={{
//                 display: "inline-block",
//                 padding: "8px 12px",
//                 borderRadius: "12px",
//                 background: msg.sender === "user" ? "#007bff" : "#e5e5ea",
//                 color: msg.sender === "user" ? "white" : "black"
//               }}
//             >
//               {msg.text}
//             </span>
//           </div>
//         ))}
//       </div>
//       <div style={{ display: "flex" }}>
//         <input
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//           placeholder="Type your message..."
//           style={{ flex: 1, padding: "10px", borderRadius: "6px", border: "1px solid #ddd" }}
//         />
//         <button
//           onClick={handleSend}
//           style={{
//             marginLeft: "8px",
//             padding: "10px 16px",
//             background: "#007bff",
//             color: "white",
//             border: "none",
//             borderRadius: "6px"
//           }}
//         >
//           Send
//         </button>
//       </div>
//     </div>
//   );
// }

// export default App;
