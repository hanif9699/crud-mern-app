const data=require('../db/models/data');

class DataDao {
    async getAllData(done){
        try{
            const result=await data.query()
            done(null,result)
        }
        catch(e){
            done(e,null)
        }
    }
    async deleteById(id,done){
        try{
            const result=await data.query().deleteById(id).returning('*')
            done(null,result)
        }
        catch(e){
            done(e,null)
        }
    }
    async updateById(id,payload,done){
        try{
            await data.query().findById(id).patch(payload)
            const result= await data.query().findById(id)
            done(null,result)
        }
        catch(e){
            done(e,null)
        }
    }
    async create(payload,done){
        try{
            const result=await data.query().insert(payload)
            done(null,result)
        }
        catch(e){
            done(e,null)
        }
    }
}
module.exports = new DataDao;