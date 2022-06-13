import { IconRegistry } from '@ui-kitten/components'
import { EvaIconsPack } from '@ui-kitten/eva-icons'
import React from 'react'
import { RecoilRoot } from 'recoil'

import ApplicationRoot from './components/ApplicationRoot'

export default function App() {
  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <RecoilRoot>
        <ApplicationRoot />
      </RecoilRoot>
    </>
  )
}
