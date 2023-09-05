import React from 'react'
import Chat from './Chat'
import RegisterAndLoginForm from './RegisterAndLoginForm'
import { UserContext, UserContextProvider } from './UserContect'
import { useContext } from 'react'

const Routes = () => {
  const { loggedInUsername, id } = useContext(UserContext)
  // console.log(loggedInUsername)

  if (loggedInUsername) {
    // return 'loggedin as ' + loggedInUsername
    return(
      <>
      <Chat/>
      </>
    )
  }

  return (
    <>
      <RegisterAndLoginForm />
    </>
  )
}

export default Routes
