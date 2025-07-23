type JwtPayload = {
  iss?: string;
  sub?: string;
  aud?: string | string[];
  exp?: number;
  nbf?: number;
  iat?: number;
  jti?: string;
  [key: string]: unknown;
};

export const decodeJwtPayload = (token: string): JwtPayload | null => {
  if (!token || typeof token !== "string") {
    // eslint-disable-next-line no-console
    console.warn("Invalid token provided. Must be a non-empty string.");

    return null;
  }

  const parts = token.split(".");

  if (parts.length !== 3) {
    // eslint-disable-next-line no-console
    console.warn(
      "Invalid JWT format. Expected 3 parts (header.payload.signature).",
    );

    return null;
  }

  const [_, encodedPayload, __] = parts;

  const base64UrlDecode = (base64Url: string): string => {
    // Replace non-Base64Url characters back to standard Base64
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");

    // Pad with '=' if necessary to make it a valid Base64 string
    const paddedBase64 = base64.padEnd(
      base64.length + ((4 - (base64.length % 4)) % 4),
      "=",
    );

    if (typeof window !== "undefined" && typeof window.atob === "function") {
      // Browser environment
      return decodeURIComponent(
        atob(paddedBase64)
          .split("")
          .map(function (c) {
            return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
          })
          .join(""),
      );
    } else if (typeof Buffer !== "undefined") {
      // Node.js environment
      return Buffer.from(paddedBase64, "base64").toString("utf8");
    } else {
      throw new Error(
        "Environment does not support Base64 decoding (neither window.atob nor Buffer).",
      );
    }
  };

  try {
    const decodedPayloadString = base64UrlDecode(encodedPayload!);
    const payload = JSON.parse(decodedPayloadString) as JwtPayload;

    return payload;
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error("Error decoding or parsing JWT parts:", e);

    return null;
  }
};
