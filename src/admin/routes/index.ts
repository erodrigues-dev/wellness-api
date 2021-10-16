import { Router } from 'express';

import activityRouter from './ActivityRouter';
import categoryRouter from './CategoryRouter';
import checkoutRouter from './CheckoutRouter';
import customerDiscountRouter from './CustomerDiscountRouter';
import customerRouter from './CustomerRouter';
import domainRouter from './DomainRouter';
import employeeRouter from './EmployeeRouter';
import eventRouter from './EventRouter';
import orderRouter from './OrderRouter';
import packageRouter from './PackageRouter';
import profileRouter from './ProfileRouter';
import scheduleRouter from './ScheduleRouter';
import sessionRouter from './SessionRouter';
import specialtyRouter from './SpecialtyRouter';
import waiverRouter from './WaiverRouter';
import customerWaiverRouter from './CustomerWaiverRouter';
import workoutRouter from './WorkoutRouter';
import notificationRouter from './NotificationRouter';
import calendarRouter from './CalendarRouter';
import calendarSlotRouter from './CalendarSlotRouter';

const router = Router();

router.use(sessionRouter);
router.use(activityRouter);
router.use(eventRouter);
router.use(customerRouter);
router.use(employeeRouter);
router.use(packageRouter);
router.use(profileRouter);
router.use(categoryRouter);
router.use(customerDiscountRouter);
router.use(orderRouter);
router.use(checkoutRouter);
router.use(scheduleRouter);
router.use(domainRouter);
router.use(specialtyRouter);
router.use(waiverRouter);
router.use(customerWaiverRouter);
router.use(workoutRouter);
router.use(notificationRouter);
router.use(calendarRouter);
router.use(calendarSlotRouter);

export default router;
