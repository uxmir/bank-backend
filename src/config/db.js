const mongoose=require('mongoose')

function connectToDB(){
    console.log(`data base url is ${process.env.MONGO_URL}`)
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