"use client"
import { useSelf } from '@liveblocks/react/suspense'
import React, { useState } from 'react'

const ShareModal = ({roomId ,collaborators , creatorId , currentUserType} :ShareDocumentDialogProps) => {

  const user = useSelf()

  const [open, setOpen] = useState(false)
  const[loading , setLoading] = useState(false)

  const [email, setEmail] = useState("")
  const [userType , setUserType] = useState("")

  const shareDocumentHandler = async () => {}

  return (
    <div>

    </div>
  )
}

export default ShareModal