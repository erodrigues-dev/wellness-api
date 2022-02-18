import { Request, Response, NextFunction } from 'express'

import { CalendarClassAppointmentCreateUseCase } from '../../shared/useCases/calendar/class-appointment/CalendarClassAppointmentCreateUseCase'
import { CalendarClassAppointmentUpdateUseCase } from '../../shared/useCases/calendar/class-appointment/CalendarClassAppointmentUpdateUseCase'
import { CalendarClassAppointmentCancelUseCase } from '../../shared/useCases/calendar/class-appointment/CalendarClassAppointmentCancelUseCase'

export class CalendarClassAppointmentController {
  async store(req: Request, res: Response, next: NextFunction) {
    try {
      const data = req.body as any
      const model = await new CalendarClassAppointmentCreateUseCase().handle(data)
      return res.status(201).json(model)
    } catch (error) {
      next(error)
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const data = { ...req.params, ...req.body } as any
      await new CalendarClassAppointmentUpdateUseCase().handle(data)
      return res.sendStatus(204)
    } catch (error) {
      next(error)
    }
  }

  async cancel(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params
      await new CalendarClassAppointmentCancelUseCase().handle(id)
      return res.sendStatus(204)
    } catch (error) {
      next(error)
    }
  }
}

export function makeCalendarClassAppointmentController() {
  return new CalendarClassAppointmentController()
}
