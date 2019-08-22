class DALController{
    async findAll(filter, sort, limit, coll){
        return coll.find(filter).sort(sort).limit(limit).exec()
    }

    async save(newDoc){
        return newDoc.save()
    }
}

export { DALController }