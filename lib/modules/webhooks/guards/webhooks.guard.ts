import * as crypto from "crypto";
import { CustomError } from "ts-custom-error";

class UnauthorizedException extends CustomError {
  public code = 401;
  public constructor(message?: string) {
    super(message);
  }
}
/**
 * @todo implement global config on class object
 */
export class QuickBooksWebhooksGuard {
  private config: any;

  public async canActivate(context: any): Promise<boolean> {
    const req = context.switchToHttp().getRequest();

    const signature = req.get("intuit-signature");
    if (!signature) {
      throw new UnauthorizedException();
    }

    const webhookPayload = JSON.stringify(req.body);
    if (!webhookPayload) {
      return true;
    }

    const hash = crypto
      .createHmac("sha256", this.config.webhookVerifier)
      .update(webhookPayload)
      .digest("base64");
    if (signature !== hash) {
      throw new UnauthorizedException();
    }

    return true;
  }
}
