const { contextBridge, ipcRenderer } = require("electron");
const globals = require("../../globals");
const Chromebooks = require("../../models/Chromebooks");

const chromebooks = new Chromebooks(globals.URI, globals.DB_NAME);
let gotChromebookCallback;
let gotChromebookUpdatedCallback;
let gotDeletedResultCallback;

let getChromebooks = () => {
  console.log(`mainPreload > getChromebooks`);

  chromebooks.getChromebooks().then((res) => {
    gotChromebookCallback(res);
  });
};

let gotChromebooks = (callback) => {
  gotChromebookCallback = callback;
};

let saveChromebook = (chromebook) => {
  console.log(
    `mainPreload > Longitude: ${chromebook.Longitude}, assetTagNumber: ${chromebook.assetTagNumber}, Latitude: ${chromebook.Latitude}, Name: ${chromebook.Name}, LoRa: ${chromebook.LoRa}, LastSeen: ${chromebook.LastSeen}, MotionType: ${chromebook.MotionType}`
  );
  return chromebooks.addChromebook(chromebook);
};

let deleteChromebooks = (id) => {
  console.log(`mainPreload > Delete : ${id}`);

  chromebooks.deleteChromebook(id).then((res) => {
    gotDeletedResultCallback(res);
  });
};

let gotDeletedResult = (callback) => {
  gotDeletedResultCallback = callback;
};

let updateChromebook = (id, cb) => {
  console.log(`mainPreload > upDateChromebook : ${id}`);

  const chromebook = {
    Longitude: cb.Longitude,
    assetTagNumber: cb.assetTagNumber,
    Latitude: cb.Latitude,
    LoRa: cb.LoRa,
    Name: cb.Name,
    LastSeen: cb.LastSeen,
    MotionType: cb.MotionType,
  };

  chromebooks.updateChromebook(id, chromebook).then((res) => {
    gotChromebookUpdatedCallback(res);
  });
};

let gotChromebookUpdatedResult = (callback) => {
  gotChromebookUpdatedCallback = callback;
};

contextBridge.exposeInMainWorld("api", {
  getChromebooks,
  gotChromebooks,
  saveChromebook,
  updateChromebook,
  gotChromebookUpdatedResult,
  gotDeletedResult,
  deleteChromebooks,
});