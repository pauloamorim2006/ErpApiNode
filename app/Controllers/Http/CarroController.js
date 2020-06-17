'use strict'

const Carro = use('App/Models/Carro')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with carros
 */
class CarroController {
  /**
   * Show a list of all carros.
   * GET carros
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
    const carros = await Carro.query()
      .with('user')
      .fetch()

    return carros
  }  

  /**
   * Create/save a new carro.
   * POST carros
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response, auth }) {
    try {
      const data = request.only(['placa', 'uf', 'rntc'])

      const carro = await Carro.create({...data, user_id: auth.user.id})      

      return carro
    } catch(err) {
      return response
        .status(err.status)
        .send({ error: { message: 'Não foi possível incluir o carro'} })
    }
  }

  /**
   * Display a single carro.
   * GET carros/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
    try {
      const carro = await Carro.findOrFail(params.id)

      await carro.load('user')

      return carro
    } catch(err) {
      return response
        .status(err.status)
        .send({ error: { message: 'Não foi possível encontrar o carro'} })
    }
  }  

  /**
   * Update carro details.
   * PUT or PATCH carros/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
    try {
      const carro = await Carro.findOrFail(params.id)
      const data = request.only(['placa', 'uf', 'rntc'])

      carro.merge(data)

      await carro.save()

      return carro
    } catch(err) {
      return response
        .status(err.status)
        .send({ error: { message: `Não foi possível atualizar o carro`} })
    }
  }

  /**
   * Delete a carro with id.
   * DELETE carros/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
    try {
      const carro = await Carro.findOrFail(params.id)

      await carro.delete()
    } catch(err) {
      return response
        .status(err.status)
        .send({ error: { message: 'Não foi possível deletar o carro'} })
    }
  }
}

module.exports = CarroController
