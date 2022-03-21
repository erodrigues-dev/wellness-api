import { Router } from 'express'
import { bindRoute } from '../../shared/utils/bindRoute'
import { makeCalendarClassController } from '../controllers/CalendarClassController'
import { makeCalendarSlotController } from '../controllers/CalendarSlotController'
import { makeSchedulerController } from '../controllers/SchedulerController'

const controller = makeSchedulerController()
const calendarClassController = makeCalendarClassController()
const calendarSlotController = makeCalendarSlotController()
const router = Router()

// --> calendars
router.get('/scheduler/calendars', bindRoute(controller, 'calendars'))
router.get('/scheduler/calendars/:id/activities', bindRoute(controller, 'activities'))

// --> items
router.get('/scheduler/items', bindRoute(controller, 'listItems'))

// --> appointments
router.get('/scheduler/appointments/:id', bindRoute(controller, 'getAppointment'))
router.post('/scheduler/appointments', bindRoute(controller, 'addAppointment'))
router.put('/scheduler/appointments/:id', bindRoute(controller, 'updateAppointment'))
router.patch(
  '/scheduler/appointments/:id',
  bindRoute(controller, 'partialUpdateAppointment')
)
router.post(
  '/scheduler/appointments/:id/cancel',
  bindRoute(controller, 'cancelAppointment')
)
router.post(
  '/scheduler/appointments/check-availability',
  bindRoute(controller, 'checkAvailability')
)

// --> classes
router.post('/scheduler/classes', bindRoute(calendarClassController, 'store'))
router.get('/scheduler/classes/:id', bindRoute(calendarClassController, 'get'))
router.get(
  '/scheduler/classes/:id/appointments/:date',
  bindRoute(calendarClassController, 'getAppointments')
)
router.put('/scheduler/classes/:id', bindRoute(calendarClassController, 'update'))
router.delete('/scheduler/classes/:id', bindRoute(calendarClassController, 'destroy'))

// --> blocks
router.post('/scheduler/blocks', bindRoute(calendarSlotController, 'createBlock'))
router.put('/scheduler/blocks/:id', bindRoute(calendarSlotController, 'updateBlock'))
router.delete('/scheduler/blocks/:id', bindRoute(calendarSlotController, 'destroyBlock'))

export default router
