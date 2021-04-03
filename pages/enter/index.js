import { Button } from '@chakra-ui/react'
import { useContext } from 'react'
import { FcGoogle } from 'react-icons/fc'
import { UserContext } from '../../lib/context'
import { auth, googleAuthProvider } from '../../lib/firebase'

const SignInButton = () => {
  const signInWithGoogle = async () => {
    await auth.signInWithPopup(googleAuthProvider)
  }
  return (
    <Button colorScheme="gray" leftIcon={<FcGoogle />} onClick={signInWithGoogle}>
      Sign In with Google
    </Button>
  )
}


const SignOutButton = () => {
  return (
    <Button colorScheme="gray" leftIcon={<FcGoogle />} onClick={() => auth.signOut()}>
      Sign Out
    </Button>
  )
}


const UsernameForm = () => {
  return (
    <div>

    </div>
  )
}

const index = () => {
  const {user, username} = useContext(UserContext)

  return user ? 
          (!username ? <UsernameForm /> : <SignOutButton />) 
          : <SignInButton />
}

export default index