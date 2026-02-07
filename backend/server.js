import dotenv from 'dotenv'
dotenv.config()
import { CohereClientV2 } from 'cohere-ai'
import app from './app.js'

const cohere = new CohereClientV2({
    token: process.env.API_KEY
})

app.post('/chat', async(req,res)=>{
    try {
        const {text} = req.body;
        const response = await cohere.chat({
            model: 'command-a-03-2025',
            messages: [
                {
                role: 'user',
                content: text,
                }
            ]

        })
        return res.json(
            {
                reply: response.message.content[0].text,
            }
        )
    } catch (error) {
                console.error('Error:', error)
                return res.status(500).json({ 
                    error: 'Failed to get response',
                    details: error.message 
        })

    }
})


app.get('/',(req,res)=>{
    res.send('Hello World')
})

app.listen(process.env.PORT,()=>{
    console.log(`Server is running on port ${process.env.PORT}`)
})