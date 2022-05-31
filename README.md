# Arweave Blocks and Transactions Example
This subgraph is indexing blocks, transactions, tags, and POAs. Make sure to replace the `owner` field inside the .yaml file with the owner id.

> NOTE: The id of an owner is not required, the subgraph can index all blocks and transactions.

### Dev Dependencies
To be able to build an Arweave subgraph, you need a graph-cli version of 0.30.2 or above. Run the command below to update to the latest version:

```
npm-update -g i @graphprotocol/graph-cli
```

For more information see the docs on https://thegraph.com/docs/.