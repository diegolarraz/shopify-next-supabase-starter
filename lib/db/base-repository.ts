import { supabaseAdmin } from "@/lib/supabase/server";

export class BaseRepository {
  constructor(protected table: string) {}
  protected sb() {
    return supabaseAdmin();
  }
}
