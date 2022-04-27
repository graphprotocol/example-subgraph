# Validator Rewards Example

This example subgraph stores `Reward` objects that represent rewards received by a validator in the Cosmos Hub chain. In order to do that, an event handler is used to filter [reward](https://github.com/cosmos/cosmos-sdk/blob/main/x/distribution/spec/06_events.md) events. The type of event to be filtered is specified in the subgraph manifest file. That way, the handler will just receive events of that type.

By running this example subgraph, and with the following query, you can retrieve all the rewards received by the [Figment](https://atomscan.com/validators/cosmosvaloper1hjct6q7npsspsg3dgvzk3sdf89spmlpfdn6m9d) validator, and the amounts of each of the rewards:

```
query FigmentRewards($validatorAddress: String!) {
  rewards(where: {validator: $validatorAddress}) {
    validator,
    amount
  }
}
```
```
{
    "validatorAddress": "cosmosvaloper1hjct6q7npsspsg3dgvzk3sdf89spmlpfdn6m9d"
}
```
For more information see the docs on https://thegraph.com/docs/.
