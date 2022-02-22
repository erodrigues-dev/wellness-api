import { Router } from 'express'
import { bindRoute } from '../../shared/utils/bindRoute'
import { makeSchedulerController } from '../controllers/SchedulerController'

const controller = makeSchedulerController()
const router = Router()

router.get('/scheduler/calendars', bindRoute(controller, 'calendars'))
router.get('/scheduler/calendars/:id/activities', bindRoute(controller, 'activities'))
router.get('/scheduler/slots', bindRoute(controller, 'slots'))

router.get('/scheduler/items', bindRoute(controller, 'listItems'))
router.get('/scheduler/items/:id', bindRoute(controller, 'getItem'))
router.post('/scheduler/appointments', bindRoute(controller, 'addAppointment'))
router.put('/scheduler/appointments/:id', bindRoute(controller, 'updateAppointment'))
router.post(
  '/scheduler/appointments/:id/cancel',
  bindRoute(controller, 'cancelAppointment')
)

export default router
