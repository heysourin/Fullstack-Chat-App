import axios from 'axios'
import React, { createContext, useEffect, useState } from 'react'

//Create a React context object called UserContext. This context will be used to share data between components in your application.
export const UserContext = createContext({})

export function UserContextProvider({ children }) {
  const [loggedInUsername, setLoggedInUsername] = useState(null)
  const [id, setId] = useState(null)

  //we are getting this, after verifying jwt is present there
  useEffect(() => {
    axios
      .get('http://localhost:8080/profile', { withCredentials: true })
      .then((response) => {
        // console.log('Response', response.data)
        setId(response.data.userId)
        setLoggedInUsername(response.data.username)
      })
  }, [])

  return (
    <UserContext.Provider
      value={{ loggedInUsername, setLoggedInUsername, id, setId }}
    >
      {children}
    </UserContext.Provider>
  )
}
