import permitModel, { permitDocument } from '../model/permit.model'
import { FilterQuery } from 'mongoose'

export const getPermit = async (query :FilterQuery<permitDocument> ) =>{

    try{
       return permitModel.find(query).lean()
    }catch(e){
        throw new Error (e)
    }

}

export const addPermit = async (body : permitDocument ) =>{

    try{
      return new permitModel(body).save()
    }catch(e){
        throw new Error (e)
    }

}

export const deletePermit = async (query :FilterQuery<permitDocument> ) =>{

    try{
       return permitModel.deleteMany(query)
    }catch(e){
        throw new Error (e)
    }

}