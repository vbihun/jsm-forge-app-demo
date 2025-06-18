import { Request } from "@forge/resolver";
import api, { route } from "@forge/api";

export const getServiceDesks = async (req: Request) => {
  try {
    const response = await api
      .asApp()
      .requestJira(route`/rest/servicedeskapi/servicedesk`);
    const data = await response.json();

    return {
      success: true,
      data: data.values,
    };
  } catch (e) {
    return {
      success: false,
      error: `Error while getting queues: ${e}`,
    };
  }
};
