class DALController{
    async findAll(filter, sort, limit, coll){
        return coll.find(filter).sort(sort).limit(limit).exec()
    }

    async save(newDoc){
        return newDoc.save()
    }

    async findOneAndUpdate(filter, update, options, coll){
        return coll.findOneAndUpdate(filter,update,options)
    }
}

export { DALController }