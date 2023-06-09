'use client'

import React, { createContext, useState } from 'react'

export const UserContext = createContext()
 
const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState()
  const [gift, setGift] = useState()
  const [recipient, setRecipient] = useState()

  const findUserEmail = (email) => {
    fetch('/api/user', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({email: email}),
    })
    .then(res => res.json())
    .then(data => setUser(data.user))
  }

  const handleOnSetGift = gift => {
    setGift(gift)
  }

  const handleOnSetRecipient = recipient => {
    setRecipient(recipient)
  }
 
  return (
    <UserContext.Provider value={{
        user, 
        findUserEmail,
        gift, handleOnSetGift,
        recipient, handleOnSetRecipient,
      }}>
      {children}
    </UserContext.Provider>
  )
}
 
export default UserContextProvider