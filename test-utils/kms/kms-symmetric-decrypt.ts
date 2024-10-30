import { DecryptCommandInput, DecryptCommand, KMSClient } from '@aws-sdk/client-kms';

export default async function kmsSymmetricDecrypt(data: Uint8Array): Promise<string | void> {
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

  try {
    const input: DecryptCommandInput = {
      KeyId: process.env.KMS_ENCRYPTION_KEY_ARN,
      CiphertextBlob: data,
    };

    const command = new DecryptCommand(input);
    const response = await kmsClient.send(command);
    return new TextDecoder().decode(response.Plaintext);
  } catch (err) {
    console.log(err);
  }
}
