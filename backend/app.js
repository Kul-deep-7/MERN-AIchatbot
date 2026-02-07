import express from 'express';
import cors from 'cors';

let app = express();

app.use(cors({
    origin: ['http://localhost:5173', 
        'https://mern-aichatbot-1.onrender.com'
        ]
    
}
))

app.use(express.json())

export default app