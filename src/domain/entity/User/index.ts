import Plan from '../Plan';

export default class User {
  id: string;
  plans: Plan[];

  constructor(id: string, plans: Plan[] = []) {
    this.id = id;
    this.plans = plans;
  }

  getLatestPlan(): Plan | undefined {
    const length = this.plans.length;
    if (length === 0) {
      return undefined;
    }
    return this.plans[this.plans.length-1];
  }
}