import dotenv from 'dotenv'
dotenv.config()
import { CohereClient } from 'cohere-ai'
import app from './app.js'

const cohere = new CohereClient({
    token: process.env.API_KEY
})



app.get('/',(req,res)=>{
    res.send('Hello World')
})

app.listen(process.env.PORT,()=>{
    console.log(`Server is running on port ${process.env.PORT}`)
})