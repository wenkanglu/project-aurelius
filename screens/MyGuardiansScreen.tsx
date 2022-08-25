import { Layout, Text } from '@ui-kitten/components'
import { StatusBar } from 'expo-status-bar'
import { useRecoilValue } from 'recoil'

import { currentThemeState } from '../states/theme'

export default function MyGuardians() {
  const currentTheme = useRecoilValue(currentThemeState)

  return (
    <Layout
      style={{
        flex: 1,
        alignItems: 'center',
      }}
    >
      <StatusBar style={currentTheme === 'dark' ? 'light' : 'dark'} />
      <Text category="h1">MY GUARDIANS</Text>
    </Layout>
  )
}
