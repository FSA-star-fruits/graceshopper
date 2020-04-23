const secrets = {
  clientID:
    '822653004430-bbliravqc9a0qolf315n6n1vjkribqo0.apps.googleusercontent.com',
  clientSecret: 'V1fJg0CWhOF7UElsUYoSSGGr',
  callbackURL: 'http://127.0.0.1:8080/auth/johnoh/verify'
}
module.exports = secrets

// Copied from the lecture to check if user is admin
// const isAdminMiddleware = (req, res, next) => {
//   const currentUser = req.session.currentUser
//   if (currentUser && currentUser.isAdmin) {
//     next()
//   } else {
//     const error = new Error('Only for Admin')
//     error.status = 401
//     next(error)
//   }
// }

// For User model add a column for admin
// const User = db.define({
//   name: Sequelize.toString,
//   email: Sequelize.toString,
//   isAdmin: Sequelize.BOOLEAN
// })

// Prevents guest from updating the database
// Our routes only send name and email
// app.post('signup',(req, res, next) => {
//   User.create({
//     name: req.body.name,
//     email: req.body.email
//   })
// })
