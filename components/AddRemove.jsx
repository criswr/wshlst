'use client'

import { getSession } from "next-auth/react"

    export const addRemove = async (item) => {
        const session = await getSession()
        if (session){
            const favItem = (email, item) => fetch('/api/wishlist', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    item
                }),
            })

            favItem(session.user.email, item)
        }
    }
