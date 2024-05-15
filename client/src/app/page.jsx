import { auth } from '@/auth'
import React from 'react'

export default async function page() {
  const session = await auth();
  const user = session?.user

  console.log("id is ", user.id);
  return (
    <div>
      THis is a LinktrEe CloNE
    </div>
  )
}
