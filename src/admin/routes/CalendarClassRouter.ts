import { Router } from 'express'
import { bindRoute } from '../../shared/utils/bindRoute'
import { makeCalendarClassController } from '../controllers/CalendarClassController'

const controller = makeCalendarClassController()
const router = Router()

router.get('/calendar-class', bindRoute(controller, 'list'))
router.post('/calendar-class', bindRoute(controller, 'store'))
router.put('/calendar-class/:id', bindRoute(controller, 'update'))
router.delete('/calendar-class/:id', bindRoute(controller, 'destroy'))

export default router
