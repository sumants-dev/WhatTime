module.exports = {
  mongodb: {
    dbURI: 'mongodb://localhost:27017/when2meet'
  },
  google: {
    clientID:'234704711750-ov0igr91l1va5vl4qlq82l2fo63n03ff.apps.googleusercontent.com',
    clientSecret:'wSnYK_RrlI5kW4swUyvUZ037',
    redirectURL: 'http://localhost:3000/auth/google/redirect'
  },
  session: {
    cookieKey: "thisisrandom"
  }
}