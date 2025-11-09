// import { DEFAULT_GRPC_GATEWAY } from "@constants/config";
// import {
//   authCheckerInterceptor,
//   authRefreshInterceptor,
//   connectGrpcMessageInterceptor,
//   createGrpcWebClient,
//   debugLoggerInterceptor,
// } from "@services/grpc";
// import { getAppEnv } from "@utils/env";

// const BASE_URL = getAppEnv("VITE_APP_GRPC_GATEWAY", DEFAULT_GRPC_GATEWAY);

// export const dashboardServiceClient = createGrpcWebClient(DashboardService, {
//   baseUrl: BASE_URL,
//   useBinaryFormat: true,
//   // The call order is from bottom (end of the array) to top
//   interceptors: [
//     connectGrpcMessageInterceptor,
//     authCheckerInterceptor,
//     authRefreshInterceptor,
//     debugLoggerInterceptor,
//   ],
// });
