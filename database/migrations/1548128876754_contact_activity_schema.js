"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class ContactActivitySchema extends Schema {
  up() {
    this.create("contact_activity", table => {
      table.increments();
      table
        .integer("activity_id")
        .references("id")
        .inTable("activities")
        .onDelete("cascade");
      table
        .integer("contact_id")
        .references("id")
        .inTable("contacts")
        .onDelete("cascade");
      table.timestamps();
    });
  }

  down() {
    this.drop("contact_activity");
  }
}

module.exports = ContactActivitySchema;
