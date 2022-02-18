import { Router } from 'express'
import { bindRoute } from '../../shared/utils/bindRoute'

import { Permission } from '../../shared/models/entities/Permission'
import { checkPermission } from '../../shared/utils/permission'

import { makeCalendarController } from '../controllers/CalendarController'
import { makeCalendarSlotController } from '../controllers/CalendarSlotController'

const calendarController = makeCalendarController()
const slotController = makeCalendarSlotController()

const router = Router()

router.get(
  '/calendars',
  checkPermission(Permission.CalendarList),
  bindRoute(calendarController, 'index')
)
router.get(
  '/calendars/:id',
  checkPermission(Permission.CalendarList),
  bindRoute(calendarController, 'get')
)
router.post(
  '/calendars',
  checkPermission(Permission.CalendarCreateUpdate),
  bindRoute(calendarController, 'store')
)
router.put(
  '/calendars/:id',
  checkPermission(Permission.CalendarCreateUpdate),
  bindRoute(calendarController, 'update')
)
router.delete(
  '/calendars/:id',
  checkPermission(Permission.CalendarDelete),
  bindRoute(calendarController, 'destroy')
)
router.get('/calendars/:id/activities', bindRoute(calendarController, 'listActivities'))

router.get('/calendars/:id/slots', bindRoute(slotController, 'index'))
router.post('/calendars/:id/slots', bindRoute(slotController, 'store'))

export default router
