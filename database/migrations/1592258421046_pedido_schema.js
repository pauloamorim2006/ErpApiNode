'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PedidoSchema extends Schema {
  up () {
    this.create('pedidos', (table) => {
      table.increments()
      table
        .integer('user_id')
        .unsigned()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('SET NULL')
      table.integer('status').notNullable()
      table
        .integer('cliente_id')
        .unsigned()
        .references('id')
        .inTable('clientes')
        .onUpdate('CASCADE')
        .onDelete('SET NULL')
      table.timestamp('data')
      table
        .integer('condicao_pagamento_id')
        .unsigned()
        .references('id')
        .inTable('condicao_pagamentos')
        .onUpdate('CASCADE')
        .onDelete('SET NULL')
      table
        .integer('forma_pagamento_id')
        .unsigned()
        .references('id')
        .inTable('forma_pagamentos')
        .onUpdate('CASCADE')
        .onDelete('SET NULL')
      table.timestamps()
    })
  }

  down () {
    this.drop('pedidos')
  }
}

module.exports = PedidoSchema
