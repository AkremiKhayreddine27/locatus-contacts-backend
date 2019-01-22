"use strict";

class UserController {
  async login({ auth, request }) {
    const { userName, password } = request.all();
    return await auth.attempt(userName, password);
  }
}

module.exports = UserController;
