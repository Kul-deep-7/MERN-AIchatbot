import dotenv from 'dotenv'
dotenv.config()
import { CohereClient } from 'cohere-ai'
import app from './app.js'

const cohere = new CohereClient({
    token: process.env.API_KEY
})

app.post('/chat', async(req,res)=>{
    try {
        const {message} = req.body;
        const response = await cohere.chat({
            model: 'command-a-03-2025',
            messages:message

        })
        return res.json(
            {
                reply: response.message.content[0].text,
                messages: [...message, response.message]
            }
        )
    } catch (error) {
        
    }
})


app.get('/',(req,res)=>{
    res.send('Hello World')
})

app.listen(process.env.PORT,()=>{
    console.log(`Server is running on port ${process.env.PORT}`)
})