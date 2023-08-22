import axios from 'axios'
import Register from './Register'
import { UserContextProvider } from './UserContect'

function App() {
  // axios.defaults.baseURL = 'http://localhost:8080'
  // axios.defaults.withCredentials = true

  // const axiosInstance = axios.create({
  //   baseURL: 'http://localhost:8080',
  //   withCredentials: true,
  // })

  return (
    <>
      <UserContextProvider>
        <Register />
      </UserContextProvider>
    </>
  )
}

export default App
