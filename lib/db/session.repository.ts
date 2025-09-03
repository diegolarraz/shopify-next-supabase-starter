import { BaseRepository } from "./base-repository";

export class SessionRepository extends BaseRepository {
  constructor() {
    super("session");
  }

  async findById(id: string) {
    return this.sb().from(this.table).select("*").eq("id", id).single();
  }

  async findByShop(shop: string, apiKey: string) {
    return this.sb().from(this.table).select("*").eq("shop", shop).eq("api_key", apiKey);
  }

  async deleteByShop(shop: string) {
    return this.sb().from(this.table).delete().eq("shop", shop);
  }
}
