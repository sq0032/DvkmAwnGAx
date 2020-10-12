import neatCsv from 'neat-csv';
import moment from 'moment';
import fs from 'fs';
import User from '../../entity/User';
import Plan from '../../entity/Plan';

const parseDate = (dateString: string): Date => {
  const date = moment.utc(dateString, 'MMM DD, yyyy').toDate();
  return date;
}

export default class UserRepo {
  static async fetchUserById(id: string): Promise<User>{

    const csv = fs.readFileSync("data/input.csv");
    const data = await neatCsv(csv);

    const userData = data.filter(row => {
      return row['User Id'] === id;
    })

    if (userData.length === 0) {
      throw new Error('User does not exist');
    }

    const plans = userData.map(row => {
      const storageSize = row['Storage plan'];
      const startDate = row['Appointment Date'];
      const endDate = row['Final Delivery Date/Subscription End Date'];

      return new Plan(
        storageSize,
        parseDate(startDate),
        endDate ? parseDate(endDate) : undefined
      )
    })

    return new User(id, plans);
  }
}