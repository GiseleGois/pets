const fields = ['name', 'breed']
const weigthFields = ['weigth', 'age']

const isDefined = (variable) => {
    const kind = typeof variable
    if (kind === 'undefined') return false
    if (kind === 'string') return !/^\s*$/.test(variable)
    if (kind === 'object') {
        if (variable === null) return false
        if (Object.keys(variable).length === 0) return false
    }
    return true
}

const bodyValidator = (body) => {
	const errors = []
	fields.forEach(function (field, index) {
		if (!isDefined(body[field]))
			errors.push({ identifier: field, message: `The field ${field} cannot be empty or null` })
	})
	weigthFields.forEach(function (field, index) {
		if (isNaN(parseFloat(body[field])))
			errors.push({ identifier: field, message: `The field ${field} is a number` })
	})
    return errors
}

module.exports = { bodyValidator }
