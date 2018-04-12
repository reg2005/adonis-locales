Example from app/Controllers/Http/AuthController.js:

```js
'use strict'
const Validate = require('../../../libs/validate')
const User = use('App/Models/User')
class AuthController {
  async register ({ request, response, auth }) {
    await Validate(request.all(), {
      first_name: 'required|min:6|max:120',
      last_name: 'required|min:6|max:120',
      email: 'required|email|unique:users,email',
      password: 'required|min:6|max:120'
    })

    const {
      first_name,
      last_name,
      email,
      password,
      referral_link
    } = request.all()

    let user = await User.create({
      first_name,
      last_name,
      email,
      password,
      referral_id: referral_link
    })

    await auth.login(user)

    return 'Logged in successfully'
  }
  async login ({ request, auth }) {
    await Validate(request.all(), {
      email: 'required|email',
      password: 'required|min:6|max:120',
      remember: 'boolean'
    })

    const { email, password, remember } = request.all()
    try {
      await auth.remember(remember).attempt(email, password)
    } catch (e) {
      return response.status(401).send('fail')
    }

    return 'Logged in successfully'
  }
  async logout ({ request, auth }) {
    await auth.logout()
    return 'Logout in successfully'
  }
}

module.exports = AuthController

```