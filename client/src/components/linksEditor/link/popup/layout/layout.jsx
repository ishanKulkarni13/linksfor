import Popup from '@/components/popup/popup'
import React from 'react'

export default function LayoutPopup({close}) {
  return (
    <div>
      <Popup  close={close}  title={'Layout'} />
    </div>
  )
}
