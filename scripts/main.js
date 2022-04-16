Moralis.start({serverUrl: "YOUR_SERVER_URL",
               appId: "YOUR_APPLICATION_ID"})
const contractAddress = "CONTRACT_ADDRESS";
const privateKey = "YOUR_PRIVATE_KEY";
const ethers = Moralis.web3Library;
let web3Provider;

async function init() {
    let currentUser = await Moralis.User.current();
    if (!currentUser) {
        currentUser = await Moralis.authenticate();
    }
    web3Provider = await Moralis.enableWeb3();
}

async function mint() {
    const signer = new ethers.Wallet(privateKey).connect(web3Provider);
    const contract = new ethers.Contract(contractAddress, contractAbi, web3Provider).connect(signer);
    const uri = await getURIonIPFS();
    await contract.mint(uri).then(alert("NFT is minted"));
}

async function uploadImage() {
    const data = document.getElementById("fileInput").files[0];
    console.log(data);
    const file = new Moralis.File(data.name, data);
    await file.saveIPFS();
    console.log("IPFS address of Image: ", file.ipfs());
    return file.ipfs();
}

async function getURIonIPFS() {
    const imageURL = await uploadImage();
    const name = await document.getElementById("metadataName").value;
    const description = await document.getElementById("metadataDescription").value;

    const metadata = {
        "name": name,
        "description": description,
        "image": imageURL
    }
    
    const file = new Moralis.File("file.json", { base64: window.btoa(JSON.stringify(metadata)) });
    await file.saveIPFS();
    console.log("IPFS address of metadata", file.ipfs());
    return file.ipfs();
}

document.getElementById("Mint").onclick = mint;

init();