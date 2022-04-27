//Salaus frontend - backend
const jwt = require("jsonwebtoken");

//Salaus salasanaan
const bcrypt = require("bcryptjs");
const User = require('../models/userModel')
//sql connection



//Store refreshtokens
let refreshTokens = [];

//ULOSKIRJAUTUESSA POISTAA TUOSTA!!!
//ULOSKIRJAUTUESSA POISTAA TUOSTA!!!
//ULOSKIRJAUTUESSA POISTAA TUOSTA!!!

const register = function(req, res) {
  var newUser = new User(req.body);
  newUser.hash_password = bcrypt.hashSync(req.body.password, 10);
  newUser.save(function(err, user) {
    if (err) {
      return res.status(400).send({
        message: err
      });
    } else {
      user.hash_password = undefined;
      return res.json(user);
    }
  });
};


const login = async (req, res, next) => {
  const req_email = req.body.email;
  const req_password = req.body.password;
  
  //console.log("[auth.js] (login) req.body:", req.body);

  const user = await getUser(req_email);
  console.log("[auth.js] (login) User:", user);

  if (!user) return res.json({ message: "error", code: 1 });
  if (!user.hash_password) return res.json({ message: "error", code: 2 });

  const isPasswordValid = await checkPassword(req_password, user.hash_password);
  console.log("[auth.js] (login) isPasswordValid:", isPasswordValid);

  if (!isPasswordValid) return res.json({ message: "error", code: 3 });

  const accessToken = generateAccessToken(user.email);
  const refreshToken = generateRefreshToken(user.email);

  console.log("[auth.js] (login) accessToken:", accessToken);
  console.log("[auth.js] (login) refreshToken:", refreshToken);

  refreshTokens.push({
    user: { mail: user.email },
    refreshToken: refreshToken,
  });

  console.log('refreshTokens:', refreshTokens)

  res.json({
    message: "User logged in: user.fullName",
    accessToken: accessToken,
    refreshToken: refreshToken,
  });

  //UserLoginToDb(user.MobileKayttajatunnus, refreshToken);
};

// const UserLoginToDb = (email, refreshToken) => {
//   let query = `UPDATE KTKayttaja SET MobileRefreshToken = @MobileRefreshToken WHERE MobileKayttajatunnus = @MobileKayttajatunnus`;

//   let params = {
//     MobileKayttajatunnus: { data: email, type: TYPES.NVarChar },
//     MobileRefreshToken: { data: refreshToken, type: TYPES.NVarChar },
//   };

//   sql.queryDatabase(query, params, function (error, results) {
//     if (error) {
//       console.log("[auth.js] (getUser) error:", error.message);
//       console.log(error.message);
//     }
//     //console.log(results);
//   });
// };



//Kun sovelluksen käynnistää uudelleen ja useri on kirjautunenna, haetaan userin data
const refreshUser = async (req, res, next) => {
  const req_email = req.user.identifier;

  if (!req_email) {
    return res.status(401).json("not authenticated!");
  }

  const user = await getUser(req_email);

  if (!user) {
    return res.status(403).json("user not found!");
  }
};


//Get User from database
const getUser = async (email) => {
  const user = await User.findOne({
      email: email
    });
    return user;
  };



//Check password from request and database result
const checkPassword = (password, hash) =>
  bcrypt.compare(password || "", hash || "");

//Generate token for user
const generateAccessToken = (identifier) => {
  return jwt.sign({ identifier: identifier }, process.env.ACCESS_SECRET, {
    expiresIn: "1h",
    algorithm: "HS256",
  });
};

//Generate Refreshtoken for user
const generateRefreshToken = (identifier) => {
  return jwt.sign({ identifier: identifier }, process.env.REFRESH_SECRET);
};


//Hashesh password for new users
const hashPassword = (password) => {
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(10, (err, salt) => {
      if (err) reject(err);
      bcrypt.hash(password, salt, (err, hash) => {
        if (err) reject(err);
        console.log(hash);
        resolve(hash);
      });
    });
  });
};

const refreshTokenCall = async (req, res, next) => {
  const { refreshToken } = req.body;
  console.log(req.body)
  console.log("[refreshTokenCall] refreshToken: ", refreshToken);

  if (!refreshToken) return res.status(401).json("not authenticated!");

  console.log('refreshTokens:', refreshTokens)

  const refreshtokenFound = refreshTokens.find(element => element.refreshToken == refreshToken);
  console.log('refreshtokenFound:', refreshtokenFound)
  if (!refreshtokenFound) return res.status(403).json("Refresh token is not valid!");

  jwt.verify(refreshToken, process.env.REFRESH_SECRET, (err, user) => {
    err && console.log('[auth.js] refreshTokenCall verify error:', err);


    refreshTokens = refreshTokens.filter((data) => data.refreshToken !== refreshToken);

    console.log('user2', user)

    const newAccessToken = generateAccessToken(user.identifier);
    const newRefreshToken = generateRefreshToken(user.identifier);

    refreshTokens.push({
      user: { mail: user.identifier },
      refreshToken: newRefreshToken,
    });
    
    console.log('refreshTokens:', refreshTokens)

    res.json({
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    });
  });
};

//Middleware checking token
const isAuth = (req, res, next) => {
  const authHeader = req.get("Authorization");
  //console.log("[isAuth] Token:", authHeader);

  if (!authHeader) {
    return res.status(401).json({ message: "not authenticated" });
  }

  const token = authHeader.split(" ")[1];

  jwt.verify(token, process.env.ACCESS_SECRET, (err, user) => {
    if (err) {
      if (err?.message === "jwt expired") return res.status(401).json({ message: "jwt expired" });
      return res.status(403).json("Token is not valid!");
    }

    req.user = user;
    next();
  });
};

module.exports = {register, login, isAuth, refreshTokenCall, refreshUser };
