const AWS = require('aws-sdk')
const dynamoDb = new AWS.DynamoDB.DocumentClient()
const TableName = process.env.PETS_TABLE

const create = async (pet) => {
    const params = {
        TableName,
        Item: {
            "id": pet.id,
            "name": pet.name,
            "breed": pet.breed,
            "age": pet.age,
            "weigth": pet.weigth,
            "activated": pet.activated,
            "createdAt": pet.createdAt,
            "updatedAt": pet.updatedAt
        }
    }
    await dynamoDb.put(params).promise()
}

const retrieve = async (id) => {
    const params = {
        TableName,
        Key: { 'id': id }
    }

    const item = await dynamoDb.get(params).promise()
    const pet = item.Item ? item.Item : undefined
    return pet && pet.activated ? pet : undefined
}

const update = async (pet) => {
    const params = {
        TableName,
        Item: {
            "id": pet.id,
            "name": pet.name,
            "breed": pet.breed,
            "age": pet.age,
            "weigth": pet.weigth,
            "activated": pet.activated,
            "createdAt": pet.createdAt,
            "updatedAt": pet.updatedAt
        }
    }
    return await dynamoDb.put(params).promise()
}

const remove = async (id) => {
    const params = {
        TableName,
        Key: { 'id': id },
        ConditionExpression: 'id = :id',
        ExpressionAttributeValues: { ':id': id }
    }
    return await dynamoDb.delete(params).promise()
}

const list = async (pageSize, lastItem) => {
    const params = {
        TableName,
        Limit: pageSize,
        FilterExpression: '#act = :activated',
        ExpressionAttributeNames: {
            '#act': 'activated',
        },
        ExpressionAttributeValues: {
            ':activated': true
        }
    }

    if (lastItem) {
        params.ExclusiveStartKey = { item_id: lastItem }
    }
    const response = await dynamoDb.scan(params).promise()
    return {
        items: response.Items,
        lastItem: response.LastEvaluatedKey
    }
}

module.exports = { create, retrieve, update, remove, list }