import { Router } from 'express'
import { bindRoute } from '../../shared/utils/bindRoute'
import { makeCalendarClassAppointmentController } from '../controllers/CalendarClassAppointmentController'
import { makeSchedulerController } from '../controllers/SchedulerController'

const controller = makeSchedulerController()
const calendarClassAppointmentController = makeCalendarClassAppointmentController()
const router = Router()

router.get('/scheduler/calendars', bindRoute(controller, 'calendars'))
router.get('/scheduler/calendars/:id/activities', bindRoute(controller, 'activities'))
router.get('/scheduler/slots', bindRoute(controller, 'slots'))

router.get('/scheduler/items', bindRoute(controller, 'listItems'))
router.get('/scheduler/items/:id', bindRoute(controller, 'getItem'))
router.post('/scheduler/items', bindRoute(controller, 'addItem'))
router.put('/scheduler/items/:id', bindRoute(controller, 'updateItem'))
router.post('/scheduler/items/:id/cancel', bindRoute(controller, 'cancelItem'))

router.post(
  '/scheduler/classes/appointments',
  bindRoute(calendarClassAppointmentController, 'store')
)
router.put(
  '/scheduler/classes/appointments/:id',
  bindRoute(calendarClassAppointmentController, 'update')
)
router.post(
  '/scheduler/classes/appointments/:id/cancel',
  bindRoute(calendarClassAppointmentController, 'cancel')
)

export default router
