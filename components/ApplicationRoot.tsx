import * as eva from '@eva-design/eva'
import { ApplicationProvider } from '@ui-kitten/components'
import * as SecureStore from 'expo-secure-store'
import { useEffect } from 'react'
import { useColorScheme } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { useRecoilState, useSetRecoilState } from 'recoil'

import { currentThemeState, preferSystemThemeState } from '../states/theme'
import NavigationRoot from './NavigationRoot'

export default function ApplicationRoot() {
  const [currentTheme, setCurrentTheme] = useRecoilState(currentThemeState)
  const setPreferSystemTheme = useSetRecoilState(preferSystemThemeState)
  const colorScheme = useColorScheme()

  useEffect(() => {
    const setAppTheme = async () => {
      const preferSystemTheme = await SecureStore.getItemAsync(
        'preferSystemTheme'
      ) // TODO: set these as string constants
      const theme = await SecureStore.getItemAsync('theme')

      if (!preferSystemTheme || preferSystemTheme === 'true') {
        setCurrentTheme(colorScheme ?? 'light')
      } else {
        setPreferSystemTheme(false)
        setCurrentTheme(theme ? theme : 'light')
      }
    }

    setAppTheme()
  }, [])

  return (
    <ApplicationProvider
      {...eva}
      theme={currentTheme === 'light' ? eva.light : eva.dark}
    >
      <SafeAreaProvider>
        <NavigationRoot />
      </SafeAreaProvider>
    </ApplicationProvider>
  )
}
