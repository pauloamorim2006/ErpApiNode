'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Transportadora extends Model {
    user () {
        return this.belongsTo('App/Models/User')
    }

    cidade () {
        return this.belongsTo('App/Models/Cidade')
    }
}

module.exports = Transportadora
