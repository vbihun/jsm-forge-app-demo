import { useEffect, useState } from "react";
import { Button, Spinner, Stack, Text } from "@forge/react";

import { QueueIssues } from "./QueueIssues";
import { getAllQueues, getQueueIssues, getStorageData, setStorageData } from "../services";
import { getServiceDesks } from "../services";

export const QueueModule = ({ serviceDeskKey }: { serviceDeskKey: string }) => {
    const [isQueuesLoading, setIsQueuesLoading] = useState(false);
    const [queues, setQueues] = useState<any>(null);
    const [isQueueIssuesLoading, setIsQueueIssuesLoading] = useState(false)
    const [queueIssues, setQueueIssues] = useState<any>(null);
    const [dataStorage, setDataStorage] = useState(null);
  
    const getQueues = async (serviceDeskKey: string) => {
      try {
        const response = await getAllQueues({ serviceDeskKey });
  
        setQueues(response.data);
      } catch (e) {
        console.error(e);
      } finally {
        setIsQueuesLoading(false);
      }
    };
  
    useEffect(() => {
      if (serviceDeskKey) {
        setIsQueuesLoading(true);
  
        getQueues(serviceDeskKey);
      }
    }, [serviceDeskKey]);
  
    const handleGetQueueIssues = async ({
      queueId,
    }: {
      queueId: number;
    }) => {
      setIsQueueIssuesLoading(true);
  
      try {
        const serviceDesksResponse = await getServiceDesks();
        const serviceDesks = serviceDesksResponse.data;
        const expectedServiceDesk = serviceDesks.find((serviceDesk: any) => serviceDesk.projectKey === serviceDeskKey);
  
        const response = await getQueueIssues({ serviceDeskId: expectedServiceDesk.id, queueId });
  
        setQueueIssues(response.data);
      } catch (e) {
        console.error(e);
      } finally {
        setIsQueueIssuesLoading(false);
      }
    };

    const handleSetStorageData = async () => {
      try {
        await setStorageData()
      } catch (e) {
        console.error(e);
      }
    }

    const handleGetStorageData = async () => {
      try {
        const result = await getStorageData();

        if (result.success && result.data) {
          setDataStorage(result.data);
        }

      } catch (e) {
        console.error(e);
      }
    }
  
    if (isQueuesLoading) {
      return <Spinner size="large" />;
    }
    return (
      <>
        <Text>Hello world!</Text>
  
        <Stack space='space.250' alignInline='start'>
          {queues &&
            queues.map((queue: any) => (
              <Button
                key={`queue-${queue.id}`}
                appearance="primary"
                onClick={() =>
                  handleGetQueueIssues({ queueId: queue.id })
                }
              >
                {queue.name}
              </Button>
            ))}
        </Stack>
        
  
        <QueueIssues isLoading={isQueueIssuesLoading} queueIssues={queueIssues} />

        <Button onClick={handleSetStorageData}>
          Set storage data
        </Button>

        <Button onClick={handleGetStorageData}>
          Get storage data
        </Button>

        {dataStorage ? <Text>{dataStorage}</Text> : null}
      </>
    );
};
