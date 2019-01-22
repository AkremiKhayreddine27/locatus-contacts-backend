"use strict";

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/** @typedef {import('../../Models/User')} */
const User = use("App/Models/User");

class UserController {
  async register({ request }) {
    const user = request.post();
    return User.create(user);
  }

  async login({ auth, request }) {
    const { username, password } = request.all();
    return await auth.attempt(username, password);
  }
}

module.exports = UserController;
