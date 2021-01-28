const { v4: uuidv4 } = require('uuid')
const { create, retrieve, list } = require('../repositories/pets-repository')

async function createPet(pet) {
    pet.id = uuidv4()
    pet.activated = true
    pet.createdAt = new Date().toISOString()
    pet.updatedAt = new Date().toISOString()
    return await create(pet)
}

async function findByAll(pageSize, lastItem) {
    let pets = await list(pageSize, lastItem)
    return pets
}

async function getById(id) {
    let pet = await retrieve(id)
    return pet
}

async function update(pet) {
    pet.updatedAt = (new Date()).toISOString()
    await create(pet)
}

async function remove(pet) {
    pet.activated = false
    pet.updatedAt = (new Date()).toISOString()
    await create(pet)
}
module.exports = { createPet, findByAll, getById, update, remove }
