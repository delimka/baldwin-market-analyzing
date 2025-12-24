"use client";

import { useMutation } from "@tanstack/react-query";
import { getAdvice, type AdviceRequest } from "@/shared/api/advice";
import type { Advice } from "@/lib/openai/schemas/adviceSchema";

export function useAdvice() {
  return useMutation<Advice, Error, AdviceRequest>({
    mutationFn: (payload) => getAdvice(payload),
  });
}
