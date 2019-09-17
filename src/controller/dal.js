class DALController{
    async findAll(filter, sort, limit, coll){
        return coll.find(filter).sort(sort).limit(limit).exec()
    }

    async save(newDoc){
        console.log('dal', newDoc)
        return newDoc.save()
    }

    async findOneAndUpdate(filter, update, options, coll){
        return coll.findOneAndUpdate(filter,update,options)
    }

    async deleteAll(coll){
        return coll.deleteMany({})
    }
}

export { DALController }