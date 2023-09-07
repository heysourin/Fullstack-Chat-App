import React, { useEffect, useState } from 'react'

const Chat = () => {
  const [ws, setWs] = useState(null)
  const [onlinePeople, setOnlinePeople] = useState([])

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8080') //will connect to the wss code on the backend
    setWs(ws)
    // console.log(ws);
    ws.addEventListener('message', handleMessage)
  }, [])

  function showOnlinePeople(peopleArray) {
    const people = {}
    peopleArray.forEach(({ userId, username }) => {
      people[userId] = username
    })
    setOnlinePeople(people)
    console.log(people)
  }
  
  function handleMessage(ev) {
    const messageData = JSON.parse(ev.data)
    if ('online' in messageData) {
      showOnlinePeople(messageData.online)
    }
  }

  return (
    <div className="flex h-screen">
      <div className="bg-blue-100 w-1/3"></div>
      <div className=" flex flex-col bg-blue-300 w-2/3 p-2">
        <div className="flex-grow">Messages with selscted person</div>
        <div className="flex gap-1">
          <input
            type="text"
            className="bg-white border p-2 rounded-sm flex-grow"
            placeholder="Type your message here"
          />
          <button className="bg-blue-500 p-2 text-white rounded-sm">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Chat
