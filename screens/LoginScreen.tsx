import { Button, Layout, Text, ViewPager } from '@ui-kitten/components'
import { mnemonicToSecretKey } from 'algosdk'
import { StatusBar } from 'expo-status-bar'
import { useState } from 'react'
import { Image, View } from 'react-native'
import Animated, { FadeIn, FadeInUp } from 'react-native-reanimated'
import { useRecoilValue, useSetRecoilState } from 'recoil'

import { currentAddressState, currentPrivateKeyState } from '../states/account'
import { currentThemeState } from '../states/theme'
import { PRIMARY_PASSPHRASE } from '../testEnv'

export default function LoginScreen() {
  const currentTheme = useRecoilValue(currentThemeState)
  const setCurrentAddress = useSetRecoilState(currentAddressState)
  const setCurrentPrivateKey = useSetRecoilState(currentPrivateKeyState)

  const [currentIndex, setCurrentIndex] = useState(0)

  const onImportButtonPressed = async () => {
    // Check passphrase and try to convert
    // to private key using algosdk. Handle exceptions.
    let account

    try {
      account = mnemonicToSecretKey(PRIMARY_PASSPHRASE)
    } catch (e) {
      console.log('Invalid passphrase')
      return
    }

    setCurrentAddress(account.addr)
    setCurrentPrivateKey(account.sk)

    console.log('Saved account info to storage')
  }

  return (
    <Layout style={{ flex: 1 }}>
      <StatusBar style={currentTheme === 'dark' ? 'light' : 'dark'} />
      <ViewPager
        selectedIndex={currentIndex}
        // shouldLoadComponent={shouldLoadComponent}
        onSelect={(newIndex) => {
          setCurrentIndex(newIndex)
        }}
        swipeEnabled
        style={{ flexGrow: 12 }}
      >
        <Animated.View
          style={{
            flex: 1,
            flexGrow: 1,
            alignItems: 'center',
          }}
          entering={FadeIn.duration(500)}
        >
          <Text category="h1">PROJECT AURELIUS</Text>
          <Animated.View
            style={{ flex: 1, flexGrow: 1, justifyContent: 'center' }}
            entering={FadeInUp.duration(500).delay(1000)}
          >
            <Image
              source={require('../assets/happy-people.png')}
              style={{ width: 256, height: 256 }}
            />
          </Animated.View>
          <Text category="h4">Social recovery. Made Easy.</Text>
        </Animated.View>

        {/* Maybe make this page more of a crash course for social recovery */}
        <View
          style={{
            flex: 1,
            flexGrow: 1,
            alignItems: 'center',
            justifyContent: 'space-around',
          }}
        >
          <Text category="h4">Step 1: import your Algorand account</Text>
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Image
              source={require('../assets/wallet.png')}
              style={{ width: 128, height: 128 }}
            />
          </View>
          <Text category="h4">Step 2: add a guardian</Text>
          <View
            style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
          >
            <Image
              source={require('../assets/shield.png')}
              style={{ width: 128, height: 128 }}
            />
          </View>
          <Text category="h4">Step 3: Notify your guardian</Text>
          <View
            style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
          >
            <Image
              source={require('../assets/high-five.png')}
              style={{ width: 300, height: 160 }}
            />
          </View>
        </View>

        <View
          style={{
            flex: 1,
            flexGrow: 1,
            alignItems: 'center',
            justifyContent: 'space-around',
          }}
        >
          <Text category="h2">Wallet Import</Text>
          <View style={{ flex: 1, flexGrow: 1, justifyContent: 'center' }}>
            <Text category="h6" style={{ paddingHorizontal: 8 }}>
              Import your Algorand account by entering your 25-word passphrase.
              This passphrase will be used to derive your private key so that
              you can manage your account guardians.{'\n\n'}Your private key
              will remain encrypted on this device and Project Aurelius will
              NEVER send it anywhere else.
            </Text>
          </View>
          <Button onPress={onImportButtonPressed}>IMPORT</Button>
        </View>
      </ViewPager>
      <View
        style={{
          flex: 1,
          flexGrow: 1,
          flexDirection: 'row',
          justifyContent: 'center',
        }}
      >
        {[...Array(3)].map((_, i) => {
          return (
            <Animated.View
              key={i}
              style={{ opacity: currentIndex === i ? 1.0 : 0.3 }}
            >
              <Text category="h1">.</Text>
            </Animated.View>
          )
        })}
      </View>
    </Layout>
  )
}
