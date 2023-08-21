import React, { useState } from 'react'
import axios from "axios";

const Register = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  async function register(e) {
    e.preventDefault()
    const { data } = await axios.post('/register', { username, password })
    console.log(data);
  }

  return (
    <div className="bg-blue-50 h-screen flex items-center">
      <form action="" className="w-64 mx-auto mb-12" onSubmit={register}>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          type="text"
          placeholder="username"
          className="block w-full rounded- p-2 mb-2 border"
        />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="password"
          className="block w-full rounded- p-2 mb-2 border"
        />
        <button className="bg-blue-500 text-white w-full block rounded- p-2 mb-2">
          Register
        </button>
      </form>
    </div>
  )
}

export default Register