import kvs from "@forge/kvs";

export const setStorageData = async () => {
  try {
    await kvs.set("mock-key", "mock-value");

    return {
      success: true,
    };
  } catch (e) {
    console.log(`Error while setting data in storage`);

    return {
      success: false,
    };
  }
};

export const getStorageData = async () => {
  try {
    const value = await kvs.get("mock-key");

    return {
      success: true,
      data: value,
    };
  } catch (e) {
    console.log(`Error while getting data in storage`);

    return {
      success: false,
    };
  }
};
