const express = require("express");
const verifyProof = require("../utils/verifyProof");
const niceList = require("../utils/niceList.json");
const MerkleTree = require("../utils/MerkleTree");

const port = 1225;

const app = express();
app.use(express.json());

app.use(express.static(__dirname + "/../"));

app.get("/load-nice-list", (req, res) => {
  res.send(`window.niceList = ${JSON.stringify(niceList)};`);
});

// TODO: hardcode a merkle root here representing the whole nice list
// paste the hex string in here, without the 0x prefix
const MERKLE_ROOT =
  "ddd59a2ffccddd60ff47993312821cd57cf30f7f14fb82937ebe2c4dc78375aa";

  app.post('/gift', (req, res) => {
    const { name } = req.body;

    // Create the Merkle Tree for the nice list
    const merkleTree = new MerkleTree(niceList);

    // Find the index of the name in the nice list
    const index = niceList.findIndex(n => n === name);

    // If the name is not in the list, send a response
    if (index === -1) {
        return res.send("Name not found in the list.");
    }

    // Generate the proof for the name
    const proof = merkleTree.getProof(index);

    // Verify the proof
    const isInTheList = verifyProof(proof, name, MERKLE_ROOT);
    if (isInTheList) {
        res.send("You got a toy robot!");
    } else {
        res.send("You are not on the list :(");
    }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});