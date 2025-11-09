import { strings } from "@static-content";
import type z from "zod";

const { valueMissing } = strings.validationMessages;

export const considerZodFalsyAsEmpty: z.core.$ZodErrorMap = iss => {
  if (!iss.input) return valueMissing;

  if (iss.code === "invalid_union") {
    if (iss.discriminator) {
      const discriminator = (iss.input as Record<string, unknown>)[
        iss.discriminator
      ];

      if (!discriminator) return valueMissing;
    }
  }

  return iss.message;
};
