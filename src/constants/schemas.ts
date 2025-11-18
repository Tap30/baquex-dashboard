import { strings } from "@static-content";
import z from "zod";

const { valueMissing } = strings.validationMessages;

export const dateRangeSchema = z
  .object({
    from: z.union([z.date(), z.undefined()]),
    to: z.union([z.date(), z.undefined()]).optional(),
  })
  .nullable();

export const stringifiedLocalDatetimeSchema = z.iso.datetime({ local: true });

export const emptiableUrlSchema = z.url().or(z.literal(""));

export const timestampSchema = z.coerce
  .number<bigint | number | string>()
  .min(0)
  .max(Date.now() + 100 * 365 * 24 * 60 * 60 * 1000);

export const integerStringSchema = z
  .string()
  .nonempty({ error: valueMissing })
  .regex(z.regexes.integer);

export const floatStringSchema = z
  .string()
  .nonempty({ error: valueMissing })
  .regex(/^-?\d+(\.\d+)?$/);

export const booleanStringSchema = z
  .string()
  .nonempty({ error: valueMissing })
  .regex(/^(?:true|false)$/);
