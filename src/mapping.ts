import { cosmos } from "@graphprotocol/graph-ts";
import { cosmos as cosmos_messages } from "graph-cosmos-ts"
import { Delegation, Coin } from "../generated/schema";

export function handleTx(transactionData: cosmos.TransactionData): void {
  const id = `${transactionData.block.header.hash.toHexString()}-${transactionData.tx.index}`;
  const messages = transactionData.tx.tx.body.messages;

  for (let i = 0; i < messages.length; i++) {
    let msgType = messages[i].typeUrl;
    let msgValue = messages[i].value as Uint8Array;
    if (msgType == "/cosmos.staking.v1beta1.MsgDelegate") {
      saveDelegation(id, cosmos_messages.staking.v1beta1.decodeMsgDelegate(msgValue)) // The message needs to be decoded to access its attributes.
    }
  }
}

function saveDelegation(id: string, message: cosmos_messages.staking.v1beta1.MsgDelegate): void {
  const msg = new Delegation(id);
  msg.delegatorAddress = message.delegator_address;
  msg.validatorAddress = message.validator_address;
  msg.amount = saveCoin(id, message.amount as cosmos_messages.base.v1beta1.Coin);
  msg.save();
}

function saveCoin(id: string, c: cosmos_messages.base.v1beta1.Coin): string {
  const coin = new Coin(id);
  coin.amount = c.amount;
  coin.denom = c.denom;
  coin.save();
  return id;
}