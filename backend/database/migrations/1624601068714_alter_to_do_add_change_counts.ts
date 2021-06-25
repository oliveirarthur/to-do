import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class ToDo extends BaseSchema {
  protected tableName = 'to_do'

  public async up() {
    this.schema.table(this.tableName, (table) => {
      table.integer('change_count').after('is_complete').defaultTo(0)
    })
  }

  public async down() {
    this.schema.table(this.tableName, (table) => {
      table.dropColumn('change_count')
    })
  }
}
