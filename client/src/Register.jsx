import React, { useState, useContext } from 'react'
import axios from 'axios'
import { UserContext } from './UserContect.jsx'

const Register = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const { setLoggedInUsername, setId } = useContext(UserContext)

  async function register(e) {
    e.preventDefault()
    try {
      const { data } = await axios.post(
        'http://localhost:8080/register',
        { username, password },
        {
          headers: { 'Content-Type': 'application/json' },
        },
      )
      setLoggedInUsername(username)
      setId(data.id)
      console.log(data)
    } catch (error) {
      console.error(error)
    }
  }
 
  // async function register(e) {
  //   e.preventDefault()
  //   try {
  //     const response = await fetch('http://localhost:8080/register', {
  //       method: 'POST',
  //       body: JSON.stringify({ username, password }),
  //       headers: { 'Content-Type': 'application/json' },
  //     })
  //     console.log(response)
  //   } catch (error) {
  //     alert('Failed to register.', error)
  //   }
  // }
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
