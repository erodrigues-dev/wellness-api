module.exports = app => {
  app.use((err, req, res, next) => {
    console.error('>>>>>> midleware error-as-json', err)
    if (err) {
      const { message } = err
      return res.status(500).json({ message })
    }

    next()
  })
}
