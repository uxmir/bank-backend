const mongoose=require('mongoose')

function connectToDB(){
    mongoose.connect(process.env.MONGO_URL)
    .then(()=>{
      console.log('Mongodb is connected successfully')  
    })
    .catch(error=>{
        console.error('database is not connecting',error)
        process.exit(1)
    })
}

module.exports=connectToDB