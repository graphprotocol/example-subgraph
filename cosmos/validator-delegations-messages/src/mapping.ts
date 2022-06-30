import { cosmos } from "@graphprotocol/graph-ts";
import { cosmos as cosmos_sdk } from "@graphprotocol/cosmoshub-ts";
import { Delegation, Coin } from "../generated/schema";

export function handleMsgDelegate(messageData: cosmos.MessageData): void {
  const message = cosmos_sdk.staking.v1beta1.decodeMsgDelegate(messageData.message.value);
  // Without the txId we could have collision on the Id. To be updated once we have access to ResultTx.index in MessageData
  const id = `${messageData.block.header.hash.toHexString()}-${message.delegator_address}-${message.validator_address}`;

  saveDelegation(id, message);
}

function saveDelegation(id: string, message: cosmos_sdk.staking.v1beta1.MsgDelegate): void {
  const msg = new Delegation(id);
  msg.delegatorAddress = message.delegator_address;
  msg.validatorAddress = message.validator_address;
  msg.amount = saveCoin(id, message.amount as cosmos_sdk.base.v1beta1.Coin);
  msg.save();
}

function saveCoin(id: string, c: cosmos_sdk.base.v1beta1.Coin): string {
  const coin = new Coin(id);
  coin.amount = c.amount;
  coin.denom = c.denom;
  coin.save();
  return id;
}
