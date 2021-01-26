const { ethers } = require("ethers");
const metacoin = require("../build/contracts/MetaCoin.json");

const provider = new ethers.providers.JsonRpcProvider("http://localhost:9545");
const chainId = ethers.providers.BaseProvider.getNetwork().chainId;
const networkName = ethers.providers.BaseProvider.getNetwork().name;
const signer = provider.getSigner();
const contractAddress = metacoin.networks[5777].address;
// 0x91343F5df62577F39Fd2Afa1Cf9153E3b3fbA7a5
const abi = metacoin.abi;

async function getBalance(address) {
  let balance = 0;
  await provider.getBalance(address).then((result) => {
    balance = ethers.utils.formatEther(result);
  });
  return balance;
}

const tx = signer
  .sendTransaction({
    to: "0x56841eb70687e7e956603b441ae3ba8aa4cd3990",
    value: ethers.utils.parseEther("1.0"),
  })
  .then(async (response) => {
    let balance = await getBalance(
      "0x56841eb70687e7e956603b441ae3ba8aa4cd3990"
    );
    // console.log(`balance: ${balance}`);
    //console.log(`response: ${response.hash}`)
  })
  .catch((err) => {
    console.log(err);
  });

const myContract = new ethers.Contract(contractAddress, abi, provider);

// getBalanceEth("0x56841eb70687e7e956603b441ae3ba8aa4cd3990")

async function getBalanceEth(address) {
  console.log(`Wallet Address => ${address}`);
  let balance = await myContract.getBalanceInEth(address);
  console.log(`Balance => ${balance}`);
}

//console.log(myContract)
// console.log(`chain id: ${chainId}`);
// console.log(`network name: ${networkName}`);
// console.log(`signer: ${signer}`);
// console.log(`balance: ${balance}`)
// console.log(`block number: ${blockNumber}`)

module.exports = { myContract, provider };
