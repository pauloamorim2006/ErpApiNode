'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Produto extends Model {
    user () {
        return this.belongsTo('App/Models/User')
    }

    unidade () {
        return this.belongsTo('App/Models/Unidade')
    }
}

module.exports = Produto
