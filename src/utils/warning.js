import warning from 'warning'

export default (...args) => {
  if (process.env.NODE_ENV === 'production') return

  return warning(...args)
}