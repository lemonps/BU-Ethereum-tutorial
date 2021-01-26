const { client } = require("./db_connection");
const { myContract, provider } = require("./connection");
const moment = require("moment");

filterFrom = myContract.filters.Transfer(
  "0x56841eb70687e7e956603b441ae3ba8aa4cd3990",
  null
);
filterTo = myContract.filters.Transfer(
  null,
  "0x56841eb70687e7e956603b441ae3ba8aa4cd3990"
);

async function insertDataToDB(_address, _amount, _time) {
  var data = { address: _address, amount: _amount, time: _time };
  console.log(data);

  try {
    await client.connect();
    await client
      .db("mondb")
      .collection("mon")
      .insertOne(data, function (err, res) {
        if (err) throw err;
        console.log("1 document inserted");
        client.close();
      });
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}

async function retrieveDataFromDB(_address) {
  try {
    // Connect the client to the server
    await client.connect();

    let users = await client.db("mondb").collection("mon").find(_address);
    await users.forEach(console.dir);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}

async function subscribeEventLogs(eventName) {
//   await myContract.on(eventName, (from, to, amount, event) => {
//     console.log(
//       `-----------------------New Event Coming!!-----------------------`
//     );
//     console.log(`${from} sent ${amount} to ${to}`);
//   });

  console.log(await myContract.queryFilter(filterTo))
}

async function checkTransaction(_blockAddress, _blockTime, _transactionHash) {
  let query = {
    blockAddress: _blockAddress,
    blockTime: _blockTime,
    transactionHash: _transactionHash,
  };
  console.log(query);
  try {
    await client.connect();
    let count = await client.db("mondb").collection("mon").find(query).count();
    console.log(`Count: ${count}`);
    if (count == 1) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
  } finally {
    await client.close();
  }
}

subscribeEventLogs("Transfer");
//retrieveDataFromDB("0x6241840bf33d8677937f0e1b45179c24da9f5710");

// insertDataToDB(
//   "0x6241840bf33d8677937f0e1b45179c24da9f5710",
//   "100",
//   moment().unix()
// );
