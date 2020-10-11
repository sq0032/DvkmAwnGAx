import Plan from './index';

describe('Plan' , () => {
  it('should new a user', () => {
    const startDate = new Date('2019-01-15');
    const endDate = new Date('2020-03-15');
    const plan = new Plan('2x2', startDate, endDate);
    
    expect(plan.storageSize).toEqual('2x2');
    expect(plan.startDate).toEqual(startDate);
    expect(plan.endDate).toEqual(endDate);
  })
  
  describe('should return next billing date', ()=> {
    describe('Active user: start on Jan 20', () => {
      const startDate = new Date('2020-01-20');
      const plan = new Plan('2x2', startDate);

      it('Should return "2020 Jun 20" on the date "2020 Jun 10"', () => {
        const curDate = new Date('2020-06-10');
        const expectBillingDate = new Date('2020-06-20');
  
        expect(plan.getNextBillingDate(curDate)).toEqual(expectBillingDate);
      });      
      it('Should return "2020 Jul 20" on the date "2020 Jun 20"', () => {
        const curDate = new Date('2020-06-20');
        const expectBillingDate = new Date('2020-07-20');
  
        expect(plan.getNextBillingDate(curDate)).toEqual(expectBillingDate);
      });
      it('Should return "2021 Jan 20" on the date "2020 Dec 23"', () => {
        const curDate = new Date('2020-12-23');
        const expectBillingDate = new Date('2021-01-20');
  
        expect(plan.getNextBillingDate(curDate)).toEqual(expectBillingDate);
      });      
    }); 

    describe('Active user: start on Jan 31 (end of month)', () => {
      const startDate = new Date('2020-01-31');
      const plan = new Plan('2x2', startDate);

      it('Should return "2020 Apr 30" on the date "2020 Apr 10"', () => {
        const curDate = new Date('2020-04-10');
        const expectBillingDate = new Date('2020-04-30');
  
        expect(plan.getNextBillingDate(curDate)).toEqual(expectBillingDate);
      });      
      it('Should return "2020 Dec 31" on the date "2020 Dec 1"', () => {
        const curDate = new Date('2020-12-01');
        const expectBillingDate = new Date('2020-12-31');
  
        expect(plan.getNextBillingDate(curDate)).toEqual(expectBillingDate);
      });
      it('Should return "2021 Jan 31" on the date "2020 Dec 31"', () => {
        const curDate = new Date('2020-12-31');
        const expectBillingDate = new Date('2021-01-31');
  
        expect(plan.getNextBillingDate(curDate)).toEqual(expectBillingDate);
      });      
    }); 
    it('inactive user: Should return undefined', () => {
      const startDate = new Date('2020-01-31');
      const endDate = new Date('2020-05-31');
      const plan = new Plan('2x2', startDate, endDate);

      const curDate = new Date('2020-12-25');
      expect(plan.getNextBillingDate(curDate)).toEqual(undefined);
    });
  })
})