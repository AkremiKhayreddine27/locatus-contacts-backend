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
/**
 * Contacts
 */
Route.get("contacts", "ContactController.index");

/**
 * Groups
 */
Route.get("groups", "GroupController.index");
Route.post("groups/:id/contacts", "GroupController.addContacts");

/**
 * Activities
 */
Route.get("activities", "ActivityController.index");
Route.post("activities/:id/contacts", "ActivityController.addContacts");
