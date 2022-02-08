import {
  DataSourceContext,
  Address,
  dataSource,
  BigDecimal,
  BigInt,
} from "@graphprotocol/graph-ts";
import { ethereum } from "@graphprotocol/graph-ts/chain/ethereum";

export function handleBlock(block: ethereum.Block): void {
  if (block.number.toBigDecimal() > new BigDecimal(BigInt.fromI64(10999999))) {
    assert(false)
  }
}
