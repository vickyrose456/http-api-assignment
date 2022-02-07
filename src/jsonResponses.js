const respondJSON = (request, response, status, object) => {
  //set status code and content type (application/json)
  response.writeHead(status, { 'Content-Type': 'application/json' });
  
  response.write(JSON.stringify(object));
 
  response.end();
};

//function to show a success status code
const success = (request, response) => {
  //message to send
  const responseJSON = {
    message: 'This is a successful response!',
  };

  //send our json with a success status code
  respondJSON(request, response, 200, responseJSON);
};//end success 

//function to show a bad request
const badRequest = (request, response, params) => {
  const responseJSON = {
    message: 'This request has the required parameters',
  };

  //if the request does not contain a valid=true query parameter
  if(!params.valid || params.valid !== 'true') {
    //set our error message
    responseJSON.message = 'Missing valid query parameter set to true';
    //error id 
    responseJSON.id = 'badRequest';
    //return our json with a 400 bad request code
    return respondJSON(request, response, 400, responseJSON);
  }

  //if the parameter is here, send json with a success status code
  return respondJSON(request, response, 200, responseJSON);
};

const unauthorized = (request, response, params) =>{
  const responseJSON = {
    message: "This request has the required parameters",
  };

  //if the request does not contain a valid=true query parameter
  if(!params.loggedIn) {
    //set our error message
    responseJSON.message = 'Missing loggedIn query parameter set to yes';
    //error id 
    responseJSON.id = 'unauthorized';
    //return our json with a 401 bad request code
    return respondJSON(request, response, 401, responseJSON);
  }
  //else return 200 since it had the parameters
  return respondJSON(request, response, 200, responseJSON);
}//end unauth

//function to show not found error
const notFound = (request, response) => {
  //error message with a description and consistent error id
  const responseJSON = {
    message: 'The page you are looking for was not found.',
    id: 'notFound',
  };

  //return our json with a 404 not found error code
  respondJSON(request, response, 404, responseJSON);
};

module.exports = {
  success,
  badRequest,
  unauthorized,
  notFound,
};
