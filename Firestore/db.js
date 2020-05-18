const admin = require("firebase-admin");
const serviceAccount = require("../serviceAccountKey.json");
let db;

//initialize admin SDK using serciceAcountKey
function initializeApp() {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
  db = admin.firestore;
}

const addLocationData = (data, timestamp) => {
  const currentDate = moment(new Date(timestamp))
    .format("YYYY-MM-DD")
    .toString();
  return db.collection(currentDate).add(data);
};

module.exports = { db, initializeApp, addLocationData };
