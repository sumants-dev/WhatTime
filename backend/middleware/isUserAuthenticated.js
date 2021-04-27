const isUserAuthenticated = (req, res, next) => {
  if (req.user) {
    next()
  } else {
    res.send('Not Authenticated')
  }
}

module.exports = isUserAuthenticated
