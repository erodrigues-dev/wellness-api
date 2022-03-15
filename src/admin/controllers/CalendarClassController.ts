import { Request, Response, NextFunction } from 'express'
import { CalendarClassCreateUseCase } from '../../shared/useCases/calendar/class/CalendarClassCreateUseCase'
import { CalendarClassDestroyUseCase } from '../../shared/useCases/calendar/class/CalendarClassDestroyUseCase'
import { CalendarClassGetByIdUseCase } from '../../shared/useCases/calendar/class/CalendarClassGetByIdUseCase'
import { CalendarClassListUseCase } from '../../shared/useCases/calendar/class/CalendarClassListUseCase'
import { CalendarClassUpdateUseCase } from '../../shared/useCases/calendar/class/CalendarClassUpdateUseCase'
import { CalendarClassListAppointmentsUseCase } from '../../shared/useCases/calendar/class/ListAppointments'

export class CalendarClassController {
  async list(req: Request, res: Response, next: NextFunction) {
    try {
      const data = { ...req.query } as any
      const usecase = new CalendarClassListUseCase()
      const list = await usecase.handle(data)
      return res.json(list)
    } catch (error) {
      next(error)
    }
  }

  async get(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params
      const usecase = new CalendarClassGetByIdUseCase()
      const model = await usecase.handle(id)
      return res.json(model)
    } catch (error) {
      next(error)
    }
  }

  async getAppointments(req: Request, res: Response, next: NextFunction) {
    try {
      const { id: calendarClassId, date } = req.params
      const usecase = new CalendarClassListAppointmentsUseCase()
      const model = await usecase.handle({ calendarClassId, date })
      return res.json(model)
    } catch (error) {
      next(error)
    }
  }

  async store(req: Request, res: Response, next: NextFunction) {
    try {
      const data = { ...req.body }
      const usecase = new CalendarClassCreateUseCase()
      const model = await usecase.handle(data)
      return res.json(model)
    } catch (error) {
      next(error)
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const data = { ...req.params, ...req.body }
      const usecase = new CalendarClassUpdateUseCase()
      const model = await usecase.handle(data)
      return res.json(model)
    } catch (error) {
      next(error)
    }
  }

  async destroy(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params
      const { date } = req.query as any
      const usecase = new CalendarClassDestroyUseCase()
      await usecase.handle({ id, date })
      return res.sendStatus(204)
    } catch (error) {
      next(error)
    }
  }
}

export function makeCalendarClassController() {
  return new CalendarClassController()
}
