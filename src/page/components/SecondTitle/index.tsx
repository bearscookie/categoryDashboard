import styles from './style.module.less'

const Title = ({ title, extra, tag, type }: any) => {
  return (
     <div className={styles.container}>
      <b></b>
      <span>{title}</span>
  </div>
  )
}
export default Title
