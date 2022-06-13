import * as SecureStore from 'expo-secure-store'
import { atom } from 'recoil'

const currentThemeState = atom<string>({
  key: 'currentThemeState',
  default: 'light',
  effects: [
    ({ onSet }) => {
      onSet(async (newTheme) => {
        await SecureStore.setItemAsync('theme', newTheme)
      })
    },
  ],
})

export { currentThemeState }
