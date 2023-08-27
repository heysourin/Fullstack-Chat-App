import React from 'react'
import Register from './Register'
import { UserContext, UserContextProvider } from './UserContect'
import { useContext } from 'react'

const Routes = () => {
  const { loggedInUsername, id } = useContext(UserContext)
  // console.log(loggedInUsername)

  if (loggedInUsername) {
    return 'loggedin!!'
  }

  return(
    <>
    <Register/>
    </>
  )
}

export default Routes
