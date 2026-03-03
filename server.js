require("dotenv").config()
const app=require('./src/app')
const connectToDB=require('./src/config/db')
app.get('/',(req,res)=>{
    res.send('hello world mir monir')
})
connectToDB()
const PORT=3000
app.listen(PORT,()=>{
    console.log(`server is running on ${PORT}`)
})