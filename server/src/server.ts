import { Server } from "http";
import app from './app';
import { MongoClient } from "mongodb"

const port = process.env.PORT || 8000;
const uri = process.env.MONGO_DB_URI!


const server: Server = app.listen(port, () => {
  console.log(`Server is Fire at http://localhost:${port}`);
});

//db connection
async function run() {
  try {
    const client = new MongoClient(uri) 

    //put to locals in order to access the dbClient in the routes and controllers
    app.locals.dbClient = await client.connect();
    console.log('Connected to MongoDB Atlas');

    server
  } catch (error) {
    console.error('Error connection to db', error);
  }
}

run()

