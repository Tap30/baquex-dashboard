import { type DescService } from "@bufbuild/protobuf";
import { createClient, type Client } from "@connectrpc/connect";
import {
  createConnectTransport,
  createGrpcWebTransport,
  type ConnectTransportOptions,
  type GrpcWebTransportOptions,
} from "@connectrpc/connect-web";

export const createConnectClient = <S extends DescService>(
  service: S,
  transportConfig: ConnectTransportOptions,
): Client<S> => {
  const transport = createConnectTransport(transportConfig);

  return createClient(service, transport);
};

export const createGrpcWebClient = <S extends DescService>(
  service: S,
  transportConfig: GrpcWebTransportOptions,
): Client<S> => {
  const transport = createGrpcWebTransport(transportConfig);

  return createClient(service, transport);
};
