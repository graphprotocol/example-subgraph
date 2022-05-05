import { cosmos } from "@graphprotocol/graph-ts";
import { cosmos as cosmos_messages } from "graph-cosmos-ts"
import { Delegation, Coin } from "../generated/schema";
// Dependencies for message decoding.
import { Protobuf, Reader } from "as-proto";

export function handleTx(transactionData: cosmos.TransactionData): void {
  const id = `${transactionData.block.header.hash.toHexString()}-${transactionData.tx.index}`;
  const messages = transactionData.tx.tx.body.messages;

  for (let i = 0; i < messages.length; i++) {
    let msgType = messages[i].typeUrl;
    let msgValue = messages[i].value as Uint8Array;
    if (msgType == "/cosmos.staking.v1beta1.MsgDelegate") {
      saveDelegation(id, decodeMsgDelegate(msgValue)) // The message needs to be decoded to access its attributes.
    }
  }
}

function saveDelegation(id: string, message: MsgDelegate): void {
  const msg = new Delegation(id);
  msg.delegatorAddress = message.delegator_address;
  msg.validatorAddress = message.validator_address;
  msg.amount = saveCoin(id, message.amount as MsgCoin);
  msg.save();
}

function saveCoin(id: string, c: MsgCoin): string {
  const coin = new Coin(id);
  coin.amount = c.amount;
  coin.denom = c.denom;
  coin.save();
  return id;
}

export function decodeMsgDelegate(a: Uint8Array): MsgDelegate {
  return Protobuf.decode<MsgDelegate>(a, MsgDelegate.decode);
}

class MsgDelegate {
  static decode(reader: Reader, length: i32): MsgDelegate {
    const end: usize = length < 0 ? reader.end : reader.ptr + length;
    const message = new MsgDelegate();

    while (reader.ptr < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.delegator_address = reader.string();
          break;

        case 2:
          message.validator_address = reader.string();
          break;

        case 3:
          message.amount = MsgCoin.decode(reader, reader.uint32());
          break;

        default:
          reader.skipType(tag & 7);
          break;
      }
    }

    return message;
  }

  delegator_address: string;
  validator_address: string;
  amount: MsgCoin | null;

  constructor(delegator_address: string = "", validator_address: string = "", amount: MsgCoin | null = null) {
    this.delegator_address = delegator_address;
    this.validator_address = validator_address;
    this.amount = amount;
  }
}

class MsgCoin {
  static decode(reader: Reader, length: i32): MsgCoin {
    const end: usize = length < 0 ? reader.end : reader.ptr + length;
    const message = new MsgCoin();

    while (reader.ptr < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.denom = reader.string();
          break;

        case 2:
          message.amount = reader.string();
          break;

        default:
          reader.skipType(tag & 7);
          break;
      }
    }

    return message;
  }

  denom: string;
  amount: string;

  constructor(denom: string = "", amount: string = "") {
    this.denom = denom;
    this.amount = amount;
  }
}