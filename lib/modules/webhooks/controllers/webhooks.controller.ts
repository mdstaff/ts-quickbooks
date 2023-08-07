import { QuickBooksWebhooksGuard } from "../guards/webhooks.guard";
import { QuickbooksWebhookEventModel } from "../models/webhooks.model";
import { QuickbooksWebhookHandlerService } from "../services/webhook-handler.service";

export class QuickBooksWebhooksController {
  constructor(private service: QuickbooksWebhookHandlerService) {}

  public async handleEvent(body: QuickbooksWebhookEventModel): Promise<void> {
    return this.service.handleEvent(body);
  }
}
