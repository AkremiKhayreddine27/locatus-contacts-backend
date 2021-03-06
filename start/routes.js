"use strict";

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use("Route");

Route.on("/").render("welcome");
/**
 * Auth
 */
Route.post("auth", "UserController.login").middleware("guest");
Route.post("register", "UserController.register").middleware("guest");
/**
 * Contacts
 */
Route.get("contacts", "ContactController.index").middleware("auth");
Route.get("contacts/:id", "ContactController.show").middleware("auth");
Route.post("contacts", "ContactController.store").middleware("auth");
Route.put("contacts/:id", "ContactController.update").middleware("auth");
Route.delete("contacts/:id", "ContactController.destroy").middleware("auth");
Route.post("contacts/delete", "ContactController.destroyMany").middleware(
  "auth"
);

/**
 * Groups
 */
Route.get("groups", "GroupController.index").middleware("auth");
Route.get("groups/:id", "GroupController.show").middleware("auth");
Route.post("groups", "GroupController.store").middleware("auth");
Route.put("groups/:id", "GroupController.update").middleware("auth");
Route.delete("groups/:id", "GroupController.destroy").middleware("auth");
Route.post("groups/:id/contacts", "GroupController.addContacts").middleware(
  "auth"
);

/**
 * Activities
 */
Route.get("activities", "ActivityController.index").middleware("auth");
Route.get("activities/:id", "ActivityController.show").middleware("auth");
Route.post("activities", "ActivityController.store").middleware("auth");
Route.put("activities/:id", "ActivityController.update").middleware("auth");
Route.delete("activities/:id", "ActivityController.destroy").middleware("auth");
Route.post(
  "activities/:id/contacts",
  "ActivityController.addContacts"
).middleware("auth");

/**
 * Relations
 */
Route.get("contacts-groups", "ContactGroupController.index").middleware("auth");
Route.get("contacts-activities", "ContactActivityController.index").middleware(
  "auth"
);
