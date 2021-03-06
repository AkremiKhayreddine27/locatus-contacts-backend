"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class ContactGroupSchema extends Schema {
  up() {
    this.create("contact_group", table => {
      table.increments();
      table
        .integer("group_id")
        .references("id")
        .inTable("groups")
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
    this.drop("contact_group");
  }
}

module.exports = ContactGroupSchema;
