const respond = (request, response, status, object, type) => {
  // set status code and content type (application/json)
  response.writeHead(status, { 'Content-Type': type });

  response.write(object);

  response.end();
};

const respondJSON = (request, response, status, object) => {
  // set status code and content type (application/json)
  response.writeHead(status, { 'Content-Type': 'application/json' });

  response.write(JSON.stringify(object));

  response.end();
};

// function to show a success status code
const success = (request, response) => {
  // message to send
  const responseJSON = {
    message: 'This is a successful response!',
    id: 'Success',
  };

  // send our json with a success status code
  respondJSON(request, response, 200, responseJSON);
};// end success

const getSuccess = (request, response, status, object, type) => {
  const myResponse = {
    message: 'This is a successful response!',
  };

  if (type === 'text/xml') {
    let responseXML = '<response>';
    responseXML = `${responseXML} <message>${myResponse.message}</message>`;
    responseXML = `${responseXML} <header>${myResponse.header}</header>`;
    responseXML = `${responseXML} </response>`;

    return respond(request, response, 200, responseXML, 'text/xml');
  }

  return respondJSON(request, response, 200, myResponse);
};// get success

// function to show a bad request
const badRequest = (request, response, params) => {
  const responseJSON = {
    message: 'This request has the required parameters',
    id: 'badRequest',
  };

  // if the request does not contain a valid=true query parameter
  if (!params.valid || params.valid !== 'true') {
    // set our error message
    responseJSON.message = 'Missing valid query parameter set to true';
    // error id
    responseJSON.id = 'badRequest';
    // return our json with a 400 bad request code
    return respondJSON(request, response, 400, responseJSON);
  }

  // if the parameter is here, send json with a success status code
  return respondJSON(request, response, 200, responseJSON);
};

const unauthorized = (request, response, params) => {
  const responseJSON = {
    message: 'This request has the required parameters',
  };

  // if the request does not contain a valid=true query parameter
  if (!params.loggedIn) {
    // set our error message
    responseJSON.message = 'Missing loggedIn query parameter set to yes';
    // error id
    responseJSON.id = 'unauthorized';
    // return our json with a 401 bad request code
    return respondJSON(request, response, 401, responseJSON);
  }
  // else return 200 since it had the parameters
  return respondJSON(request, response, 200, responseJSON);
};// end unauth

const forbidden = (request, response) => {
  const responseJSON = {
    message: 'You do not have access to this content ):',
    id: 'forbidden',
  };

  // return our json with a 403 forbidden error code
  respondJSON(request, response, 403, responseJSON);
};// end forbidden

const internal = (request, response) => {
  const responseJSON = {
    message: 'Internal Sever Error. Something went wrong.',
    id: 'internal',
  };

  // return our json with a 500 internal error code
  respondJSON(request, response, 500, responseJSON);
};// end internal

const notImplemented = (request, response) => {
  const responseJSON = {
    message: 'A get request for this page has not been implemented yet. Check again later for updated content.',
    id: 'notImplemented',
  };

  // return our json with a 501 not implemented error code
  respondJSON(request, response, 501, responseJSON);
};// end not implemented

// function to show not found error
const notFound = (request, response) => {
  // error message with a description and consistent error id
  const responseJSON = {
    message: 'The page you are looking for was not found.',
    id: 'notFound',
  };

  // return our json with a 404 not found error code
  respondJSON(request, response, 404, responseJSON);
};

module.exports = {
  success,
  getSuccess,
  badRequest,
  unauthorized,
  forbidden,
  internal,
  notImplemented,
  notFound,
};
