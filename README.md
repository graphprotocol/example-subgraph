# Cosmos Block Handler Example Subgraph

This example subgraph stores `Block` objects that represent blocks appended to the Cosmos Hub chain. This is a very simple implementation where just the block number and the block timestamp is saved to the store.

By running this example subgraph, and with the following query, you can retrieve all the appended blocks between two dates:

```
query BlocksBetweenDates($timestamp_start: BigInt!, $timestamp_end: BigInt!) {
  blocks(where: {timestamp_gt: $timestamp_start, timestamp_lt: $timestamp_end}) {
    id,
    number,
    timestamp
  }
}
```
```
{
  "timestamp_start": 1613653200,
  "timestamp_end": 1613656800
}
```
For more information see the docs on https://thegraph.com/docs/.
