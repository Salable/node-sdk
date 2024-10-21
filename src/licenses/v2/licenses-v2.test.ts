// // licenses-v2.test.ts

// import { Version, initRequest } from "../..";
// import { v2LicenseMethods } from ".";
// import { log } from "console";

// // test the various query params of each method
// //  - grab the schemas from TPA
// //  - grab the types from the TPA
// //  - version the types
// //  - convert interfaces to types
// describe('Licenses V2 Tests', () => {
//     const apiKey = process.env.SALABLE_TEST_API_KEY!;
//     const version = Version.V2;

//     const req = initRequest(apiKey, version);
//     const licensesV2 = v2LicenseMethods(req);

//     it('getAll: Should succesfully fetch licenses', async () => {
//         const data = await licensesV2.getAll();

//         expect(data).toEqual(
//             expect.objectContaining({
//                 first: expect.any(String),
//                 last: expect.any(String),
//                 data: expect.arrayContaining([licenseSchema])
//             })
//         );
//     });
//     it('getOne: Should succesfully fetch the specified license', async () => {
//         const data = await licensesV2.getOne('1e97a9ea-c66a-4822-a5f1-bebf5ea7e44c');

//         log(data)
//         expect(data).toEqual(expect.objectContaining(licenseSchema))
//     });
//     it('getCount: Should succesfully fetch a subscriptions count', async () => {
//         const data = await licensesV2.getCount({ subscriptionUuid: '04c4bada-7133-4829-a27c-8e5b00558b9e', status: 'ACTIVE' });

//         expect(data).toEqual(expect.objectContaining({
//             count: expect.any(Number),
//             assigned: expect.any(Number),
//             unassigned: expect.any(Number),
//         }));
//     });
//     it('getForPurchaser: Should succesfully fetch a purchasers licenses', async () => {
//         const data = await licensesV2.getForPurchaser({ purchaser: 'tester@testing.com', productUuid: '29c9a7c8-9a41-4e87-9e7e-7c62d293c131' });

//     });
//     it('getForGranteeId: Should succesfully fetch a grantees licenses', async () => {
//         const data = await licensesV2.getForGranteeId({ granteeId: '123456' });

//     });
//     it('create: Should succesfully create a license', async () => {
//         const data = await licensesV2.create([{
//             planUuid: '5a866dba-20c9-466f-88ac-e05c8980c90b',
//             member: 'example',
//             granteeId: '123456',
//             status: 'ACTIVE'
//         }]);

//         log(data)

//     });
//     it('update: Should succesfully update a license', async () => {
//         const data = await licensesV2.update('1e97a9ea-c66a-4822-a5f1-bebf5ea7e44c', { granteeId: 'updated-grantee-id' });

//     });
//     it('updateMany: Should succesfully update multiple licenses', async () => {
//         const data = await licensesV2.updateMany([
//             {
//                 uuid: '1e97a9ea-c66a-4822-a5f1-bebf5ea7e44c',
//                 granteeId: 'updated-grantee'
//             },
//             {
//                 uuid: '264e98fb-38c6-48cd-aa77-5b6b631fbc95',
//                 granteeId: 'updated-grantee'
//             }
//         ]);

//     });
//     it('cancel: Should succesfully cancel the specified license', async () => {
//         const data = await licensesV2.cancel('264e98fb-38c6-48cd-aa77-5b6b631fbc95');

//     });
//     it('cancelMany: Should succesfully multiple licenses', async () => {
//         const data = await licensesV2.cancelMany(['28362f68-d919-4a3a-bada-b868a104bd37', '80b36154-3d49-47b2-b99a-1c59698c14db']);

//     });
//     it('check: Should succesfully check the specified grantees permissions', async () => {
//         const data = await licensesV2.check({
//             productUuid: '29c9a7c8-9a41-4e87-9e7e-7c62d293c131',
//             granteeIds: ['123456', 'userId_0']
//         });

//     });
//     it('verify: Verifies the license-check signatures correctly', async () => {
//         const testPublicKeyPem = `-----BEGIN PUBLIC KEY-----\nMFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAES7jvFxC50Fe2hHd3Sn7Q8TvnxuSZ\nV8HvRHGDvFacOiESAqg3uroeNTgoT7lD4BwQ+fFsn7zig5hwncoTsrCPbw==\n-----END PUBLIC KEY-----`;
//         const testLicenseCheckData = [
//             { capability: 'One', expiry: '2024-08-14T13:15:49.310Z' },
//             { capability: 'Two', expiry: '2024-08-14T13:15:49.310Z' },
//             { capability: 'free_plan_name', expiry: '2024-08-14T13:32:29.313Z' },
//             { capability: 'Three', expiry: '2024-08-14T13:32:29.313Z' },
//             { capability: 'Four', expiry: '2024-08-14T13:32:29.313Z' },
//         ];
//         const testSignature =
//             '3045022100b210aa29519f3146afe7a0d343a6b7ec5e47a1ac0de9686e2ec4cf0081e159c402206ecf98ad4d1d339c59f7ff3b4744d1f377747702c6253f7904ef6589191a2254';
//         const testIncorrectSignature = 'bad-signature';

//         const falseLicenseCheck = licensesV2.verify({
//             publicKey: testPublicKeyPem,
//             signature: testIncorrectSignature,
//             payload: JSON.stringify(testLicenseCheckData)
//         });
//         const trueLicenseCheck = licensesV2.verify({
//             publicKey: testPublicKeyPem,
//             signature: testSignature,
//             payload: JSON.stringify(testLicenseCheckData)
//         });

//         expect(falseLicenseCheck).toEqual(false);
//         expect(trueLicenseCheck).toEqual(true);
//     });
// });

// const licenseCapabilitySchema = { // check type
//     uuid: expect.any(String),
//     productUuid: expect.any(String),
//     name: expect.any(String),
//     status: expect.any(String),
//     description: expect.toBeOneOf([expect.any(String), null]),
//     updatedAt: expect.any(String),
// };

// const licenseSchema = {
//     uuid: expect.any(String),
//     name: expect.toBeOneOf([expect.any(String), null]),
//     email: expect.toBeOneOf([expect.any(String), null]),
//     subscriptionUuid: expect.any(String),
//     status: 'ACTIVE',
//     granteeId: expect.any(String) || null,
//     paymentService: 'ad-hoc',
//     purchaser: expect.any(String),
//     type: 'metered',
//     productUuid: expect.any(String),
//     planUuid: expect.any(String),
//     capabilities: expect.arrayContaining([licenseCapabilitySchema]),
//     metadata: null,
//     startTime: expect.any(String),
//     endTime: expect.any(String),
//     updatedAt: expect.any(String),
//     isTest: expect.any(Boolean)
// };
