import {
  AudioCard as AudioCardType,
  HeroCard as HeroCardType,
  IAttachment,
  ICardMediaUrl,
  SuggestedActions as SuggestedActionsType,
} from "botbuilder";
import * as _ from "lodash";
import { directiveHandler } from "../../directives";
import { CortanaEvent } from "./CortanaEvent";
import { CortanaReply } from "./CortanaReply";

export function HeroCard(templatePath: string|HeroCardType): directiveHandler {
  return  async (reply, event): Promise<void> => {
    let attachment;
    if (_.isString(templatePath) ) {
      attachment = await reply.render(templatePath);
    } else {
      attachment = templatePath;
    }
    reply.response.directives.push({ type: "attachment", attachment });
  };
}

export function SuggestedActions(templatePath: string|SuggestedActionsType): directiveHandler {
  return  async (reply, event): Promise<void> => {
    let suggestedActions;
    if (_.isString(templatePath) ) {
      suggestedActions = await reply.render(templatePath);
    } else {
      suggestedActions = templatePath;
    }

    reply.response.directives.push({ type: "suggestedActions", suggestedActions });
  };
}

export function AudioCard(url: string, title: string = "", profile: string = ""): directiveHandler {
  return  async (reply, event): Promise<void> => {
    const attachment = new AudioCardType();
    attachment.title(title);
    const cardMedia: ICardMediaUrl = { url, profile };
    attachment.media([cardMedia]);

    reply.response.directives.push({ type: "attachment", attachment });
    reply.response.terminate = true;
    reply.yield();
  };
}

export function isAttachment(object: any): object is IAttachment {
  return "contentType" in object;
}

export function isSuggestedActions(object: any): object is SuggestedActionsType {
  return "actions" in object;
}
