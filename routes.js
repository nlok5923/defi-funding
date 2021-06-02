const routes = require('next-routes')();
// return function and function is invoked right after requriring it using () after require statement
routes
   .add('/campaigns/new', 'campaigns/new')
   .add('/campaigns/:address', '/campaigns/show');
//what component we want to show 
module.exports = routes;