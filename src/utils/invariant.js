import invariant from 'invariant'

export default (...args) => {
  if (process.env.NODE_ENV === 'production') return

  return invariant(...args)
}