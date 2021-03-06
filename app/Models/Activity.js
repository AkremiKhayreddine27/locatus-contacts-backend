"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class Activity extends Model {
  children() {
    return this.hasMany("App/Models/Activity", "id", "parentId");
  }

  contacts() {
    return this.belongsToMany("App/Models/Contact").pivotTable('contact_activity');
  }
}

module.exports = Activity;
