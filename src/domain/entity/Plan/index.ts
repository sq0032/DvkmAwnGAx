const converMonthIndexToString = (month: number): string => {
  if(month < 10) {
    return `0${month}`;
  }
  return `${month}`;
}

export default class Plan {
  // ex: 2x2, 5x3, ...
  storageSize: string;

  // First delivery appointment date
  startDate: Date;

  // Final delivery | Subscription end date
  endDate?: Date;

  constructor(storageSize: string, startDate: Date, endDate?: Date) {
    this.storageSize = storageSize;
    this.startDate = startDate;
    this.endDate = endDate;
  }

  isActive(): boolean {
    return this.endDate === undefined;
  }

  getNextBillingDate(now: Date = new Date()): Date | undefined {
    if (!this.isActive()) {
      return undefined;
    }

    const planStartDate = this.startDate.getUTCDate();

    const curYear = now.getFullYear();
    const curMonth = now.getUTCMonth()+1;
    const curDate = now.getUTCDate();

    let nextBillDate;
    if (curDate >= planStartDate) {
      // Bill next month
      const billYear = curYear + Math.floor((curMonth+1)/12);
      const billMonth = converMonthIndexToString((curMonth+1)%12);

      // Check is bill date should be the end of the month
      const lengthOfTargetMonth = new Date(curYear, curMonth+1, 0).getDate();
      const billDate = Math.min(planStartDate, lengthOfTargetMonth);

      nextBillDate = new Date(`${billYear}-${billMonth}-${billDate}`);
    } else {
      // Bill this month
      const billMonth = converMonthIndexToString(curMonth);

      // Check is bill date should be the end of the month
      const lengthOfTargetMonth = new Date(curYear, curMonth, 0).getDate();
      const billDate = Math.min(planStartDate, lengthOfTargetMonth);

      nextBillDate = new Date(`${curYear}-${billMonth}-${billDate}`);
    }

    return nextBillDate;
  }
}