
# Run app

```
  npm i
  npm start

  // Run tset
  npm test
```

Endpoint: `GET http://localhost:3000/{user_id}`

# Assumption
- Date stored in database are UTC based. 
- Endpoint serves UTC based date.

# Code Structure
## API Layer
- `billing.tx` - Open endpoints, serialize request and prepare response.
## Domain Layer
- `repository/UserRepo.tx` - Offers function to fetch user instance by id.
- `entity/User.tx` - User entity contains all subscripted plans a user has since the first purchase, and functions to retrive current billing status.
- `entity/Plan.tx` - Plan entity contains detail info of a plan.