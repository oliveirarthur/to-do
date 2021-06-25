import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Assignee extends BaseModel {
  public static table = 'assignee'

  @column({ isPrimary: true })
  public id: number

  @column()
  public name
  @column()
  public email

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
