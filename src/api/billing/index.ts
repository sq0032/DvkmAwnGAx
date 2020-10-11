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

// define the home page route
router.get('/', function (req, res) {
  res.send('Hello world');
})

// define the about route
router.get('/:userId', runAsyncWrapper(
  async (req: express.Request, res: express.Response) => {
    const user = await UserRepo.fetchUserById(req.params.userId);
    const currentPlan = user.getLatestPlan();

    if (!currentPlan) {
      res.send('User has no plan');
      return;
    }

    const nextBillingDate = currentPlan.getNextBillingDate();
    const isActive = currentPlan.isActive();

    const output = {
      userId: user.id,
      currentPlan: isActive ? currentPlan.storageSize : '',
      startDate: currentPlan.startDate ? moment(currentPlan.startDate).format('MMM DD, yyyy') : '',
      nextBillingDate: nextBillingDate ? moment(nextBillingDate).format('MMM DD, yyyy') : '',
      isActive,
    };
    res.json(output);
  })
);


export default router;