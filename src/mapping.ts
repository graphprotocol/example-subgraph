import { BigInt, tendermint } from "@graphprotocol/graph-ts";
import { Block } from "../generated/schema";

export function handleBlock(el: tendermint.EventList): void {
  const header = el.newBlock.block.header;
  const hash = el.newBlock.blockId.hash.toHexString();
  const height = BigInt.fromString(header.height.toString());

  const block = new Block(hash);
  block.number = height;
  block.timestamp = BigInt.fromString(header.time.seconds.toString());
  block.save();
}
