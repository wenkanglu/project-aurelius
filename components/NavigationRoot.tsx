import { NavigationContainer } from '@react-navigation/native'
import { useTheme } from '@ui-kitten/components'
import * as SecureStore from 'expo-secure-store'
import { useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useRecoilState, useRecoilValue } from 'recoil'

import LoginScreen from '../screens/LoginScreen'
import { currentAddressState, currentPrivateKeyState } from '../states/account'
import { currentThemeState } from '../states/theme'
import TabNavigation from './TabNavigation'

export default function NavigationRoot() {
  const theme = useTheme()

  const currentTheme = useRecoilValue(currentThemeState)
  const [currentAddress, setCurrentAddress] =
    useRecoilState(currentAddressState)
  const [currentPrivateKey, setCurrentPrivateKey] = useRecoilState(
    currentPrivateKeyState
  )

  useEffect(() => {
    const checkLogin = async () => {
      const address = await SecureStore.getItemAsync('address') // TODO: set these as string constants
      const privateKey = await SecureStore.getItemAsync('privateKey')

      if (address && privateKey) {
        const sk = new Uint8Array(
          privateKey.split(',').map((str) => {
            return Number(str)
          })
        )
        setCurrentAddress(address)
        setCurrentPrivateKey(sk)
      }
    }

    checkLogin()
  }, [])

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor:
          currentTheme === 'dark'
            ? theme['color-basic-800']
            : theme['color-basic-100'],
      }}
    >
      <NavigationContainer>
        {currentAddress === '' && currentPrivateKey.length === 0 ? (
          <LoginScreen />
        ) : (
          <TabNavigation />
        )}
      </NavigationContainer>
    </SafeAreaView>
  )
}
