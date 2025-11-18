import purify from "dompurify";
import { z } from "zod";

const relativeUrlSchema = z.string().refine(
  val => {
    try {
      // Reject if it starts with a protocol
      if (/^[a-zA-Z][a-zA-Z\d+\-.]*:/.test(val)) return false;

      // Must start with "/"
      if (!val.startsWith("/")) return false;

      // Try parsing as relative URL
      new URL(val, "http://example.com");

      return true;
    } catch {
      return false;
    }
  },
  {
    message: "Must be a valid relative URL starting with '/'",
  },
);

export const sanitizeRelativeInternalUrl = (url: string): string => {
  return relativeUrlSchema.parse(purify.sanitize(url));
};
