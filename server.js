const express = require("express")
const cors = require ("cors")

const routes = require('./app/routes/tutorial.routes');
const seederTutorial = require('./seeders/tutorial.seeder');

const app =   express()
 var corsOptions = {
    origin: "https://localhost:8001"
 }
 const db = require("./app/models/index");
db.sequelize.sync()
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });

// development model
//   db.sequelize.sync({ force: true }).then(() => {
//     console.log("Drop and re-sync db.");
//   });

 app.use(cors(corsOptions))
 app.use(express.json())
 app.use(express.urlencoded({ extended: true }))

 db.sequelize.sync({ force: true }).then(() => {
    //   if (process.env.NODE_ENV !== "production") {
   // if (process.env.SEEDING === 'true') {
      (async () => {
        try {
          await seederTutorial.create();
        } catch (err) {
          console.log(err);
        }
      })();
    // }
  });

 app.get("/", (req,res) => {
    res.json({ message: "Welcome Hi."})
 })

 require("./app/routes/tutorial.routes")(app);


 const PORT = process.env.PORT || 8080
 app.listen(PORT, () => {
    console.log(` Server Success Running on  ${PORT}. `)
 })