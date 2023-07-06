import type { Menu } from 'antd'
import { toJS } from 'mobx'
import type * as React from 'react'

type onClick = React.ComponentProps<typeof Menu>['onClick']
