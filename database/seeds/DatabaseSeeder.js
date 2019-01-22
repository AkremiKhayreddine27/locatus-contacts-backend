"use strict";

const ContactSeeder = require("./ContactSeeder");
const ActivitySeeder = require("./ActivitySeeder");
const GroupSeeder = require("./GroupSeeder");

class DatabaseSeeder {
  async run() {
    // Put yours seeders in the desired order
    await ContactSeeder.run();
    await ActivitySeeder.run();
    await GroupSeeder.run();
  }
}

module.exports = DatabaseSeeder;
