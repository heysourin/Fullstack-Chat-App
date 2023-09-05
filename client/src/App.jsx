import { UserContextProvider } from './UserContect'
// import { useContext } from 'react'
import Routes from './Routes'
function App() {
  // axios.defaults.baseURL = 'http://localhost:8080'
  // axios.defaults.withCredentials = true

  // const axiosInstance = axios.create({
  //   baseURL: 'http://localhost:8080',
  //   withCredentials: true,
  // })
  // const { loggedInUsername } = useContext(UserContext)
  // console.log(loggedInUsername)
  return (
    <>
      <UserContextProvider>
        <Routes />
      </UserContextProvider>
    </>
  )
}

export default App
