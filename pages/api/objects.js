import { generate } from 'shortid';
import nextConnect from 'next-connect';

import { connectDB } from '../../db';

let _db;

const useDB = () => async (req, res, next) => {
  const { client, db } = await connectDB();
  const isConnected = await client.isConnected();

  if (!isConnected) {
    return res.status(500).send('Database is not working :( so sorry! ');
  }
  _db = db;
  next();
};

const checkJSON = () => async (req, res, next) => {
  // note: seems to be a bug in next-connect with method specific middlewares
  // ideally this wouldn't be a check here, rather a middleware to the .post() method
  if (req.method !== 'POST') return next();

  try {
    JSON.parse(req.body);
  } catch (err) {
    return res.status(400).send('invalid json, son');
  }
  next();
};

const handler = nextConnect()
  .use(useDB())
  .use(checkJSON())
  .get(async (req, res) => {
    const { id } = req.query;

    if (!id) {
      return res.status(400).send('Querystring must include an id.');
    }

    try {
      const result = await _db.collection('objects').findOne({ id });

      if (!result) {
        return res.status(404).send(`No document with id: ${id} found.`);
      }
      res.json(result.object);
    } catch (err) {
      res
        .status(500)
        .send(`An error occured while fetching the document with id: ${id}.`);
    }
  })
  .post(async (req, res) => {
    try {
      const { ops } = await _db.collection('objects').insertOne({
        id: generate(),
        object: JSON.stringify(JSON.parse(req.body)), // strip spaces and save as a string
      });

      res.json({ id: ops[0].id });
    } catch (err) {
      res.statusMessage = err;
      res.status(500).send(`An error occured while inserting the document.`);
    }
  });

export default handler;

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '100kb',
    },
  },
};
