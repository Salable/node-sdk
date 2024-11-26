import { EncryptCommand, EncryptCommandInput, KMSClient } from '@aws-sdk/client-kms';

export default async function kmsSymmetricEncrypt(data: string): Promise<Uint8Array> {
  if (!process.env.AWS_THIRD_PARTY_API_REGION) throw Error('Missing environment variable AWS_THIRD_PARTY_API_REGION');
  if (!process.env.AWS_ACCESS_KEY_ID) throw Error('Missing environment variable AWS_ACCESS_KEY_ID');
  if (!process.env.AWS_SECRET_ACCESS_KEY) throw Error('Missing environment variable AWS_SECRET_ACCESS_KEY');

  const kmsClient = new KMSClient({
    region: process.env.AWS_THIRD_PARTY_API_REGION,
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      ...(process.env.AWS_SESSION_TOKEN && { sessionToken: process.env.AWS_SESSION_TOKEN }),
    },
  });

  const input: EncryptCommandInput = {
    KeyId: process.env.KMS_ENCRYPTION_KEY_ARN,
    Plaintext: new TextEncoder().encode(data),
  };

  const command = new EncryptCommand(input);
  let encryptedData: Uint8Array | undefined;

  try {
    const response = await kmsClient.send(command);
    encryptedData = response.CiphertextBlob;
  } catch (err) {
    console.log('KMS encryption error: ', err);
    throw new Error('Failed to encrypt data');
  }

  if (!encryptedData) throw new Error('Failed to encrypt data');

  return encryptedData;
}
