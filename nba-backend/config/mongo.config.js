let mongoose = require("mongoose")
// mongodb+srv://yoni:${process.env.MONGO_PASS}@storedb.4ngcq.mongodb.net/storedb?retryWrites=true&w=majority
mongoose.connect(
   
    `mongodb+srv://yoniBinder:Sigal1234@cluster0.ft7uu.mongodb.net/nba?retryWrites=true&w=majority`,{
    useNewUrlParser:true,
    useUnifiedTopology: true
    }).then(
        ()=>console.log("Mongo database connected")
        
    ).catch(
        err=>console.log(err)
    )
