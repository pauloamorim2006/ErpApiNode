'use strict'

const FormaPagamento = use('App/Models/FormaPagamento')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with formapagamentos
 */
class FormaPagamentoController {
  /**
   * Show a list of all formapagamentos.
   * GET formapagamentos
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
    const formasPagamento = await FormaPagamento.query()
      .with('user')
      .fetch()

    return formasPagamento
  }  

  /**
   * Create/save a new formapagamento.
   * POST formapagamentos
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response, auth }) {
    try {
      const data = request.only([
        'nome', 'ativo', 'tipo', 'tef', 'credito', 'permitir_troco', 
        'configuracao_fiscal'])

      const formaPagamento = await FormaPagamento.create({...data, user_id: auth.user.id})      

      return formaPagamento
    } catch(err) {
      return response
        .status(err.status)
        .send({ error: { message: 'Não foi possível incluir a forma de pagamento'} })
    }
  }

  /**
   * Display a single formapagamento.
   * GET formapagamentos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
    try {
      const formaPagamento = await FormaPagamento.findOrFail(params.id)

      await formaPagamento.load('user')

      return formaPagamento
    } catch(err) {
      return response
        .status(err.status)
        .send({ error: { message: 'Não foi possível encontrar a forma de pagamento'} })
    }
  }  

  /**
   * Update formapagamento details.
   * PUT or PATCH formapagamentos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
    try {
      const formaoPagamento = await FormaPagamento.findOrFail(params.id)
      const data = request.only([
        'nome', 'ativo', 'tipo', 'tef', 'credito', 'permitir_troco', 
        'configuracao_fiscal'])

        formaoPagamento.merge(data)

      await formaoPagamento.save()

      return formaoPagamento
    } catch(err) {
      return response
        .status(err.status)
        .send({ error: { message: `Não foi possível atualizar a forma de pagamento`} })
    }
  }

  /**
   * Delete a formapagamento with id.
   * DELETE formapagamentos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
    try {
      const formaPagamento = await FormaPagamento.findOrFail(params.id)

      await formaPagamento.delete()
    } catch(err) {
      return response
        .status(err.status)
        .send({ error: { message: 'Não foi possível deletar a forma de pagamento'} })
    }
  }
}

module.exports = FormaPagamentoController
