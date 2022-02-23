import { Router } from 'express'
import { bindRoute } from '../../shared/utils/bindRoute'
import { makeCalendarClassController } from '../controllers/CalendarClassController'
import { makeSchedulerController } from '../controllers/SchedulerController'

const controller = makeSchedulerController()
const calendarClassController = makeCalendarClassController()
const router = Router()

// --> calendars
router.get('/scheduler/calendars', bindRoute(controller, 'calendars'))
router.get('/scheduler/calendars/:id/activities', bindRoute(controller, 'activities'))

// --> slots
router.get('/scheduler/slots', bindRoute(controller, 'slots'))

// --> items
router.get('/scheduler/items', bindRoute(controller, 'listItems'))
router.get('/scheduler/items/:id', bindRoute(controller, 'getItem'))

// --> appointments
router.post('/scheduler/appointments', bindRoute(controller, 'addAppointment'))
router.put('/scheduler/appointments/:id', bindRoute(controller, 'updateAppointment'))
router.post(
  '/scheduler/appointments/:id/cancel',
  bindRoute(controller, 'cancelAppointment')
)

// --> classes
router.post('/scheduler/classes', bindRoute(calendarClassController, 'store'))
router.put('/scheduler/classes/:id', bindRoute(calendarClassController, 'update'))
router.delete('/scheduler/classes/:id', bindRoute(calendarClassController, 'destroy'))

export default router
