const userData = [{ name: 'Duy', age: '22' }];

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
      object = getUsers();
      response.writeHead(200, 'Content-Type: application/json');
      response.write(JSON.stringify(userData));
      response.end();
      break;
    case '/notReal':
      object = {
        id: 'NotFound',
        message: 'No resource has been found',
      };
      response.writeHead(404, 'Content-Type: application/json');
      response.write(JSON.stringify(object));
      response.end();
      break;
    default:
      console.log('Unexpected Error at Url PathName');
      break;
  }
};

const getMetaData = (request, response, pathName) => {
  switch (pathName) {
    case '/getUsers':
      response.writeHead(200, 'Content-Type: application/json');
      response.end();
      break;
    case '/notReal':
      response.writeHead(404, 'Content-Type: application/json');
      response.end();
      break;
    default:
      console.log('Unexpected Error at Url PathName (metadata)');
      break;
  }
};

module.exports = {
  getResponse,
  getMetaData,

};
