import { Button, FormControl, FormLabel, Input, FormErrorMessage } from '@chakra-ui/react'
import { debounce } from 'lodash'
import { useContext, useState, useEffect, useCallback } from 'react'
import { FcGoogle } from 'react-icons/fc'
import { UserContext } from '../../lib/context'
import { auth, firestore, googleAuthProvider } from '../../lib/firebase'

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
  const [formValue, setFormValue] = useState('')
  const [isValid, setValid] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errMsg, setErrMsg] = useState('sadfasdf')
  const {user} = useContext(UserContext)

  useEffect(async () => {
    await checkUserName(formValue)
  }, [formValue])

  const _checkUserName = async (username) => {
    if (username.length >= 3)
    {
      const ref = firestore.doc(`usernames/${username}`)
      const {exists} = await ref.get()
      console.log(`Firestore read executed`)
      setValid(!exists)
      setErrMsg('${username} already taken')
      setLoading(false)
    }
  }

  const checkUserName = useCallback(debounce(_checkUserName, 500), [formValue])

  const onSubmit = async event => {
    event.preventDefault()

    // Create refs for both documents
    const userDoc = firestore.doc(`users/${user.uid}`)
    const usernameDoc = firestore.doc(`usernames/${formValue}`)

    // Commit batch together
    const batch = firestore.batch()
    batch.set(userDoc, {username: formValue, photoURL: user.photoURL, displayName: user.displayName })
    batch.set(usernameDoc, {uid: user.uid, username: formValue})
    await batch.commit()
    console.log(`${formValue} is added to username collection`)
  }

  const onChange = e => {
    const val = e.target.value.toLowerCase()
    const re = /^(?=[a-zA-Z0-9._]{3,15}$)(?!.*[_.]{2})[^_.].*[^_.]$/;

    if (val.length < 3)
    {
      setFormValue(val)
      setLoading(false)
      setValid(false)
    }

    if (re.test(val))
    {
      setFormValue(val)
      setLoading(true)
      setValid(true)
    }
  }

  return (
    <FormControl id="username" isInvalid={isValid}>
      <FormLabel>User name</FormLabel>
      <Input type="text" placeholder='Select a username' onChange={onChange} />
      {
        !isValid && <FormErrorMessage>{errMsg}</FormErrorMessage>
      }
      <Button
        mt={4}
        colorScheme="teal"
        isLoading={loading}
        disabled={!isValid}
        type="submit"
        onClick={onSubmit}
      >
        Submit
      </Button>
        <pre>
          {JSON.stringify({formValue, isValid, loading, errMsg}, null, 2)}
        </pre>
    </FormControl>
  )
}

const index = () => {
  const { user, username } = useContext(UserContext)

  return user ?
    (!username ? <UsernameForm /> : <SignOutButton />)
    : <SignInButton />
}

export default index