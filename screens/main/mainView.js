window.addEventListener("load", () => {
  //Event handlers
  //Save button
  //const btnSave = document.getElementById("btnSave");
  //btnSave.addEventListener("click", btnSaveClick);

  //Get button
  const btnGet = document.getElementById("btnGet");
  btnGet.addEventListener("click", btnGetClick);

  //Callbacks
  window.api.gotChromebooks(gotChromebooks);
  window.api.gotChromebookUpdatedResult(gotChromebookUpdatedResult);
  window.api.gotDeletedResult(gotDeletedResult);
});

let chromebookData = {};

const gotChromebooks = (chromebooks) => {
  chromebookData = chromebooks;

  console.log("view gotChromebooks");

  var cbData = chromebooks
    .map((chromebook) => {
      var res = `<tr>
      <td>${chromebook.assetTagNumber}</td>
      <td>${chromebook.Latitude}</td>
      <td>${chromebook.Longitude}</td>
      <td>${chromebook.LoRa}</td>
      <td>${chromebook.LastSeen}</td>
      <td>${chromebook.MotionType}</td>
      <td><input type="button" onclick="window.open('https://maps.google.com/?q=${chromebook.Latitude},${chromebook.Longitude}')" value="Track" /></td>
      <td><input type="button" onclick="Delete('${chromebook.id}')" value="Delete" /></td>
    </tr>`;

      return res;
    })
    .join("");

  var tbData = document.getElementById("tbChromebooks");
  tbData.innerHTML = cbData;
};

const btnGetClick = (event) => {
  console.log("Get button clicked");
  event.preventDefault();

  window.api.getChromebooks();
};

const btnSaveClick = (event) => {
  console.log("Save button clicked");
  event.preventDefault();

  // const assetTagNumber = document.getElementById("assetTagNumber").value;
  const Name = document.getElementById("Name").value;
  // const Latitude = document.getElementById("Latitude").value;
  // const Longitude = document.getElementById("Longitude").value;
  // const LoRa = document.getElementById("LoRa").value;
  // const LastSeen = document.getElementById("LastSeen").value;
  // const MotionType = document.getElementById("MotionType").value;
  // const cbId = document.getElementById("cbId").value;

  console.log(
    `Longitude: ${Longitude}, assetTagNumber: ${assetTagNumber}, Latitude: ${Latitude}, cbId: ${cbId}, Name: ${Name}, LoRa: ${LoRa}, LastSeen: ${LastSeen}, MotionType: ${MotionType}`
  );

  if (cbId == "") {
    window.api.saveChromebook({ assetTagNumber, Name, Latitude, Longitude, LoRa, LastSeen, MotionType }).then(() => {
      alert("Record saved");
    });
  } else {
    window.api.updateChromebook(assetTagNumber, { assetTagNumber, Name, Latitude, Longitude, LoRa, LastSeen, MotionType });
  }
};

const gotDeletedResult = (result) => {
  if (result) {
    alert("Record deleted");
  }
};

function Delete(cbId) {
  console.log(`mainView > Delete : ${cbId}`);
  window.api.deleteChromebooks(cbId);
}

function Edit(cbId) {
  const cb = chromebookData.find((chromebook) => chromebook.id === cbId);

  const inputId = document.getElementById("cbId");
  const assetTagNumber = document.getElementById("assetTagNumber");
  const Name = document.getElementById("Name");
  const Latitude = document.getElementById("Latitude");
  const Longitude = document.getElementById("Longitude");
  const LoRa = document.getElementById("LoRa");
  const LastSeen = document.getElementById("LastSeen");
  const MotionType = document.getElementById("MotionType");

  inputId.value = cbId;
  assetTagNumber.value = cb.assetTagNumber;
  Name.value = cb.Name;
  Latitude.value = cb.Latitude;
  Longitude.value = cb.Longitude;
  LoRa.value = cb.LoRa;
  LastSeen.value = cb.LastSeen;
  MotionType.value = cb.MotionType;
}

const gotChromebookUpdatedResult = (result) => {
  if (result) window.api.getChromebooks();
};
