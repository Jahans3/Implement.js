export default Interface => object => {
  if (process.env.NODE_ENV === 'production') return object

  const {} = Interface
}
