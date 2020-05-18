const admin = require('firebase-admin');
const serviceAccount = require('../serviceAccountKey.json');
//initialize admin SDK using serciceAcountKey
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});
const db = admin.firestore();

getDialogue().then(result =>{
    console.log(result);
    const obj = result;
    const quoteData = {
        quote: obj.quote,
        author: obj.author
    };
    return db.collection('sampleData').doc('inspiration')
        .set(quoteData).then(() =>
            console.log('new Dialogue written to database'));
});

const addLocationDate = () => {
    
}
