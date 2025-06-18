import { invoke } from "@forge/bridge";

type ResolverResponse<T = any> = {
  success: boolean;
  error?: string;
  data?: T;
};

export const getAllQueues = ({
  serviceDeskKey,
}: {
  serviceDeskKey: string;
}): Promise<ResolverResponse> => {
  return invoke("getQueues", { serviceDeskKey });
};

export const getQueueIssues = ({
  serviceDeskId,
  queueId,
}: {
  serviceDeskId: number;
  queueId: number;
}): Promise<ResolverResponse> => {
  return invoke("getQueueIssues", { serviceDeskId, queueId });
};

export const getServiceDesks = (): Promise<ResolverResponse> => {
  return invoke("getServiceDesks");
};

export const setStorageData = (): Promise<ResolverResponse> => {
  return invoke("setStorageData")
};

export const getStorageData = (): Promise<ResolverResponse> => {
  return invoke("getStorageData")
};
