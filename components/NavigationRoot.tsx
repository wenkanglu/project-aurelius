import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer } from '@react-navigation/native'
import {
  BottomNavigation,
  BottomNavigationTab,
  Icon,
} from '@ui-kitten/components'

import HomeScreen from '../screens/HomeScreen'
import SettingsScreen from '../screens/SettingsScreen'

const HomeIcon = (props: any) => <Icon {...props} name="home" />
const SettingsIcon = (props: any) => <Icon {...props} name="settings" />

const { Navigator, Screen } = createBottomTabNavigator()

const BottomTabBar = ({ navigation, state }: any) => (
  <BottomNavigation
    selectedIndex={state.index}
    onSelect={(index) => navigation.navigate(state.routeNames[index])}
  >
    <BottomNavigationTab icon={HomeIcon} />
    <BottomNavigationTab icon={SettingsIcon} />
  </BottomNavigation>
)

const TabNavigator = () => (
  <Navigator
    tabBar={(props) => <BottomTabBar {...props} />}
    screenOptions={(_) => ({
      headerShown: false,
    })}
  >
    <Screen name="Home" component={HomeScreen} />
    <Screen name="Settings" component={SettingsScreen} />
  </Navigator>
)

export default function NavigationRoot() {
  return (
    <NavigationContainer>
      <TabNavigator />
    </NavigationContainer>
  )
}
