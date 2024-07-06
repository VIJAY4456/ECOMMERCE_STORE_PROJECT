module.exports = (theFunc) => (req, res, next) => {
  Promise.resolve(theFunc(req, res, next)).catch(next);
};

//hme baar try catch block use krne ki jrrort nhi h ...ye automatically error handle krega 
// The function you've provided is a higher-order function often used in Express.js applications to 
// handle asynchronous route handlers and middleware. This function is used to automatically catch errors in asynchronous
//  functions and pass them to the next middleware, usually an error-handling middleware.

// Traditional try-catch: You manually wrap each asynchronous operation 
// in a try-catch block to handle errors. This can lead to repetitive code, especially when you have many asynchronous route handlers.

// Higher-Order Function: You define a reusable higher-order function that 
// automatically handles errors for any asynchronous route handler or middleware passed to it.
//  This approach reduces repetition and keeps your route handlers clean and focused on their primary logic.

// The function you've provided is a higher-order function often used in Express.js applications to 
// handle asynchronous route handlers and middleware. This function is used to automatically catch errors in asynchronous
//  functions and pass them to the next middleware, usually an error-handling middleware.