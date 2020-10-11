import UserRepo from './index';

describe('UserRepo' , () => {
  it('should fetch user by id', async() => {
    const user = await UserRepo.fetchUserById('user_hc');
    
    expect(user.plans.length).toEqual(2);
  })
  
  it('should throw error is user not exists', async() => {
    try {
      await UserRepo.fetchUserById('user_not_exist');
    } catch (e) {
      expect(e.message).toEqual('User does not exist');
    }
  });
})