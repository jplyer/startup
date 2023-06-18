const { MongoClient } = require('mongodb');
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const config = require('./dbConfig.json');

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);
const db = client.db('startup');
const userCollection = db.collection('user');
const statusCollection = db.collection('status')
const blogCollection = db.collection('blog')

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


function getUserBlog(email) {
  return blogCollection.findOne({ email: email });
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
  };
  await userCollection.insertOne(user);

  return user;
}

async function createUserStatus(email, userStatus) {
  const userStatus = {
    user: email,
    userStatus: userStatus,
  };
  await statusCollection.insertOne(userStatus);

  return userStatus;
}

async function createUserBlog(email, userStatus, userHeader, displayPref){
  const userBlog = {
    user: email,
    userStatus: userStatus,
    blogHeader: userHeader,
    userPosts: [],
    display: displayPref
  };
  await blogCollection.insertOne(userBlog);

  return userBlog;
}

async function createBlogEntry(email, userEntry,){

    const blogEntry ={
      body: userEntry,
    };

    const userBlog = getUserBlog(email);
    await userBlog.userPosts.push(blogEntry);
  
    return blogEntry
}

async function frontPageList () {
  const query = { display: {displayPref: true} };

  const options = {
    sort: {user: 1},

    projection: { user: 1, userStatus: 0, blogHeader: 1, userPosts: 0, display: 0},
  };
  const blogList = blogCollection.find(query, options);
  return blogList.toArray();
}

module.exports = {
  getUser,
  getUserBlog,
  getUserByToken,
  createUser,
  createUserStatus,
  createUserBlog,
  createBlogEntry,
  frontPageList,
};