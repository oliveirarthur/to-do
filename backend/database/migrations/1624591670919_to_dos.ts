import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class ToDo extends BaseSchema {
  protected tableName = 'to_do'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('assignee_id').references('id').inTable('assignee')

      table.text('description')
      table.boolean('is_complete').defaultTo(false)
      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
