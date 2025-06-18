import Resolver from "@forge/resolver";
import {
  getIssues,
  getQueues,
  getServiceDesks,
  setStorageData,
  getStorageData,
} from "../services";

const resolver = new Resolver();

resolver.define("getText", (req) => {
  console.log(req);
  return "Hello, world!";
});

resolver.define("getQueues", async (req) => {
  return getQueues(req);
});

resolver.define("getQueueIssues", async (req) => {
  return getIssues(req);
});

resolver.define("getServiceDesks", async (req) => {
  return getServiceDesks(req);
});

resolver.define("setStorageData", async (req) => {
  return setStorageData();
});

resolver.define("getStorageData", async (req) => {
  return getStorageData();
});

export const handler = resolver.getDefinitions();
