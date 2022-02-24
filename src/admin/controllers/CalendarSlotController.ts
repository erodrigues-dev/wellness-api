import { Request, Response, NextFunction } from 'express'
import Joi from 'joi'
import { CalendarCreateBlockUseCase } from '../../shared/useCases/calendar/slots/CalendarCreateBlockUseCase'
import { CalendarUpdateBlockUseCase } from '../../shared/useCases/calendar/slots/CalendarUpdateBlockUseCase'
import { CalendarSlotListUseCase } from '../../shared/useCases/calendar/slots/CalendarSlotListUseCase'
import { CalendarSlotStoreUseCase } from '../../shared/useCases/calendar/slots/CalendarSlotStoreUseCase'
import { CalendarDestroyBlockUseCase } from '../../shared/useCases/calendar/slots/CalendarDestroyBlockUseCase'

const itemSchema = Joi.object({
  id: Joi.string().uuid().required(),
  start: Joi.string().isoDate().required(),
  end: Joi.string().isoDate().required(),
  recurrenceRule: Joi.string().allow(null, ''),
  recurrenceExceptions: Joi.array().items(Joi.string().isoDate()).allow(null),
  status: Joi.string().required()
})

const schema = Joi.object({
  calendarId: Joi.string().required(),
  created: Joi.array().items(itemSchema).default([]),
  updated: Joi.array().items(itemSchema).default([]),
  deleted: Joi.array().items(itemSchema).default([])
})

export class CalendarSlotController {
  async index(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params
      const useCase = new CalendarSlotListUseCase()
      const list = await useCase.list(id)
      return res.json(list)
    } catch (error) {
      next(error)
    }
  }

  async store(req: Request, res: Response, next: NextFunction) {
    try {
      const { id: calendarId } = req.params
      const data = await schema.validateAsync({ calendarId, ...req.body })
      const useCase = new CalendarSlotStoreUseCase()
      await useCase.handle(data)
      return res.sendStatus(204)
    } catch (error) {
      next(error)
    }
  }

  async createBlock(req: Request, res: Response, next: NextFunction) {
    try {
      const usecase = new CalendarCreateBlockUseCase()
      const model = await usecase.handle(req.body)
      return res.json(model)
    } catch (error) {
      next(error)
    }
  }

  async updateBlock(req: Request, res: Response, next: NextFunction) {
    try {
      const data = { ...req.params, ...req.body }
      const usecase = new CalendarUpdateBlockUseCase()
      const model = await usecase.handle(data)
      return res.json(model)
    } catch (error) {
      next(error)
    }
  }

  async destroyBlock(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params
      const usecase = new CalendarDestroyBlockUseCase()
      await usecase.handle(id)
      return res.sendStatus(204)
    } catch (error) {
      next(error)
    }
  }
}

export const makeCalendarSlotController = () => new CalendarSlotController()
