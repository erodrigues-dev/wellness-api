module.exports = app => {
  app.use((err, req, res, next) => {
    console.error('>>>>>> midleware error-as-json', err);
    if (err) {
      return res.status(err.status || 500).json({ message: err.message });
    }

    next();
  });
};
