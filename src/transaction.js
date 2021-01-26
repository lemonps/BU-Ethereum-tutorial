const { myContract, provider } = require("./connection");
const { commify } = require("ethers/lib/utils");

const signer = provider.getSigner();
const txSigner = myContract.connect(signer);
console.log(`tx signer => ${txSigner}`);
console.log(
  myContract.getBalanceInEth("0x56841eb70687e7e956603b441ae3ba8aa4cd3990")
);

async function getBalanceEth(address) {
  console.log(`Wallet Address => ${address}`);
  let balance = await myContract.getBalanceInEth(address);
  console.log(`ETH Balance => ${balance}`);
}

async function getBalance(address) {
  console.log(`Address => ${address}`);
  let balance = await myContract.getBalance(address);
  console.log(`Metacoin Balance => ${balance}`);
  return balance;
}

async function getName() {
  let name = await myContract.getName();
  console.log(`Token Name => ${name}`);
  return name;
}

async function sendCoin(receiver, amount) {
  console.log(`Send [${amount}] metacoin to [${receiver}]`);
  await txSigner.sendCoin(receiver, amount);
}

sendCoin("0x27fd7c4c4541e8a957972e064270d915b70aa99f", 1)
  .then(result => {
      console.log(`Result: ${result}`)
    getBalance("0x27fd7c4c4541e8a957972e064270d915b70aa99f").then((balance) => {
      console.log(`Coin Balance: ${balance}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });

getBalanceEth("0x56841eb70687e7e956603b441ae3ba8aa4cd3990");
