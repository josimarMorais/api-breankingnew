import User from "../models/User.js";
import mongoose from 'mongoose';

const createService = (body) => User.create(body)

const findAllService = () => User.find()

const findByIdService = (id) => User.findById(id)

const updateService = (id, name, username, email, password, avatar, background ) => User.findOneAndUpdate({ _id: id },{ name, username, email, password, avatar, background})

export default {
    createService,
    findAllService,
    findByIdService,
    updateService
}