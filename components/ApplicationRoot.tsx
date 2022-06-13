import * as eva from '@eva-design/eva'
import { ApplicationProvider } from '@ui-kitten/components'
import * as SecureStore from 'expo-secure-store'
import { useEffect } from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { useRecoilState } from 'recoil'

import { currentThemeState } from '../states/theme'
import NavigationRoot from './NavigationRoot'

export default function ApplicationRoot() {
  const [theme, setTheme] = useRecoilState(currentThemeState)

  useEffect(() => {
    const getTheme = async () => {
      const result = await SecureStore.getItemAsync('theme')
      if (result && result === 'dark') {
        setTheme(result)
      } else {
        setTheme('light')
      }
    }

    getTheme()
  }, [])

  return (
    <ApplicationProvider
      {...eva}
      theme={theme === 'light' ? eva.light : eva.dark}
    >
      <SafeAreaProvider>
        <NavigationRoot />
      </SafeAreaProvider>
    </ApplicationProvider>
  )
}
