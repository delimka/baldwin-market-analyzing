"use client";

import { useMutation } from "@tanstack/react-query";
import { getAdvice, type AdviceRequest } from "@/entities/advice";
import type { Advice } from "@/entities/advice";

export function useAdvice() {
  return useMutation<Advice, Error, AdviceRequest>({
    mutationFn: (payload) => getAdvice(payload),
  });
}
