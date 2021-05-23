const express = require('express');
const app = express();
const port = process.env.PORT || 5055;
const cors = require('cors');
const bodyParser = require('body-parser');
// require('dotenv').config();
const ObjectId = require('mongodb').ObjectId;
app.use(cors());
app.use(bodyParser.json());


const MongoClient = require('mongodb').MongoClient;
const uri = `mongodb+srv://crud:crud88@cluster0.esvfp.mongodb.net/crud?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const crudInsert = client.db(`crud`).collection("insert");
  const crudRead = client.db(`crud`).collection("insert");
  console.log("db connect done")
  app.get('/read', (req, res) => {
    crudRead.find()
      .toArray((err, items) => {
        res.send(items)
      })
  })
  app.get('/services', (req, res) => {
    serviceCollection.find()
      .toArray((err, items) => {
        res.send(items)
      })
  })
  app.get('/reviews', (req, res) => {
    reviewCollection.find()
      .toArray((err, items) => {
        res.send(items)
      })
  })
  app.get('/ourTeams', (req, res) => {
    adminPanelCollection.find()
      .toArray((err, items) => {
        res.send(items)
      })
  })

  app.get('/pithaUser', (req, res) => {
    console.log(req.query.email)
    vramankariCollection.find({ email: req.query.email })
      .toArray((err, items) => {
        console.log(items)
        // res.redirect('/pithaUser')
        res.send(items)
      })
  })
  app.post('/addUsers', (req, res) => {
    const newEvent = req.body;
    console.log('adding new event: ', newEvent)
    crudInsert.insertOne(newEvent)
      .then(result => {
        console.log('inserted count', result.insertedCount);
        res.send(result.insertedCount > 0)
      })
  })
  app.post('/addStatus', (req, res) => {
    const newEvent = req.body;
    console.log('adding new event: ', newEvent)
    reviewStatusCollection.insertOne(newEvent)
      .then(result => {
        console.log('inserted count', result.insertedCount);
        res.send(result.insertedCount > 0)
      })
  })
  app.post('/addReviews', (req, res) => {
    const newEvent = req.body;
    console.log('adding new event: ', newEvent)
    reviewCollection.insertOne(newEvent)
      .then(result => {
        console.log('inserted count', result.insertedCount);
        res.send(result.insertedCount > 0)
      })
  })
  app.post('/addOurTeams', (req, res) => {
    const newEvent = req.body;
    console.log('adding new event: ', newEvent)
    adminPanelCollection.insertOne(newEvent)
      .then(result => {
        console.log('inserted count', result.insertedCount);
        res.send(result.insertedCount > 0)
      })
  })
  app.post('/addProductWithUser', (req, res) => {
    const newEvent = req.body;
    console.log('adding new event: ', newEvent)
    vramankariCollection.insertOne(newEvent)
      .then(result => {
        console.log('inserted count', result.insertedCount);
        res.send(result.insertedCount > 0)
      })
  })
//   delete
  app.delete('/delete/:id', (req, res) => {
    const id = ObjectId(req.params.id);
    console.log('delete this', id);
    crudRead.deleteOne({ _id: id })
      .then(documents => {
        // if(documents.deletedCount>0){
        //   res.send(documents.deletedCount)
        // }
        res.send(documents.deletedCount > 0)
        console.log(documents)
      })
  })
  app.delete('/deleteItems/:id', (req, res) => {
    const id = ObjectId(req.params.id);
    console.log('delete this', id);
    vramankariCollection.deleteOne({ _id: id })
      .then(documents => {
        // if(documents.deletedCount>0){
        //   res.send(documents.deletedCount)
        // }
        res.send(documents.deletedCount > 0)
        console.log(documents)
      })
  })
  // app.delete('/delete/:id', (req, res) =>{
  //   productCollection.deleteOne({_id: ObjectId(req.params.id)})
  //   .then( result => {
  //     res.send(result.deletedCount > 0);
  //   })
  // })
//   update
  app.patch('/update/:id', (req, res) => {
    console.log(ObjectId(req.params.id));
    console.log(req.body.name);
    crudRead.updateOne({ _id: ObjectId(req.params.id) },
      {
        $set: { name: req.body.name, email: req.body.email }
      })
      .then(result => {
        console.log(result);
        res.send(result.modifiedCount > 0)
      })
  })

  app.patch('/updateStatus/:id', (req, res) => {
    console.log(req.body.status, req.params.id);
    vramankariCollection.updateOne({ _id: ObjectId(req.params.id) },
      {
        $set: { status: req.body.status }
      })
      .then(result => {
        res.send(result.modifiedCount > 0)
      })
  })
});
// update Problem



app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})