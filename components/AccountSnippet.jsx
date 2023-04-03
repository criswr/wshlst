import { useSession } from 'next-auth/react'
import React from 'react'

const AccountSnippet = () => {
  const { data } = useSession()
  return (
    <span>
        {data ? 'true ' : 'false '}

        Hi, {data?.user?.name}, {data?.user?.email}
    </span>
  )
}

export default AccountSnippet