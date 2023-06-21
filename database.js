const { MongoClient } = require('mongodb');
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const config = require('./dbConfig.json');
const { json } = require('express');

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);
const db = client.db('startup');
const userCollection = db.collection('user');

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
    userStatus: null,
    blogHeader: null,
    userPosts: [],
    display: true,
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

function frontPageList () {

  const blogList = getUser('jack');

  return blogList;
  
}

module.exports = {
  getUser,
  getUserByToken,
  createUser,
  createBlogEntry,
  frontPageList,
};