import { BigInt, cosmos } from "@graphprotocol/graph-ts";
import { Block } from "../generated/schema";

export function handleBlock(bl: cosmos.Block): void {
  const header = bl.header;
  const hash = bl.header.hash.toHexString();
  const height = BigInt.fromString(header.height.toString());

  const block = new Block(hash);
  block.number = height;
  block.timestamp = BigInt.fromString(header.time.seconds.toString());
  block.save();
}
