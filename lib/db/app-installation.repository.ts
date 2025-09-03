import { BaseRepository } from "./base-repository";

export class AppInstallationRepository extends BaseRepository {
  constructor() {
    super("app_installation");
  }

  async ensureWebhooksRegistered(shop: string) {
    const { data } = await this.sb().from(this.table).select("*").eq("shop", shop).single();
    if (data?.webhooks_registered) return true;
    await this.sb()
      .from(this.table)
      .upsert({ shop, webhooks_registered: true, installed_at: new Date().toISOString() })
      .eq("shop", shop);
    return true;
  }

  async markUninstalled(shop: string) {
    await this.sb()
      .from(this.table)
      .upsert({ shop, webhooks_registered: false, uninstalled_at: new Date().toISOString() })
      .eq("shop", shop);
  }
}
