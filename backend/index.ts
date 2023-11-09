import express from 'express'
import mongoose, { model } from 'mongoose'
import cors from "cors"

import gainerLoser from "./route/gainerLoser"
import News from "./route/News"
import signin from "./route/signin"
import signup from "./route/signup"
import onoffMarket from "./route/onoffMarket"
import { authenticateJWT } from './authenticate'
import ticker from './route/tickersearch'
import sentiment from "./route/sentiment"
import stock from "./route/stocks"
import watchlist from "./route/watchlist"
import { User } from './db'
import * as dotenv from "dotenv"

dotenv.config()

const mongoose_url = process.env.MONGOOSE_URL
const app = express();
const port = 3000


app.use(express.json())
app.use(cors())




mongoose.connect(mongoose_url,)


app.use("/signin",signin)
app.use("/signup",signup)
app.use("/News",News)
app.use("/gainerLoser",gainerLoser)
app.use("/onoffMarket",onoffMarket)
app.use("/ticker",ticker)
app.use("/sentiment",sentiment)
app.use("/stock",stock)
app.use("/watchlist",authenticateJWT,watchlist)

app.get("/me",authenticateJWT,async (req:any,res)=>{
    const userId = req.headers["userid"];

    
    const user = await User.findOne({ _id: userId });

    const name = user.username
    res.json({
        username:name
    })
    
})


app.listen(port,()=>{
    console.log(`listeneing on port ${port}`)
})

