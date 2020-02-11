import * as Knex from 'knex'

export const up = (knex: Knex) => {
    return knex.schema.alterTable('tg_chat_tag', table => {
        table.timestamps()
        table.bigInteger('chat').notNullable().defaultTo(0)
        table.unique(['chat', 'tag'], 'unique__tg_chat_tag__chat__tag')
    })
}

export const down = (knex: Knex) => {
    return knex.schema.alterTable('tg_chat_tag', table => {
        table.dropUnique(['chat', 'tag'], 'unique__tg_chat_tag__chat__tag')
        table.dropColumn('chat')
        table.dropTimestamps()
    })
}
