import { Text, Toggle, useTheme } from '@ui-kitten/components'
import { StatusBar } from 'expo-status-bar'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useRecoilState } from 'recoil'

import { currentThemeState } from '../states/theme'

export default function SettingsScreen() {
  const theme = useTheme()
  const [currentTheme, setCurrentTheme] = useRecoilState(currentThemeState)

  const onCheckedChange = (isChecked: boolean) => {
    setCurrentTheme(isChecked ? 'dark' : 'light')
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:
          currentTheme === 'dark'
            ? theme['color-basic-900']
            : theme['color-basic-200'],
      }}
    >
      <StatusBar style={currentTheme === 'dark' ? 'light' : 'dark'} />
      <Text category="h1">SETTINGS</Text>
      <Toggle checked={currentTheme === 'dark'} onChange={onCheckedChange} />
    </SafeAreaView>
  )
}
