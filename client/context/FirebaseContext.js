import React, { createContext, useCallback, useContext, useEffect, useState } from 'react'
import {GoogleAuthProvider, signInWithPopup, onAuthStateChanged, User} from 'firebase/auth'
import {auth} from '../firebase/index'
import { useRouter } from 'next/router'

const FirebaseContext = createContext(null)

export const useFirebase = () => {
    const state = useContext(FirebaseContext)
    if (state !== null && !state)
      throw new Error('Wrap useFirebase hook inside FirebaseProvider')
    return state
}

const googleAuthProvider = new GoogleAuthProvider()

export const FirebaseProvider= (props) => {
    const router = useRouter()
    const [currentUser, setCurrentUser] = useState(null)
  
    const handleOnAuthStateChange = useCallback(
      (e) => setCurrentUser(e),
      []
    )
  
    const signinWithGooglePopup = useCallback(
      async (options) => {
        const result = await signInWithPopup(auth, googleAuthProvider)
        console.log(result)
        if (result.user) {
          if (options && options.redirectTo)
            return router.replace(options.redirectTo)
        }
        return result
      },
      []
    )
  
    useEffect(() => {
      const unsubscribeAuthStateChange = onAuthStateChanged(
        auth,
        handleOnAuthStateChange
      )
      return () => {
        unsubscribeAuthStateChange()
      }
    }, [])
  
    return (
      <FirebaseContext.Provider value={{ signinWithGooglePopup, currentUser }}>
        {props.children}
      </FirebaseContext.Provider>
    )
  }
  