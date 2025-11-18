import { type Interceptor } from "@connectrpc/connect";
import { DebugLogger } from "./DebugLogger.ts";

export const grpcDebugLogger = new DebugLogger();

export const debugLoggerInterceptor: Interceptor = next => async req => {
  try {
    const res = await next(req);

    grpcDebugLogger.log("REQ:", { req }, "\n", "RES:", { res });

    return res;
  } catch (error) {
    grpcDebugLogger.log("REQ:", { req }, "\n", "ERR:", { error });

    throw error;
  }
};
