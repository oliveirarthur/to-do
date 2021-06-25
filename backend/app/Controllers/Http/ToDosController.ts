import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import Assignee from 'App/Models/Assignee'
import ToDo from 'App/Models/ToDo'
import { mailboxLayerValidator } from 'App/Utils/EmailValidator'

export default class ToDosController {
  public async index({}: HttpContextContract) {
    return ToDo.query().preload('assignee').orderBy('id', 'desc')
  }

  public async create({}: HttpContextContract) {}

  public async store({ request, response }: HttpContextContract) {
    return this.save({ request, response })
  }

  public async show({}: HttpContextContract) {}

  public async edit({}: HttpContextContract) {}

  public async update({ request, response }: HttpContextContract) {
    return this.save({ request, response })
  }

  public async destroy({}: HttpContextContract) {}

  public async changeStatus({ request, response, params: { id } }: HttpContextContract) {
    const { password } = request.body()
    const toDoInstance = await ToDo.findOrFail(id)
    if (toDoInstance.is_complete && toDoInstance.change_count >= 2) {
      throw new Error('Este item já foi alterado duas vezes')
    }
    if (toDoInstance.is_complete && password !== 'TrabalheNaSaipos') {
      // FIXME: save hashed password on database
      throw new Error('Senha inválida!')
    }
    toDoInstance.is_complete = !toDoInstance.is_complete
    toDoInstance.change_count++
    await toDoInstance.save()
    return toDoInstance
  }

  async save({ request, response }: Partial<HttpContextContract>) {
    const { description, isComplete, assignee, id: toDoId } = request!.body()
    const emailValidationResult = await mailboxLayerValidator(assignee.email)
    if (!emailValidationResult.mx_found) {
      return response!.status(422).send(emailValidationResult)
    }

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
