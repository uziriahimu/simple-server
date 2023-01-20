const express = require('express')
const cors = require('cors')
const app = express()
const port = process.env.PORT || 5000
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config()

app.use(cors())
app.use(express.json())

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.2logags.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {

    try {
        const userCollection = client.db('task').collection('data')

        app.get('/textdata', async (req, res) => {

            const query = {}
            const cursor = userCollection.find(query)
            const texts = await cursor.toArray();
            res.send(texts)
        })
        app.post('/textdata', async (req, res) => {

            const text = req.body;
            const result = await userCollection.insertOne(text)

            res.send(result);

        })

        app.get('/textdata/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const service = await userCollection.findOne(query);
            res.send(service);
        });

    }
    finally {

    }
}
run().catch(err => console.error(err))
app.get('/', (req, res) => {
    res.send('welcome to task')
})

app.listen(port, () => {
    console.log(`listening to port ${port}`)
})