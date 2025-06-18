import { Box, Spinner, Text } from "@forge/react";

export const QueueIssues = ({
  isLoading,
  queueIssues,
}: {
  isLoading: boolean;
  queueIssues: any[];
}) => {

  if (isLoading) {
    return <Spinner size="medium" />;
  }

  if (!isLoading && !queueIssues?.length) {
    return null;
  }

  return (
    <Box>
      {queueIssues.map((queueIssue) => (
        <Box key={`queue-issue-${queueIssue.id}`}>
          <Text><Text as='strong'>Key:</Text> {queueIssue.key}</Text>
          <Text><Text as='strong'>Description: </Text> {queueIssue.fields.status.description}</Text>
          <Text><Text as='strong'>Status:</Text> {queueIssue.fields.status.name}</Text>
        </Box>
      ))}
    </Box>
  );
};
