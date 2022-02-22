import { Request, Response, NextFunction } from 'express'

import { CalendarService } from '../../shared/services/CalendarService'
import { CalendarAddAppointmentUseCase } from '../../shared/useCases/calendar/appointment/AddAppointment'
import { SchedulerGetItemUseCase } from '../../shared/useCases/calendar/scheduler/SchedulerGetItemUseCase'
import { SchedulerListItemsUseCase } from '../../shared/useCases/calendar/scheduler/SchedulerListItemsUseCase'
import { SchedulerCancelItemUseCase } from '../../shared/useCases/calendar/scheduler/SchedulerCancelItemUseCase'
import { SchedulerSlotUseCase } from '../../shared/useCases/calendar/scheduler/SchedulerSlotsUseCase'
import { CalendarUpdateAppointmentUseCase } from '../../shared/useCases/calendar/appointment/UpdateAppointment'

export class SchedulerController {
  async calendars(req: Request, res: Response, next: NextFunction) {
    try {
      const service = new CalendarService()
      const list = await service.listAll()
      return res.json(list)
    } catch (error) {
      next(error)
    }
  }

  async activities(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params
      const service = new CalendarService()
      const result = await service.listActivities(id)
      return res.json(result)
    } catch (error) {
      next(error)
    }
  }

  async slots(req: Request, res: Response, next: NextFunction) {
    try {
      const { calendars } = req.query
      const usecase = new SchedulerSlotUseCase()
      const list = await usecase.list(calendars)
      return res.json(list)
    } catch (error) {
      next(error)
    }
  }

  async listItems(req: Request, res: Response, next: NextFunction) {
    try {
      const usecase = new SchedulerListItemsUseCase()
      const list = await usecase.list(req.query)
      return res.json(list)
    } catch (error) {
      next(error)
    }
  }

  async getItem(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params
      const usecase = new SchedulerGetItemUseCase()
      const model = await usecase.handle(id)
      return res.json(model)
    } catch (error) {
      next(error)
    }
  }

  async addAppointment(req: Request, res: Response, next: NextFunction) {
    try {
      const useCase = new CalendarAddAppointmentUseCase()
      const model = await useCase.handle(req.body)
      return res.json(model)
    } catch (error) {
      next(error)
    }
  }

  async updateAppointment(req: Request, res: Response, next: NextFunction) {
    try {
      const data = { ...req.params, ...req.body }
      const usecase = new CalendarUpdateAppointmentUseCase()
      await usecase.handle(data)
      return res.sendStatus(204)
    } catch (error) {
      next(error)
    }
  }

  async cancelAppointment(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params
      const usecase = new SchedulerCancelItemUseCase()
      await usecase.handle(id)
      return res.sendStatus(204)
    } catch (error) {
      next(error)
    }
  }
}

export const makeSchedulerController = () => new SchedulerController()
