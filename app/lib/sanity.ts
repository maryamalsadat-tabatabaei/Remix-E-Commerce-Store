import { createClient } from "@sanity/client";

const projectId = "rde7cxg8";
const dataset = "production";
const apiVersion = "2023-01-01";

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
  token:
    "skP6LjcIsVLT27IxhjpLspAvPYiMhi9deynqCy5bdFNX5oy8uZsOY8G92Nljd5XWf7SJXXoKH50uwNIfbpg38ZQ7WzQdT7Q0GHigJ4TGS59GZoqZUJYmQDmqPpPAxHnL3TTQsjyuqZlWDC5PdzIj9nrVDk3oz8KnMyTRYQFMRxKWYq1FFsEj",
});
