import { useEffect, useState } from "react";
import {
  Box,
  Button,
  ErrorMessage,
  Inline,
  Label,
  LoadingButton,
  RequiredAsterisk,
  Spinner,
  Stack,
  Text,
  Textfield,
} from "@forge/react";

import { QueueIssues } from "./QueueIssues";
import {
  getAllQueues,
  getQueueIssues,
  getStorageData,
  setStorageData,
} from "../services";
import { getServiceDesks } from "../services";

export const QueueModule = ({ serviceDeskKey }: { serviceDeskKey: string }) => {
  const [isQueuesLoading, setIsQueuesLoading] = useState(false);
  const [queues, setQueues] = useState<any>(null);
  const [isQueueIssuesLoading, setIsQueueIssuesLoading] = useState(false);
  const [queueIssues, setQueueIssues] = useState<any>(null);
  const [storageFieldValue, setStorageFieldValue] = useState<string>();
  const [dataStorage, setDataStorage] = useState(null);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [isSavingStorageDataLoading, setSavingStorageDataLoading] =
    useState(false);

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

  const handleGetQueueIssues = async ({ queueId }: { queueId: number }) => {
    setIsQueueIssuesLoading(true);

    try {
      const serviceDesksResponse = await getServiceDesks();
      const serviceDesks = serviceDesksResponse.data;
      const expectedServiceDesk = serviceDesks.find(
        (serviceDesk: any) => serviceDesk.projectKey === serviceDeskKey
      );

      const response = await getQueueIssues({
        serviceDeskId: expectedServiceDesk.id,
        queueId,
      });

      setQueueIssues(response.data);
    } catch (e) {
      console.error(e);
    } finally {
      setIsQueueIssuesLoading(false);
    }
  };

  const handleSetStorageData = async () => {
    setSavingStorageDataLoading(true);
    try {
      if (!storageFieldValue) {
        setValidationError("This field is required");
      } else {
        setValidationError(null);
        await setStorageData("storage-field", storageFieldValue);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setSavingStorageDataLoading(false);
    }
  };

  const handleGetStorageData = async () => {
    try {
      const result = await getStorageData();

      if (result.success && result.data) {
        setDataStorage(result.data);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleChangeStorageFieldValue = (event: any) => {
    const value = event.target.value;

    setStorageFieldValue(value);
  };

  if (isQueuesLoading) {
    return <Spinner size="large" />;
  }
  return (
    <>
      <Text>Hello world!</Text>
      <Stack>
        <Inline space="space.250" alignInline="start">
          {queues &&
            queues.map((queue: any) => (
              <Button
                key={`queue-${queue.id}`}
                appearance="primary"
                onClick={() => handleGetQueueIssues({ queueId: queue.id })}
              >
                {queue.name}
              </Button>
            ))}
        </Inline>

        <QueueIssues isLoading={isQueueIssuesLoading} queueIssues={queueIssues} />
      </Stack>

      <Box xcss={{ width: '500px' }} paddingBlockStart='space.500'>
        <Label labelFor="storage-textfield">Storage field for saving <RequiredAsterisk /></Label>
        <Textfield
          name="storage-textfield"
          onChange={handleChangeStorageFieldValue}
          value={storageFieldValue}
        />
        {validationError && <ErrorMessage>{validationError}</ErrorMessage>}

        <LoadingButton
          onClick={handleSetStorageData}
          isLoading={isSavingStorageDataLoading}
        >
          Save
        </LoadingButton>

        <Box paddingBlockStart='space.200'>
          <Button onClick={handleGetStorageData}>Get storage data</Button>
        </Box>

        {dataStorage ? <Text>{dataStorage}</Text> : null}
      </Box>
     
    </>
  );
};
