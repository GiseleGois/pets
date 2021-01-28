const { findByAll } = require('../service/pets-service')

module.exports.handler = async (event, context, callback) => {
  try {
    
    let pageSize = event.queryStringParameters.pageSize 

    const pets = await findByAll(pageSize)
    let response

    if (pets.length === 0) {
      response = {
        statusCode: 404,
        body: JSON.stringify({ message: `The pet resouce is empty` })
      }
    } else {
      response = {
        statusCode: 200,
        body: JSON.stringify(pets)
      }
    }
    callback(null, response)

  } catch (exception) {
    console.error(`[PET-CONTROLLER][GET-ALL][EXCEPTION]`, exception)

    const runtimeException = {
      statusCode: 501 || exception.statusCode,
      body: JSON.stringify(`There's an exception in pet-controller[findByAll]: ${exception}`)
    }

    callback(null, runtimeException)
  }

}
