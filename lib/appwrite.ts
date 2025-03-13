import { Client, Databases } from "appwrite";


const client = new Client();

client
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT as string) // Appwrite Endpoint
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID as string); // Appwrite Project ID

export const databases = new Databases(client);
