'use strict'

const Pedido = use('App/Models/Pedido')
const PedidoItem = use('App/Models/PedidoItem')
const Database = use('Database')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with pedidos
 */
class PedidoController {
  /**
   * Show a list of all pedidos.
   * GET pedidos
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
    const pedidos = await Pedido.query()
      .with('user')
      .with('cliente')
      .with('formaPagamento')
      .with('condicaoPagamento')
      .with('pedidoItens')
      .fetch()

    return pedidos
  }

  /**
   * Create/save a new pedido.
   * POST pedidos
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response, auth }) {
    const trx = await Database.beginTransaction()
    try {
      const data = request.only([
        'cliente_id', 'data', 'condicao_pagamento_id', 'forma_pagamento_id'])
      const pedidoItens = request.input('pedido_itens')

      const pedido = await Pedido.create({...data, user_id: auth.user.id, status: 1}, trx)
      await pedido.pedidoItens().createMany(pedidoItens, trx)

      await trx.commit()

      return pedido
    } catch(err) {
      await trx.rollback()
      return response
        .status(err.status)
        .send({ error: { message: 'Não foi possível incluir o pedido'} })
    }
  }

  /**
   * Display a single pedido.
   * GET pedidos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
    try {
      const pedido = await Pedido.findOrFail(params.id)

      await pedido.loadMany(['user', 'cliente', 'formaPagamento', 'condicaoPagamento'])
      return pedido
    } catch(err) {
      return response
        .status(err.status)
        .send({ error: { message: 'Não foi possível encontrar o pedido'} })
    }
  }

  /**
   * Update pedido details.
   * PUT or PATCH pedidos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
    const trx = await Database.beginTransaction()
    try {
      const pedido = await Pedido.findOrFail(params.id)
      const pedidoItens = await PedidoItem
        .query()
        .where("pedido_id", params.id)
        .fetch()

      const { pedidoItens: dataItems, ...data } = request.only([
        'cliente_id', 'data', 'condicao_pagamento_id', 'forma_pagamento_id',
        'pedidoItens'])

      pedido.merge(data)

      await pedido.save(trx)

      await PedidoItem
          .query()
          .where("pedido_id", params.id)
          .delete(trx)

      if (dataItems && dataItems.length > 0)
      {
        await pedido.pedidoItens().createMany(dataItems, trx)
      }
      await trx.commit()

      return pedido
    } catch(err) {
      await trx.rollback()
      return response
        .status(err.status)
        .send({ error: { message: `Não foi possível atualizar o pedido. Motivo: ${err.message}`} })
    }
  }

  /**
   * Delete a pedido with id.
   * DELETE pedidos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
    try {
      const pedido = await Pedido.findOrFail(params.id)

      await pedido.delete()
    } catch(err) {
      return response
        .status(err.status)
        .send({ error: { message: 'Não foi possível deletar o pedido'} })
    }
  }
}

module.exports = PedidoController
