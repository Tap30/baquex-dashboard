import { Code, ConnectError, type Interceptor } from "@connectrpc/connect";

export const connectGrpcMessageInterceptor: Interceptor = next => async req => {
  try {
    return await next(req);
  } catch (error) {
    if (error instanceof ConnectError) {
      const grpcMessage = error.metadata.get("grpc-message");
      const grpcStatus = error.metadata.get("grpc-status");

      const code = grpcStatus
        ? Code[grpcStatus as keyof typeof Code] || error.code
        : error.code;

      if (grpcMessage) {
        throw new ConnectError(grpcMessage, code, error.metadata);
      }
    }

    throw error;
  }
};
