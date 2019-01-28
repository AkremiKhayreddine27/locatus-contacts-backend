"use strict";
const ContactGroup = use("App/Models/ContactGroup");

class ContactGroupController {
  /**
   * Show a list of all contact_groups.
   * GET activities
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request, response, view }) {
    return await ContactGroup.all();
  }
}

module.exports = ContactGroupController;
