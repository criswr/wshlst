import { useSession } from 'next-auth/react'
import React from 'react'

const AccountSnippet = () => {
  const { data } = useSession()
  return (
    <span>
        {data ? 'true ' : 'false '}

        <img
            src={data?.user?.image}
            height="25"
            width="25"
            alt="user image"
        />
        Hi, {data?.user?.name}, {data?.user?.email}
    </span>
  )
}

export default AccountSnippet