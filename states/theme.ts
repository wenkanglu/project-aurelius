import * as SecureStore from 'expo-secure-store'
import { atom } from 'recoil'

const currentThemeState = atom<string>({
  key: 'currentThemeState',
  default: 'light',
  effects: [
    ({ onSet }) => {
      onSet(async (value) => {
        await SecureStore.setItemAsync('theme', value)
      })
    },
  ],
})

const preferSystemThemeState = atom<boolean>({
  key: 'preferSystemThemeState',
  default: true,
  effects: [
    ({ onSet }) => {
      onSet(async (value) => {
        await SecureStore.setItemAsync('preferSystemTheme', value.toString())
      })
    },
  ],
})

export { currentThemeState, preferSystemThemeState }
