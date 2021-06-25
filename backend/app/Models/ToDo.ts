import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Assignee from './Assignee'

export default class ToDo extends BaseModel {
  public static table = 'to_do'

  @column({ isPrimary: true })
  public id: number

  @column()
  public assigneeId

  @column()
  public description
  @column()
  public is_complete
  @column()
  public change_count

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Assignee)
  public assignee: BelongsTo<typeof Assignee>
}
