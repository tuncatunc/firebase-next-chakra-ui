import { ChakraProvider } from "@chakra-ui/react"
import Navigation from '../components/Navigation'
import { UserContext } from '../lib/context'
import { useUserData } from '../lib/hooks'

function MyApp({ Component, pageProps }) {
  const userData = useUserData()

  return (
    <UserContext.Provider value={userData}>
      <ChakraProvider>
        <Navigation />

        <Component {...pageProps} />
      </ChakraProvider>
    </UserContext.Provider>
  )
}

export default MyApp