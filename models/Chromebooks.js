const { MongoClient } = require("mongodb");
const ObjectId = require("mongodb").ObjectId;

class Chromebooks {
  dbName;
  client;

  constructor(uri, dbName) {
    this.uri = uri;
    this.dbName = dbName;
    this.client = new MongoClient(this.uri);
  }
  
  #getCollection = async () => {
    await this.client.connect();
    const db = this.client.db(this.dbName);
    const chromebooks = db.collection("chromebooks");
    return chromebooks;
  };

  getChromebooks = async () => {
    console.log(`Chromebooks.js > getChromebooks`);

    const chromebooks = await this.#getCollection();
    let res = await chromebooks.find({}).toArray();

    res = res.map((chromebook) => {
      return {
        id: chromebook._id,
        assetTagNumber: chromebook.assetTagNumber,
        Name: chromebook.Name,
        Latitude: chromebook.Latitude,
        Longitude: chromebook.Longitude,
        LoRa: chromebook.LoRa,
        LastSeen: chromebook.LastSeen,
        MotionType: chromebook.MotionType,
      };
    });
    console.log(res);
    return res;
  };

  addChromebook = async (chromebook) => {
    console.log(`Chromebook.js > addChromebook: ${chromebook}`);

    const chromebooks = await this.#getCollection();
    return await chromebooks.insertOne(chromebook);
  };

  updateChromebook = async (id, chromebook) => {
    console.log(`Chromebook.js > updateChromebook: ${chromebook}`);
 
    const chromebooks = await this.#getCollection();
    return await chromebooks.updateOne({ _id: new ObjectId(id) }, { $set: chromebook });
  };

  deleteChromebook = async (id) => {
    console.log(`Chromebook.js > deleteChromebook: ${id}`);

    const chromebooks = await this.#getCollection();
    const res = await chromebooks.deleteOne({ _id: id });
    return res.deletedCount > 0;
  };
}

module.exports = Chromebooks;
