import { EthereumBlock } from "@graphprotocol/graph-ts";
import {
  NewGravatar,
  UpdatedGravatar,
  CreateGravatarCall
} from "./types/Gravity/Gravity";
import { Gravatar } from "./types/schema";

export function handleNewBlock(block: EthereumBlock): void {}

export function handleCreateGravatar(call: CreateGravatarCall): void {}

export function handleNewGravatar(event: NewGravatar): void {
  let gravatar = new Gravatar(event.params.id.toHex());
  gravatar.owner = event.params.owner;
  gravatar.displayName = event.params.displayName;
  gravatar.imageUrl = event.params.imageUrl;
  gravatar.save();
}

export function handleUpdatedGravatar(event: UpdatedGravatar): void {
  let id = event.params.id.toHex();
  let gravatar = Gravatar.load(id);
  if (gravatar == null) {
    gravatar = new Gravatar(id);
  }
  gravatar.owner = event.params.owner;
  gravatar.displayName = event.params.displayName;
  gravatar.imageUrl = event.params.imageUrl;
  gravatar.save();
}
