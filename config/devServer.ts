import { chrome } from 'chrome-paths'
import openBrowser = require('react-dev-utils/openBrowser')

const port = 3200

export const config = {
  port,
  https: false,
  host: 'localhost',
  after: () => {
    process.env.BROWSER = chrome
    process.env.BROWSER_ARGS = '--incognito'
    openBrowser(`http://demo.example.com:${port}`)
  },
}
