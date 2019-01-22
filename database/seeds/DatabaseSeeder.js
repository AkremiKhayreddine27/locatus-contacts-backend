"use strict";

/** @type {import('@adonisjs/lucid/src/Database/Manager')} */
const Database = use("Database");

const ContactSeeder = require("./ContactSeeder");
const ActivitySeeder = require("./ActivitySeeder");
const GroupSeeder = require("./GroupSeeder");
const UserSeeder = require("./UserSeeder");

class DatabaseSeeder {
  async run() {
    await Database.raw("TRUNCATE contact_activity CASCADE");
    await Database.raw("TRUNCATE contact_group CASCADE");
    await Database.raw("TRUNCATE activities CASCADE");
    await Database.raw("TRUNCATE groups CASCADE");
    await Database.raw("TRUNCATE contacts CASCADE");
    await Database.raw("TRUNCATE users CASCADE");
    // Put yours seeders in the desired order
    await UserSeeder.run();
    await ContactSeeder.run();
    await ActivitySeeder.run();
    await GroupSeeder.run();
  }
}

module.exports = DatabaseSeeder;
/**
 * adonis seed --files 'DatabaseSeeder.js'
 */
