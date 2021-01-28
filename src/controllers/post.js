const { bodyValidator } = require('../helpers/bodyValidator')
const { createPet } = require('../service/pets-service')

module.exports.handler = async (event, context, callback) => {
  const canonical = JSON.parse(event.body)

  const errors = bodyValidator(canonical)

  if (errors.length > 0) {
    return callback(null, { statusCode: 422, body: JSON.stringify({ errors }) })
  }

  await createPet(canonical)
  callback(null, { statusCode: 200, body: JSON.stringify(canonical) })
}