const userData = {};
const writeMetaData = (resquest, response, statusCode) => {
  response.writeHead(statusCode, 'Content-Type: application/json');
  response.end();
};
const writeResponse = (request, response, statusCode, object) => {
  response.writeHead(statusCode, 'Content-Type: application/json');
  response.write(JSON.stringify(object));
  response.end();
};
const addUser = (request, response, userParams) => {
  // if missing parameter
  let message;
  if (!userParams.name || !userParams.age) {
    message = {
      message: 'POST request failed: Missing Parameters',
    };
    writeResponse(request, response, 400, message);
    return;
  }
  // update exist user
  if (userData[userParams.name]) {
    userData[userParams.name].name = userParams.name;
    userData[userParams.name].age = userParams.age;
    writeMetaData(request, response, 204);
    return;
  }

  // create new user
  userData[userParams.name] = {
    name: `${userParams.name}`,
    age: userParams.age,
  };
  message = {
    message: `User ${userParams.name} Created`,
  };
  console.log(message);
  writeResponse(request, response, 201, message);
};

// return a javascript obj
const getUsers = () => {
  const users = {
    userData,
  };
  return users;
};
let object;
const getResponse = (request, response, pathName) => {
  switch (pathName) {
    case '/getUsers':
      console.log('Cased Handled: checked');
      object = getUsers();
      writeResponse(request, response, 200, object);
      break;
    default:
      // not real
      object = {
        id: 'NotFound',
        message: 'No resource has been found',
      };
      writeResponse(request, response, 404, object);
      break;
  }
};

const getMetaData = (request, response, pathName) => {
  switch (pathName) {
    case '/getUsers':
      writeMetaData(request, response, 200);
      break;
    case '/notReal':
      writeMetaData(request, response, 404);
      break;
    default:
      console.log('Unexpected Error at Url PathName (metadata)');
      break;
  }
};

module.exports = {
  getResponse,
  getMetaData,
  addUser,

};
