import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import {
  BottomNavigation,
  BottomNavigationTab,
  Icon,
  IndexPath,
  Layout,
  Select,
  SelectItem,
} from '@ui-kitten/components'
import React, { useRef } from 'react'
import { useRecoilValue } from 'recoil'

import MyDependentsScreen from '../screens/MyDependentsScreen'
import MyGuardiansScreen from '../screens/MyGuardiansScreen'
import SettingsScreen from '../screens/SettingsScreen'
import { currentAddressState } from '../states/account'

const MyGuardiansIcon = (props: any) => <Icon {...props} name="shield" />
const MyDependentsIcon = (props: any) => <Icon {...props} name="people" />
const SettingsIcon = (props: any) => <Icon {...props} name="settings-2" />

const { Navigator, Screen } = createBottomTabNavigator()

const BottomTabBar = ({ navigation, state }: any) => (
  <BottomNavigation
    selectedIndex={state.index}
    onSelect={(index) => navigation.navigate(state.routeNames[index])}
  >
    <BottomNavigationTab icon={MyGuardiansIcon} />
    <BottomNavigationTab icon={MyDependentsIcon} />
    <BottomNavigationTab icon={SettingsIcon} />
  </BottomNavigation>
)

export default function TabNavigation() {
  const [selectedIndex, setSelectedIndex] = React.useState(new IndexPath(0))
  const currentAddress = useRecoilValue(currentAddressState)

  const dropDownValues = useRef([currentAddress]).current

  return (
    <Layout style={{ flex: 1 }}>
      <Select
        selectedIndex={selectedIndex}
        onSelect={(index) => setSelectedIndex(index)}
        style={{ padding: 8 }}
        size="large"
        value={dropDownValues[selectedIndex.row]}
      >
        <SelectItem title={currentAddress} />
      </Select>
      <Navigator
        tabBar={(props) => <BottomTabBar {...props} />}
        screenOptions={(_) => ({
          headerShown: false,
        })}
      >
        <Screen name="My Guardians" component={MyGuardiansScreen} />
        <Screen name="My Dependents" component={MyDependentsScreen} />
        <Screen name="Settings" component={SettingsScreen} />
      </Navigator>
    </Layout>
  )
}
