const fs = require('fs')
const mongoose = require('mongoose')
const dotenv = require('dotenv')

console.log("sdsdfs")
//Load env vars
dotenv.config({ path: "./config.env" })

//Load model
const Bootcamp = require('./models/Bootcamp')

//Connect to DB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false })

// Read JSON files
const bootcamps = JSON.parse(fs.readFileSync(`${__dirname}/_data/bootcamps.json`, 'utf-8'));

//Import data into db
const importData = async () => {
    try {
        await Bootcamp.create(bootcamps)
        console.log('---Data imported---')
    } catch (err) {
        console.error(err)
    }
}

//Delete data from db
const deleteData = async () => {
    try {
        await Bootcamp.deleteMany()
        console.log('--Data deleted--')
    } catch (err) {
        console.error(err)
    }
}

if (process.argv[2] === '-i') {
    importData()
}
else if (process.argv[2] === '-d') {
    deleteData()
}



