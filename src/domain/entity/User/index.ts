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

  getFirstActivePlan(): Plan | undefined {
    let firstActivePlan;
    for(let i=0; i<this.plans.length; i+=1) {
      if(this.plans[i].isActive()) {
        firstActivePlan = this.plans[i];
        break;
      }
    }

    return firstActivePlan;
  }

  getNextBillingDate(): Date | undefined {
    const firstActivePlan = this.getFirstActivePlan();
    if (!firstActivePlan) {
      return undefined;
    }

    return firstActivePlan.getNextBillingDate();
  }

  getPlanStartDate(): Date {
    const firstActivePlan = this.getFirstActivePlan();
    if (firstActivePlan) {
      return firstActivePlan.startDate;
    } else {
      return this.plans[0].startDate;
    }
  }

  isActive(): boolean {
    const firstActivePlan = this.getFirstActivePlan();
    return firstActivePlan !== undefined;
  }
}