import { BigInt, cosmos, log } from "@graphprotocol/graph-ts";
import { cosmwasm } from "@graphprotocol/juno-ts";
import { Contract } from "../generated/schema";
import { JSON } from "assemblyscript-json";

export function handleMsgExecuteContract(messageData: cosmos.MessageData): void {
  const message = cosmwasm.wasm.v1.decodeMsgExecuteContract(messageData.message.value);
  const id = message.contract;
  let contract = Contract.load(id);

  if (contract == null) {
    contract  = new Contract(id);
    contract.liquidity = BigInt.fromI32(0);
  }

  const jsonMsg = <JSON.Obj>(JSON.parse(message.msg));

  const add_liquidity = jsonMsg.getObj("add_liquidity");
  if (add_liquidity != null) {
    const amount = add_liquidity.getString("token1_amount");
    if (amount != null) {
      contract.liquidity = contract.liquidity.plus(BigInt.fromString(amount.toString()));
    }
  }

  const remove_liquidity = jsonMsg.getObj("remove_liquidity");
  if (remove_liquidity != null) {
    const amount = remove_liquidity.getString("amount");
    if (amount != null) {
      contract.liquidity = contract.liquidity.minus(BigInt.fromString(amount.toString()));
    }
  }

  contract.save();
}
