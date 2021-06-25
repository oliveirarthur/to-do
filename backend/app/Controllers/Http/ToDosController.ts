import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import Assignee from 'App/Models/Assignee'
import ToDo from 'App/Models/ToDo'

export default class ToDosController {
  public async index({}: HttpContextContract) {
    return ToDo.query().preload('assignee').orderBy('id', 'desc')
  }

  public async create({}: HttpContextContract) {}

  public async store({ request }: HttpContextContract) {
    return this.save({ request })
  }

  public async show({}: HttpContextContract) {}

  public async edit({}: HttpContextContract) {}

  public async update({ request }: HttpContextContract) {
    return this.save({ request })
  }

  public async destroy({}: HttpContextContract) {}

  async save({ request }) {
    const { description, isComplete, assignee, id: toDoId } = request.body()
    return await Database.transaction(async (trx) => {
      const assigneeInstance = assignee.id ? await Assignee.findOrFail(assignee.id) : new Assignee()
      Object.assign(assigneeInstance, {
        name: assignee.name,
        email: assignee.email,
      })
      assigneeInstance.useTransaction(trx)
      await assigneeInstance.save()

      const toDoInstance = toDoId ? await ToDo.findOrFail(toDoId) : new ToDo()
      Object.assign(toDoInstance, {
        description,
        is_complete: isComplete,
        assigneeId: assigneeInstance.id,
      })
      toDoInstance.useTransaction(trx)
      await toDoInstance.save()
      await toDoInstance.load('assignee')
      return toDoInstance
    })
  }
}
