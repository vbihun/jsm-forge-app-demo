import { Request } from "@forge/resolver";
import api, { route } from "@forge/api";

export const getIssues = async (req: Request) => {
  const { serviceDeskId, queueId } = req.payload;

  try {
    const response = await api
      .asApp()
      .requestJira(
        route`/rest/servicedeskapi/servicedesk/${serviceDeskId}/queue/${queueId}/issue`
      );
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
