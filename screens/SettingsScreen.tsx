import { Button, Layout, Text, Toggle } from '@ui-kitten/components'
import { StatusBar } from 'expo-status-bar'
import { useColorScheme, View } from 'react-native'
import { useRecoilState, useSetRecoilState } from 'recoil'

import { currentAddressState, currentPrivateKeyState } from '../states/account'
import { currentThemeState, preferSystemThemeState } from '../states/theme'

export default function SettingsScreen() {
  const [currentTheme, setCurrentTheme] = useRecoilState(currentThemeState)
  const [preferSystemTheme, setPreferSystemTheme] = useRecoilState(
    preferSystemThemeState
  )

  const setCurrentAddress = useSetRecoilState(currentAddressState)
  const setCurrentPrivateKey = useSetRecoilState(currentPrivateKeyState)

  const colorScheme = useColorScheme()

  const onCurrentThemeChange = (isChecked: boolean) => {
    setCurrentTheme(isChecked ? 'dark' : 'light')
  }

  const onPreferSystemThemeChange = (isChecked: boolean) => {
    setPreferSystemTheme(isChecked)
    if (isChecked) {
      setCurrentTheme(colorScheme ?? 'light')
    }
  }

  const onRemoveAccountButtonPressed = () => {
    setCurrentAddress('')
    setCurrentPrivateKey(new Uint8Array())
    console.log('Removed')
  }

  return (
    <Layout style={{ flex: 1, alignItems: 'center' }}>
      <StatusBar style={currentTheme === 'dark' ? 'light' : 'dark'} />
      <Text category="h1">SETTINGS</Text>
      <View>
        <Toggle
          checked={preferSystemTheme}
          onChange={onPreferSystemThemeChange}
        >
          Prefer system theme
        </Toggle>
        <Toggle
          checked={currentTheme === 'dark'}
          onChange={onCurrentThemeChange}
          disabled={preferSystemTheme}
        >
          Dark mode
        </Toggle>
        <Button onPress={onRemoveAccountButtonPressed} status="danger">
          Remove Account
        </Button>
      </View>
    </Layout>
  )
}
