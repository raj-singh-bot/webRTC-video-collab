import { Button } from '@mui/material'
import React from 'react'
import { FcGoogle } from 'react-icons/fc'
import { FirebaseContext, useFirebase } from '../../context/FirebaseContext'

const GoogleLoginButton= () => {
  const { signinWithGooglePopup } = useFirebase()

  return (
    <Button
      onClick={() => signinWithGooglePopup({ redirectTo: `/p2p` })}
      variant="outlined"
      className="cursor-pointer bg-white py-2"
    >
      <FcGoogle className="mx-2" /> Login with Google
    </Button>
  )
}

export default GoogleLoginButton
