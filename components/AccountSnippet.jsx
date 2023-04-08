import { useSession } from 'next-auth/react'
import React from 'react'

const AccountSnippet = () => {
  const { data } = useSession()
  return (
    <span>
        {data ? 
          `Hi, ${data?.user?.name}, ${data?.user?.email}`
        :
          'Please log in '
        }
    </span>
  )
}

export default AccountSnippet