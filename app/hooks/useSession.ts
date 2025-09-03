"use client";
import { useQuery } from "@tanstack/react-query";

import { dbService } from "@/lib/db/service";

export function useSessionById(id: string) {
  return useQuery({
    queryKey: ["session", id],
    queryFn: async () => {
      const { data, error } = await dbService.sessions.findById(id);
      if (error) throw error;
      return data;
    },
  });
}
