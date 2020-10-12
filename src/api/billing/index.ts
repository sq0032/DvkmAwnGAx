import express from 'express';
import moment from 'moment';
import UserRepo from '../../domain/repository/UserRepo';
const router = express.Router();

function runAsyncWrapper(callback: any) {
  return function (req: express.Request, res: express.Response, next: express.NextFunction) {
    callback(req, res, next)
      .catch(next)
  }
}

router.get('/', function (req, res) {
  res.send('Endpoint: /{userId}');
})

router.get('/:userId', runAsyncWrapper(
  async (req: express.Request, res: express.Response) => {
    const user = await UserRepo.fetchUserById(req.params.userId);
    const currentPlan = user.getLatestPlan();

    if (!currentPlan) {
      res.send('User has no plan');
      return;
    }

    const firstActivePlan = user.getFirstActivePlan();

    // Prepare output data
    const startDate = user.getPlanStartDate();
    const nextBillingDate = firstActivePlan ? firstActivePlan.getNextBillingDate() : '';
    const isActive = user.isActive();

    const output = {
      userId: user.id,
      currentPlan: isActive ? currentPlan.storageSize : '',
      startDate: startDate ? moment.utc(startDate).format('MMM D, yyyy') : '',
      nextBillingDate: nextBillingDate ? moment.utc(nextBillingDate).format('MMM D, yyyy') : '',
      isActive,
    };
    res.json(output);
  })
);


export default router;