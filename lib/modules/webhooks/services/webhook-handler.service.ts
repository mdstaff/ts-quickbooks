import { QuickbooksWebhookEventModel } from "../models/webhooks.model";

export abstract class QuickbooksWebhookHandlerService {
  public abstract handleEvent(event: QuickbooksWebhookEventModel): Promise<void>;
}
