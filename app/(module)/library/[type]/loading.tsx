import { ListLoading } from '@/components/common/loading'
import React from 'react'

function loading() {
  return (
    <div>
      <ListLoading quantity={5} direction={'vertical'} />
    </div>
  )
}

export default loading