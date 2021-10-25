import { near, BigInt } from "@graphprotocol/graph-ts";
import { BlockEvent } from "../generated/schema";

export function handleBlock(block: near.Block): void {
  const header = block.header;
  let event = new BlockEvent(header.hash.toHexString());
  event.number = BigInt.fromI32(header.height as i32);
  event.height = BigInt.fromI32(block.header.height as i32);
  event.prevHeight = BigInt.fromI32(block.header.prevHeight as i32);
  event.blockOrdinal = BigInt.fromI32(block.header.blockOrdinal as i32);
  event.epochId = block.header.epochId;
  event.nextEpochId = block.header.nextEpochId;
  event.chunksIncluded = BigInt.fromI32(block.header.chunksIncluded as i32);
  event.hash = block.header.hash;
  event.prevHash = block.header.prevHash;
  event.timestampNanosec = BigInt.fromI32(block.header.timestampNanosec as i32);
  event.prevStateRoot = block.header.prevStateRoot;
  event.chunkReceiptsRoot = block.header.chunkReceiptsRoot;
  event.chunkHeadersRoot = block.header.chunkHeadersRoot;
  event.chunkTxRoot = block.header.chunkTxRoot;
  event.outcomeRoot = block.header.outcomeRoot;
  event.challengesRoot = block.header.challengesRoot;
  event.randomValue = block.header.randomValue;
  event.gasPrice = block.header.gasPrice;
  event.totalSupply = block.header.totalSupply;
  event.lastFinalBlock = block.header.lastFinalBlock;
  event.lastDsFinalBlock = block.header.lastDsFinalBlock;
  event.nextBpHash = block.header.nextBpHash;
  event.blockMerkleRoot = block.header.blockMerkleRoot;
  event.epochSyncDataHash = block.header.epochSyncDataHash;
  event.latestProtocolVersion = block.header.latestProtocolVersion;

  event.save();
}
