import axios from 'axios'
import React, { createContext, useEffect, useState } from 'react'

export const UserContext = createContext({})

export function UserContextProvider({ children }) {
  const [loggedInUsername, setLoggedInUsername] = useState(null)
  const [id, setId] = useState(null)

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
//--------------------------------------------------------------------------------------------------------------------------------//
//  const{setLoggedInUsername, setId}=useContext(UserContext)

/**
  //!This line imports the necessary modules from the React library. It imports createContext and useState from React.
import React, { createContext, useState } from 'react'

//!This line exports a context object named UserContext. This context object will be used to share user-related data and functions across components.

//!The createContext({}) function creates the context with an initial empty object as its default value. This default value will be used when a component consuming the context is not wrapped in the corresponding Provider.
export const UserContext = createContext({})
 */
