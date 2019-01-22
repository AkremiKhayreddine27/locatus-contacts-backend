"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class GroupSchema extends Schema {
  up() {
    this.create("groups", table => {
      table.increments();
      table.string("display");
      table.integer("level");
      table
        .integer("parentId")
        .references("id")
        .inTable("groups")
        .nullable();
      table.timestamps();
    });
  }

  down() {
    this.drop("groups");
  }
}

module.exports = GroupSchema;
