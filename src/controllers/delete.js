const { getById, remove } = require('../service/pets-service')

module.exports.handler = async (event, context, callback) => {

  try {
    const pet = await getById(event.pathParameters.id)

    if (!pet) {
      const notFound = {
        statusCode: 404,
        body: JSON.stringify({
          message: `It was not possible to fetch this pet id ${event.pathParameters.id}`
        })
      }
      callback(null, notFound)
    }

    await remove(pet)

    callback(null, { statusCode: 200, body: JSON.stringify(pet) })
  } catch (exception) {
    console.error(`[PET-CONTROLLER][DELETE][EXCEPTION]`, exception)

    const runtimeException = {
      statusCode: 501 || exception.statusCode,
      body: JSON.stringify(`There's an exception in pet-controller[remove]: ${exception}`)
    }
    callback(null, runtimeException)
  }
}


