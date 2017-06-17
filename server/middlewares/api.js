const low = require('lowdb');
const bodyParser = require('body-parser');
const uuid = require('uuid');

function setupDb() {
  const db = low();

  db.defaults({ topics: [], links: [],flights:[] })
    .value();

  const topic1 = {
    name: 'libraries',
    description: 'links to useful open source libraries',
  };

  const topic2 = {
    name: 'apps',
    description: 'links to new and exciting apps',
  };

  const topic3 = {
    name: 'news',
    description: 'links to programming related news articles',
  };

  const flight1 =   {
        "id": 1,
        "name": "AI-202",
        "price": 9500,
        "fromValue": "PNQ",
        "toValue":"DEL",
        "from":"Pune",
        "to":"Delhi",
        "Dept":"10:00 AM",
        "ARV":"12:00 PM"
    };

  const flight2 = {
        "id": 2,
        "name": "AI-203",
        "price": 10000,
        "fromValue": "PNQ",
        "toValue":"DEL",
        "from":"Pune",
        "to":"Delhi",
        "Dept":"10:30 AM",
        "ARV":"12:45 PM"
    };

  const flight3 = {
        "id": 3,
        "name": "AI-205",
        "price": 8000,
        "fromValue": "PNQ",
        "toValue":"DEL",
        "from":"Pune",
        "to":"Delhi",
        "Dept":"07:30 AM",
        "ARV":"10:45 PM"
    };
  const flight4 = {
        "id": 4,
        "name": "AI-206",
        "price": 8000,
        "fromValue": "DEL",
        "toValue":"PNQ",
        "from":"Delhi",
        "to":"Pune",
        "Dept":"07:30 AM",
        "ARV":"10:45 PM"
    };
      const flight5 = {
        "id": 5,
        "name": "AI-207",
        "price": 8000,
        "fromValue": "DEL",
        "toValue":"PNQ",
        "from":"Delhi",
        "to":"Pune",
        "Dept":"08:30 AM",
        "ARV":"10:05 PM"
    };
     const flight6 = {
        "id": 6,
        "name": "AI-208",
        "price": 7500,
        "fromValue": "DEL",
        "toValue":"PNQ",
        "from":"Delhi",
        "to":"Pune",
        "Dept":"10:30 AM",
        "ARV":"11:45 PM"
    };

  db.get('topics').push(topic1).value();
  db.get('topics').push(topic2).value();
  db.get('topics').push(topic3).value();

  db.get('flights').push(flight1).value();
  db.get('flights').push(flight2).value();
  db.get('flights').push(flight3).value();
  db.get('flights').push(flight4).value();
  db.get('flights').push(flight5).value();
  db.get('flights').push(flight6).value();

  db.get('links').push({
    description: 'The very library we are working with now',
    url: 'https://github.com/facebook/react',
    topicName: topic1.name,
    id: uuid(),
    voteCount: 0,
    voters: [],
  }).value();
  db.get('links').push({
    description: 'Some old videos',
    url: 'http://tagtree.io',
    topicName: topic1.name,
    id: uuid(),
    voteCount: 0,
    voters: [],
  }).value();

  db.get('links').push({
    description: 'An app to manage your finances',
    url: 'https://22seven.com',
    topicName: topic2.name,
    id: uuid(),
    voteCount: 0,
    voters: [],
  }).value();
  db.get('links').push({
    description: 'Go find some news yourself!',
    url: 'https://google.com',
    topicName: topic3.name,
    id: uuid(),
    voteCount: 0,
    voters: [],
  }).value();

  return db;
}

module.exports = (app) => {
  const db = setupDb();

  app.use((req, res, next) => {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');

    // Pass to next layer of middleware
    next();
  });

  app.use(bodyParser.json());

  app.get('/api/topics', (req, res) => {
    res.send(db.get('topics').toArray().value());
  });

   app.get('/api/flights', (req, res) => {
    res.send(db.get('flights').toArray().value());
  });

  app.get('/api/topics/:name/links', (req, res) => {
    const links = db.get('links').filter((l) =>
      l.topicName === req.params.name
    ).value();
    res.send(links);
  });

  app.post('/api/topics/:name/links', (req, res) => {
    const existingLink = db.get('links').find({ url: req.body.url }).value();
    if (existingLink) {
      return res.send(403);
    }

    const link = Object.assign({}, req.body, {
      id: uuid(),
      voteCount: 0,
      voters: [],
    });
    db.get('links').push(link).value();
    return res.send(link);
  });

  app.post('/api/links/:id/vote', (req, res) => {
    const link = db.get('links').find({ id: req.params.id }).value();
    if (link.voters && link.voters.indexOf(req.body.email) > -1) {
      return res.send(403);
    }

    link.voters.push(req.body.email);
    link.voteCount += req.body.increment;
    return res.send(link);
  });
};
