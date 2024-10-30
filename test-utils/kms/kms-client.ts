import { KMSClient } from '@aws-sdk/client-kms';

if (!process.env.AWS_THIRD_PARTY_API_REGION) throw Error('Missing environment variable AWS_THIRD_PARTY_API_REGION');
if (!process.env.AWS_ACCESS_KEY_ID) throw Error('Missing environment variable AWS_ACCESS_KEY_ID');
if (!process.env.AWS_SECRET_ACCESS_KEY) throw Error('Missing environment variable AWS_SECRET_ACCESS_KEY');
if (!process.env.AWS_SESSION_TOKEN) throw Error('Missing environment variable AWS_SESSION_TOKEN');

const kmsClient = new KMSClient({
  region: process.env.AWS_THIRD_PARTY_API_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    sessionToken: process.env.AWS_SESSION_TOKEN,
  },
});

export default kmsClient;
