import { useState, useEffect } from 'react'
import { auth, firestore } from './firebase'
import { useAuthState } from 'react-firebase-hooks/auth'

export const useUserData = () => {
  const [user] = useAuthState(auth)
  const [username, setUsername] = useState(null)

  useEffect(() => {
    // turn off realtime subscription when user changes
    let unsubscribe

    // Signed In 
    if (user)
    {
      const ref = firestore.collection('users').doc(user.uid)
      // Latest user data
      unsubscribe = ref.onSnapshot(doc => {
        setUsername(doc.data()?.username)
      })
    }
    else {
      setUsername(null)
    }
    return unsubscribe

  }, [user])

  return {user, username}
}
