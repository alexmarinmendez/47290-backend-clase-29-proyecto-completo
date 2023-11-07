import mongoose, { mongo } from "mongoose";
import User from "./Users.js";

export default class MongoDAO {
    constructor(config) {
        this.mongoose = mongoose.connect(config.url)
            .catch(error => {
                console.log(error)
                process.exit()
            })
        const timestamp = {
            timestamps: {
                createdAt: 'created_at',
                updatedAt: 'updated_at'
            }
        }
        const userSchema = mongoose.Schema(User.schema, timestamp)
        this.models = {
            [User.model]: mongoose.model(User.model, userSchema)
        }
    }

    get = async(options, entity) => {
        if (!this.models[entity]) throw new Error('Entity not found in models')
        let results = await this.models[entity].find(options)
        return results
    }

    insert = async(document, entity) => {
        if (!this.models[entity]) throw new Error('Entity not found in models')
        try {
            let instance = new this.models[entity](document)
            let result = await instance.save()
            return result
        } catch(err) {
            console.log(err)
            return null
        }
    }
}