"use strict";

const ContactActivity = use("App/Models/ContactActivity");

class ContactActivityController {
  /**
   * Show a list of all contact_activities.
   * GET activities
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request, response, view }) {
    return await ContactActivity.all();
  }
}

module.exports = ContactActivityController;
