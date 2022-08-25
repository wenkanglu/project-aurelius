import { createNativeStackNavigator } from '@react-navigation/native-stack'

import LoginScreen from '../screens/LoginScreen'

const { Navigator, Screen } = createNativeStackNavigator()

export default function StackNavigation() {
  return (
    <Navigator
      screenOptions={(_) => ({
        headerShown: false,
      })}
    >
      <Screen name="Login" component={LoginScreen} />
    </Navigator>
  )
}
