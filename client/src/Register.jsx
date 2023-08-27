import React, { useState, useContext } from 'react'
import axios from 'axios'
import { UserContext } from './UserContect.jsx'

const Register = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [isLoginOrRegister, setIsLoginOrRegister] = useState('register')

  const { setLoggedInUsername, setId } = useContext(UserContext)

  async function register(e) {
    e.preventDefault()
    try {
      const { data } = await axios.post(
        'http://localhost:8080/register',
        { username, password },
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        },
      )
      setLoggedInUsername(username)
      setId(data.id) // '_id' from mongodb
      console.log(data)
    } catch (error) {
      console.error(error)
    }
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
        <button className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 bg-blue-500 w-full block rounded- p-2">
          {/* Register */}
          {isLoginOrRegister == 'register' ? 'Register' : 'Log in'}
        </button>
        <div className="text-center mt-2">
          Already a member?
          <button onClick={() => setIsLoginOrRegister('login')}>Log In</button>
        </div>
      </form>
    </div>
  )
}

export default Register
