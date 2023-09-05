import React, { useState, useContext } from 'react'
import axios from 'axios'
import { UserContext } from './UserContect.jsx'

const RegisterAndLoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [isLoginOrRegister, setIsLoginOrRegister] = useState('register')

  const { setLoggedInUsername, setId } = useContext(UserContext)

  async function handleSubmit(e) {
    e.preventDefault()
    const url = isLoginOrRegister == 'register' ? 'register' : 'login'
    try {
      const { data } = await axios.post(
        `http://localhost:8080/${url}`,//made it dynamic according to login/register, 1h12m
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
      <form action="" className="w-64 mx-auto mb-12" onSubmit={handleSubmit}>
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
          {/* Register / Login button */}
          {isLoginOrRegister == 'register' ? 'Register' : 'Login'}
        </button>
        <div className="text-center mt-2">
          {/* REGISTER/ LOGIN FORM LOGIC */}
          {isLoginOrRegister == 'register' && (
            <div>
              Already a member?{' '}
              <button onClick={() => setIsLoginOrRegister('login')}>
                Log In Here!
              </button>
            </div>
          )}
          {isLoginOrRegister == 'login' && (
            <div>
              Not a member?{' '}
              <button onClick={() => setIsLoginOrRegister('register')}>
                Register Here!!!
              </button>
            </div>
          )}
        </div>
      </form>
    </div>
  )
}

export default RegisterAndLoginForm
