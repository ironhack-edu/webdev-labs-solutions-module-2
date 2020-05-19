const permissions = {
  BOSS: {
    users: ['ADD', 'EDIT', 'DELETE'],
    courses: ['ADD', 'EDIT', 'DELETE']
  }, 
  TA: {
    users: ['EDIT'],
    courses: ['ADD', 'EDIT', 'DELETE']   
  },
  STUDENT: {
    users: ['EDIT'],
    courses: []
  }
};

const rolesMiddleware = {
  checkRole: (req, res, next, action) => {
    if (req.isAuthenticated() && permissions[req.user.role][action] === action) {
      next();
    } else {
      res.send(`You're not authorized!`);
    }
  },
  checkBoss: (req, res, next) => {
    if (req.isAuthenticated() && req.user.role === 'BOSS') {
      next();
    } else {
      res.send(`You're not authorized!`);
    }
  },
  checkDev: (req, res, next) => {
    if (req.isAuthenticated() && req.user.role === 'DEV') {
      next();
    } else {
      res.send(`You're not authorized!`);
    }
  },
  checkTA: (req, res, next) => {
    if (req.isAuthenticated() && req.user.role === 'TA' || req.user.role === 'BOSS') {
      next();
    } else {
      res.send(`You're not authorized!`);
    }
  },
  checkStudent: (req, res, next) => {
    if (req.isAuthenticated() && req.user.role === 'STUDENT') {
      next();
    } else {
      res.send(`You're not authorized!`);
    }
  }
}

module.exports = { checkRole, checkBoss, checkTA } = rolesMiddleware;