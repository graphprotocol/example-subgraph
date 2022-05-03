import { cosmos } from "@graphprotocol/graph-ts";
import { Reward } from "../generated/schema";

export function handleReward(eventData: cosmos.EventData): void {
  const height = eventData.block.header.height;
  const amount = eventData.event.attributes[0].value;
  const validator = eventData.event.attributes[1].value;

  let reward = new Reward(`${height}-${validator}`);

  reward.amount = amount;
  reward.validator = validator;

  reward.save();
}
