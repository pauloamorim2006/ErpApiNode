'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class FormaPagamentoSchema extends Schema {
  up () {
    this.create('forma_pagamentos', (table) => {
      table.increments()
      table
        .integer('user_id')
        .unsigned()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('SET NULL')
      table.string('nome').notNullable()
      table.boolean('ativo').notNullable()
      // D - Dinheiro, H - Cheque, C - Cartao, V - Vale, R - Crediario, O - Outros 
      table.string('tipo').notNullable()
      table.boolean('tef').notNullable()
      table.boolean('credito').notNullable()
      table.boolean('permitir_troco').notNullable()
      table.string('configuracao_fiscal').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('forma_pagamentos')
  }
}

module.exports = FormaPagamentoSchema
