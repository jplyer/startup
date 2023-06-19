const { MongoClient } = require('mongodb');
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const config = require('./dbConfig.json');

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);
const db = client.db('startup');
const userCollection = db.collection('user');
const statusCollection = db.collection('status');
const blogCollection = db.collection('blog');

// This will asynchronously test the connection and exit the process if it fails
(async function testConnection() {
  await client.connect();
  await db.command({ ping: 1 });
})().catch((ex) => {
  console.log(`Unable to connect to database with ${url} because ${ex.message}`);
  process.exit(1);
});

function getUser(email) {
  return userCollection.findOne({ email: email });
}

function getUserByToken(token) {
  return userCollection.findOne({ token: token });
}

async function createUser(email, password) {
  // Hash the password before we insert it into the database
  const passwordHash = await bcrypt.hash(password, 10);

  const user = {
    email: email,
    password: passwordHash,
    token: uuid.v4(),
    userStatus: userStatus,
    blogHeader: userHeader,
    userPosts: [],
    display: displayPref,
  };
  await userCollection.insertOne(user);

  return user;
}

async function createBlogEntry(email, userEntry, headerInput, userPref){

    const blogEntry ={
      body: userEntry,
    };

    const userHeader = {
      header: headerInput,
    };

    const displayPref = {
      display: userPref,
    };

    const userBlog = getUser(email);
    
    await userBlog.userPosts.push(blogEntry);
    userBlog.blogHeader = userHeader;
    userBlog.display = displayPref;

    return blogEntry

}

async function frontPageList () {
  const query = { display: {displayPref: true} };

  const options = {
    sort: {user: 1},

    projection: { user: 1, userStatus: 0, blogHeader: 1, userPosts: 0, display: 0},
  };
  const blogList = userCollection.find(query, options);
  return blogList.toArray();
}

module.exports = {
  getUser,
  getUserByToken,
  createUser,
  createBlogEntry,
  frontPageList,
};