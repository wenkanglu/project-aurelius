import * as SecureStore from 'expo-secure-store'
import { atom } from 'recoil'

const currentAddressState = atom<string>({
  key: 'currentAddressState',
  default: '',
  effects: [
    ({ onSet }) => {
      onSet(async (value) => {
        await SecureStore.setItemAsync('address', value)
      })
    },
  ],
})

const currentPrivateKeyState = atom<Uint8Array>({
  key: 'currentPrivateKeyState',
  default: new Uint8Array(),
  effects: [
    ({ onSet }) => {
      onSet(async (value) => {
        await SecureStore.setItemAsync('privateKey', value.toString())
      })
    },
  ],
})

export { currentAddressState, currentPrivateKeyState }
