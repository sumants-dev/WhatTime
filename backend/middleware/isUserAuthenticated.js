const isUserAuthenticated = (req, res, next) => {
  if (req.user) {
    next()
  } else {
    // for Testing
    req.user = 'Sumant Shringari'
    next()
  }
}

module.exports = isUserAuthenticated
