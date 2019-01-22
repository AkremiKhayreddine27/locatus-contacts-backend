"use strict";

/*
|--------------------------------------------------------------------------
| UserSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use("Factory");
const User = use("App/Models/User");

class UserSeeder {
  static async run() {
    await User.create({
      username: "akremi",
      email: "khayreddine27@gmail.com",
      password: "139752684"
    });
  }
}

module.exports = UserSeeder;
