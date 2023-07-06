declare module '*.module.less' {
  const classes: { [key: string]: string }
  export default classes
}

// window
declare global {
  interface Window {
    jaq: any[]
  }
}

declare const LsMessage

declare module '*.less'
declare module '*.css'
declare module '*.png'
declare module '*.jpg'
declare module '*.jpeg'
declare module '*.gif'
declare module '*.svg'
