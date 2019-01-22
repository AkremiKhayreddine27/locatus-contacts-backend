"use strict";

class UserController {
  async login({ auth, request }) {
    const { username, password } = request.all();
    return await auth.attempt(username, password);
  }
}

module.exports = UserController;
