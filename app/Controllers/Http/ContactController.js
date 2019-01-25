"use strict";

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/** @typedef {import('../../Models/Contact')} */
const Contact = use("App/Models/Contact");
/** @type {import('@adonisjs/lucid/src/Database/Manager')} */
const Database = use("Database");

/**
 * Resourceful controller for interacting with contacts
 */
class ContactController {
  /**
   * Show a list of all contacts.
   * GET contacts
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request, response, view }) {
    const req = request.get();
    let query = Contact.query()
      .with("groups")
      .with("activities");
    let isRaw = false;
    Object.keys(req).map((key, index) => {
      if (Array.isArray(req[key])) {
        query = query.whereHas(
          key,
          builder => {
            builder.whereIn(key + ".id", req[key].map(g => Number.parseInt(g)));
          },
          ">",
          0
        );
      } else if (key.includes(".")) {
        console.log(index);
        if (index > 0) {
          const clone = key.split(".");
          const raw = "LOWER(" + clone[0] + " ->> '" + clone[1] + "') LIKE LOWER(?)";
          query = query.whereRaw(raw, ["%" + req[key] + "%"]);
        }
      } else {
        query = query.where(key, req[key]);
      }
    });
    return await query.fetch();
  }

  /**
   * Create/save a new contact.
   * POST contacts
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response }) {
    const contact = request.post();
    return await Contact.create(contact);
  }

  /**
   * Display a single contact.
   * GET contacts/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, request, response, view }) {
    return await Contact.find(params.id);
  }

  /**
   * Update contact details.
   * PUT or PATCH contacts/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {
    const changes = request.post();
    if (changes.emails) {
      changes.emails = JSON.stringify(changes.emails);
    }
    if (changes.roles) {
      changes.roles = JSON.stringify(changes.roles);
    }
    if (changes.rate) {
      changes.rate = JSON.stringify(changes.rate);
    }
    if (changes.phoneNumbers) {
      changes.phoneNumbers = JSON.stringify(changes.phoneNumbers);
    }
    if (changes.addresses) {
      changes.addresses = JSON.stringify(changes.addresses);
    }
    return await Contact.query()
      .where("id", params.id)
      .update(changes);
  }

  /**
   * Delete a contact with id.
   * DELETE contacts/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {
    const { id } = params;
    const contact = await Contact.find(id);
    return await contact.delete();
  }

  /**
   * Delete many contacts.
   * DELETE contacts/delete
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroyMany({ params, request, response }) {
    const { ids } = request.post();
    return await Contact.query()
      .whereIn("id", ids)
      .delete();
  }
}

module.exports = ContactController;
