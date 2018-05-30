# team2 - backend

## Prerequisites

Read the tutorial on [https://hyperledger.github.io/composer/latest/tutorials/developer-tutorial](https://hyperledger.github.io/composer/latest/tutorials/developer-tutorial).

## Create bna file
Increment the version number in package.json.
Then execute `npm run prepublish` to create a bna file in folder _dist_.

## Install bna file in network
Execute `npm run netinstall` to install (upload) the bna file into the hyperledger network that is configured by the 
PeerAdmin@hlfv1 card.

## Upgrade network
In order to upgrade the hyperledger network to the uploaded version execute `npm run netupgrade <version>`. The version 
number must match the version number in package.json.
