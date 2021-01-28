const { bodyValidator } = require('../helpers/bodyValidator')
const { getById, update } = require('../service/pets-service')

module.exports.handler = async (event, context, callback) => {

  try {
    const canonical = JSON.parse(event.body)
    const errors = bodyValidator(canonical)

    if (errors.length > 0) {
      return callback(null, { statusCode: 422, body: JSON.stringify({ errors }) })
    }

    const pet = await getById(event.pathParameters.id)

    if (!pet) {
      callback(null, {
        statusCode: 404,
        body: JSON.stringify({
          message: `It was not possible to fetch this pet id ${event.pathParameters.id}`
        })
      })
    }

    pet.name = canonical.name
    pet.breed = canonical.breed
    pet.age = canonical.age
    pet.weigth = canonical.weigth

    await update(pet)

    callback(null, { statusCode: 200, body: JSON.stringify(pet) })

  } catch (exception) {
    console.error(`[PET-CONTROLLER][UPDATE][EXCEPTION]`, exception)

    const runtimeException = {
      statusCode: 501 || exception.statusCode,
      body: JSON.stringify(`There's an exception in pet-controller[update]: ${exception}`)
    }
    callback(null, runtimeException)
  }
}