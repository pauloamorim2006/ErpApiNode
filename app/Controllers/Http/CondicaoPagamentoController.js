'use strict'

const CondicaoPagamento = use('App/Models/CondicaoPagamento')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with condicaopagamentos
 */
class CondicaoPagamentoController {
  /**
   * Show a list of all condicaopagamentos.
   * GET condicaopagamentos
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
    const condicoesPagamento = await CondicaoPagamento.query()
      .with('user')
      .fetch()

    return condicoesPagamento
  }  

  /**
   * Create/save a new condicaopagamento.
   * POST condicaopagamentos
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response, auth }) {
    try {
      const data = request.only(['descricao'])

      const condicaoPagamento = await CondicaoPagamento.create({...data, user_id: auth.user.id})      

      return condicaoPagamento
    } catch(err) {
      return response
        .status(err.status)
        .send({ error: { message: 'Não foi possível incluir a condição de pagamento'} })
    }
  }

  /**
   * Display a single condicaopagamento.
   * GET condicaopagamentos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
    try {
      const condicaoPagamento = await CondicaoPagamento.findOrFail(params.id)

      await condicaoPagamento.load('user')

      return condicaoPagamento
    } catch(err) {
      return response
        .status(err.status)
        .send({ error: { message: 'Não foi possível encontrar a condição de pagamento'} })
    }
  }  

  /**
   * Update condicaopagamento details.
   * PUT or PATCH condicaopagamentos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
    try {
      const condicaoPagamento = await CondicaoPagamento.findOrFail(params.id)
      const data = request.only(['descricao'])

      condicaoPagamento.merge(data)

      await condicaoPagamento.save()

      return condicaoPagamento
    } catch(err) {
      return response
        .status(err.status)
        .send({ error: { message: `Não foi possível atualizar a condição de pagamento`} })
    }
  }

  /**
   * Delete a condicaopagamento with id.
   * DELETE condicaopagamentos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
    try {
      const condicaoPagamento = await CondicaoPagamento.findOrFail(params.id)

      await condicaoPagamento.delete()
    } catch(err) {
      return response
        .status(err.status)
        .send({ error: { message: 'Não foi possível deletar a condição de pagamento'} })
    }
  }
}

module.exports = CondicaoPagamentoController
