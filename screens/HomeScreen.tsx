import { Text, useTheme } from '@ui-kitten/components'
import { StatusBar } from 'expo-status-bar'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useRecoilValue } from 'recoil'

import { currentThemeState } from '../states/theme'

export default function HomeScreen() {
  const theme = useTheme()
  const currentTheme = useRecoilValue(currentThemeState)

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
      <Text category="h1">HOME</Text>
    </SafeAreaView>
  )
}
