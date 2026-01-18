"use client";

import { useMutation } from "@tanstack/react-query";
import { getAdvice, type AdviceRequest } from "@/shared/api/advice";
import type { Advice } from "@/entities/advice/model/adviceSchema";

export function useAdvice() {
  return useMutation<Advice, Error, AdviceRequest>({
    mutationFn: (payload) => getAdvice(payload),
  });
}
