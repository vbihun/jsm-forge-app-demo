import { Request } from "@forge/resolver";
import api, { route } from '@forge/api';

export const getQueues = async (req: Request) => {
  const { serviceDeskKey } = req.payload;
  try {
    const response = await api
      .asApp()
      .requestJira(
        route`/rest/servicedeskapi/servicedesk/${serviceDeskKey}/queue`
      );
    const data = await response.json();

    console.log(data, 'data');

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
