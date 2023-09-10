import { createClient } from "@sanity/client";

const projectId = process.env.PROJECT_ID;
const dataset = process.env.DATASET;
const apiVersion = "2023-01-01";

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
});
