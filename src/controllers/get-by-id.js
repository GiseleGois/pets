const { getById } = require('../service/pets-service')

module.exports.handler = async (event, context, callback) => {
  const id = event.pathParameters.id
  const pet = await getById(id)
  let response

  if (pet) {
    response = {
      statusCode: 200,
      body: JSON.stringify(pet)
    }
  } else {
    response = {
      statusCode: 404,
      body: JSON.stringify({
        message: `Could not fetch pet id ${id}`
      })
    }
  }
  callback(null, response)
}
