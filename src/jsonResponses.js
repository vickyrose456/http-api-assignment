// Note this object is purely in memory
const users = {};

const respondJSON = (request, response, status, object) => {
  const headers = {
    'Content-Type': 'application/json',
  };
  response.writeHead(status, headers);
  response.write(JSON.stringify(object));
  response.end();
};//end respond JSON

const respondJSONMeta = (request, response, status) => {
  const headers = {
    'Content-Type': 'application/json',
  };
    // send back info of the data, not the data itself
  response.writeHead(status, headers);
  response.end();
};//end Respond JSON Meta

const getUsers = (request, response) => {
  const responseJSON = {
    users,
  };

  return respondJSON(request, response, 200, responseJSON);
};

const getUsersMeta = (request, response) => respondJSONMeta(request, response, 200);

const updateUser = (request, response) => {
  // want to add to the object
  const newUser = {
  };

  // now tht its created, add it
  // dont use thisin other applications b/c 2 people could be created at the same time
  users[newUser.createdAt] = newUser;
  return respondJSON(request, response, 201, newUser);
};

const notFound = (request, response) => {
  const responseJSON = {
    message: 'The page cannot be found!',
    id: 'notFound',
  };

  return respondJSON(request, response, 200, responseJSON);
};

const notFoundMeta = (request, response) => respondJSONMeta(request, response, 404);

module.exports = {
  getUsers,
  getUsersMeta,
  updateUser,
  notFound,
  notFoundMeta,
};
