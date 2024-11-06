// const mongoose = require('mongoose');
// const mongoURI='mongodb+srv://himanshujeh15:Ranjan2004@cluster0.uyb0m.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'

// const mongoDB = async()=>{
//     await mongoose.connect(mongoURI,{useNewUrlParser:true},(err,result)=>{         
//      if(err) console.log("---",err)
//       else{     
//     console.log("connected");

// }    
// });

// }
// module.exports = mongoDB;



                                         // error by chat gpt for upper(original code)
// (err, result) => {
//     if (err) console.log("---", err)
//     else {
//         console.log("connected");
//     }
// }
// This callback function is passed as the third argument to mongoose.connect.
//  However, recent versions of Mongoose no longer accept a callback in this position.
//   Instead, Mongoose returns a promise that you should handle with async/await or .then()/.catch().

const mongoose = require('mongoose');

const mongoURI = 'mongodb+srv://himanshujeh15:Ranjan2004@cluster0.uyb0m.mongodb.net/GoFood_mern?retryWrites=true&w=majority&appName=Cluster0';

const mongoDB = async () => {
    try {
        await mongoose.connect(mongoURI);
        console.log("MongoDB connected");
        const fetched_data = await mongoose.connection.db.collection("food_items");   // yaha pe change hai. github se
        const data = await fetched_data.find({}).toArray();
        const foodCategory = await mongoose.connection.db.collection("foodCategory");
        const catData = await foodCategory.find({}).toArray();
        
        global.food_items = data;
        global.foodCategory = catData;
        // console.log(global.foodCategory)          
          
       

    } catch (err) {
        console.log("Connection error:", err);
    }
};

module.exports = mongoDB;

// db.js (iss file me bht saara change hai github se;)