// ***************************************************************************
// Iteration 1 - `for...of` loop
// ***************************************************************************

const getFirstNames = arr => {
  const userFirstNames = [];
  for (let user of arr) {
    userFirstNames.push(user.firstName);
    // or:
    // const { firstName } = user;
    // userFirstNames.push(firstName)
  }

  return userFirstNames;
};

getFirstNames(usersArray);

// console.log('userFirstNames', userFirstNames);

// ***************************************************************************
// Iteration 2 - `for...of` loop and ES6 string literals `${}`
// ***************************************************************************

const getFullNames = arr => {
  const userFullNames = [];
  for (let user of arr) {
    userFullNames.push(`${user.firstName} ${user.lastName}`);
  }
  return userFullNames;
};

getFullNames(usersArray);

// ***************************************************************************
// Iteration 3 - ES6 destructuring , for of loop, object literal
// ***************************************************************************

const getUsersCreditDetails = arr => {
  const usersCreditDetails = [];

  for (const el of arr) {
    let { firstName, lastName, balance } = el;
    usersCreditDetails.push({ firstName, lastName, balance });
    // or:
    // const data = { firstName, lastName, balance };
    // usersCreditDetails.push(data);
  }

  return usersCreditDetails;
};

getUsersCreditDetails(usersArray);

// ***************************************************************************
// Iteration 4 - practice `.filter()` method and how to return two elements
// ***************************************************************************

const genderView = users => {
  const femaleUsers = [];
  const maleUsers = [];
  users.filter(user => {
    if (user.gender === 'female') femaleUsers.push(`${user.firstName} ${user.lastName}`);
    else maleUsers.push(`${user.firstName} ${user.lastName}`);
  });
  return {
    femaleUsers,
    maleUsers
  };
};

genderView(usersArray);

// ***************************************************************************
// Bonus - Iteration 5
// ***************************************************************************

const data = genderView(usersArray);

const genderCounts = someObject => {
  // console.log(Object.keys(someObject));
  //  console.log(someObject);
  const females = someObject.femaleUsers;
  const males = someObject.maleUsers;
  for (let key of Object.keys(someObject)) {
    // console.log(key)
    if (key === 'femaleUsers') console.log(`Female: ${females.length}`);
    else console.log(`Male: ${males.length}`);
  }
};

genderCounts(data);

// ***************************************************************************
// Bonus - Iteration 6
// ***************************************************************************

const promo20 = users => {
  return users
    .filter(user => {
      let { balance } = user;
      // console.log(typeof user.balance)
      let cleaned = +balance.substring(1).split(',')[0];
      // console.log(typeof cleaned)
      if (cleaned > 20) return user;
    })
    .map(user =>
      console.log(
        `Dear ${user.firstName}, since your balance is ${user.balance}, you are eligible to apply for this awesome credit card.`
      )
    );
};

promo20(usersArray);

// ***************************************************************************
// Bonus - Iteration 7
// ***************************************************************************

const addActive = users => {
  return users.map(user => {
    return {
      ...user,
      isActive: true
    };
  });
};

addActive(usersArray);
