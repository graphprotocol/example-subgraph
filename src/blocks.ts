import { arweave, BigInt } from "@graphprotocol/graph-ts"
import { Block, Poa, Tag, Transaction } from "../generated/schema"

function savePoa(id: string, poa: arweave.ProofOfAccess): string {
  const p = new Poa(id);

  p.option = poa.option;
  p.chunk = poa.chunk;
  p.data_path = poa.dataPath;
  p.tx_path = poa.txPath;

  p.save();

  return id;
}

function saveTags(id: string, tags: arweave.Tag[]): string[] {
  for (let i = 0; i < tags.length; i++) {
    const rawTag = tags[i];
    const tag = new Tag(id);

    tag.name = rawTag.name;
    tag.value = rawTag.value;

    tag.save();
  }

  return new Array<string>(tags.length).fill(id);
}

export function handleBlock(block: arweave.Block): void {
  let hash = block.indepHash.toHexString();
  let entity = new Block(hash);

  entity.height = BigInt.fromU64(block.height);
  entity.timestamp = BigInt.fromU64(block.timestamp);
  entity.indep_hash = block.indepHash;
  entity.nonce = block.nonce;
  entity.previous_block = block.previousBlock;
  entity.last_retarget = BigInt.fromU64(block.lastRetarget);
  entity.diff = block.diff;
  entity.hash = block.hash;
  entity.tx_root = block.txRoot;
  entity.txs = block.txs;
  entity.wallet_list = block.walletList;
  entity.reward_addr = block.rewardAddr;
  entity.tags = saveTags(hash, block.tags);
  entity.reward_pool = block.rewardPool;
  entity.weave_size = block.weaveSize;
  entity.block_size = block.blockSize;
  entity.cumulative_diff = block.cumulativeDiff;
  entity.hash_list_merkle = block.hashListMerkle;
  entity.poa = savePoa(hash, block.poa)

  entity.save()
}


export function handleTx(tb: arweave.TransactionWithBlockPtr): void {
  const tx = tb.tx;
  const entity = new Transaction(tx.id.toHexString());

  entity.block = tb.block.indepHash;
  entity.tx_id = tx.id;
  entity.last_tx = tx.lastTx;
  entity.owner = tx.owner;
  entity.tags = saveTags(tx.id.toHexString(), tx.tags);
  entity.data = tx.data;
  entity.data_root = tx.dataRoot;
  entity.data_size = tx.dataSize;
  entity.target = tx.target;
  entity.quantity = tx.quantity;
  entity.signature = tx.signature;
  entity.reward = tx.reward;

  entity.save();
}
