import User from '../models/Users.js'
import Repository from './Repository.js'

export default class UserService extends Repository {
    constructor(dao) {
        super(dao, User.model)
    }
}