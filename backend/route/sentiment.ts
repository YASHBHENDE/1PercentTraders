import express from "express"

const router = express.Router()

function MARKET_STATUS(){
    const american_market = (0.4)
    const china_market = (0.4)
    const rusian_market = (0.4)
    const indian_market = (0.4)

    const avg_chg = (american_market + china_market + rusian_market+ indian_market)/4

    let sentiment:String;
    let sentiment_value:number;
    // sentiment value |    sentiment
    //
    //       4              verybulish
    //       3              mildbullish                 
    //       2              mild bearish
    //       1              verybearish
    
    if (avg_chg>0 && avg_chg<1){
        sentiment = "mild bullish"
        sentiment_value = 3

    }else if(avg_chg>1 && avg_chg<100){

        sentiment = "very bullish"
        sentiment_value = 4

    }else if(avg_chg<0 && avg_chg>(-0.5)){
        sentiment = "mild bearish"
        sentiment_value = 2
    }else{
        sentiment = "very bearish"
        sentiment_value = 1
    }

    return {sentiment,sentiment_value,american_market,china_market,rusian_market,indian_market}
}

router.get("/", (req, res) => {
    const avgChange = MARKET_STATUS();
    
    
    res.status(200).json( avgChange );
});
  

export default router