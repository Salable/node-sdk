import Stripe from "stripe";

const STRIPE_KEY = process.env.STRIPE_KEY;

export default async function createStripeCustomAccount() {
    const stripe = new Stripe(STRIPE_KEY!, {apiVersion: "2024-10-28.acacia"});

    let account = await stripe.accounts.create({
        country: 'US',
        type: 'custom',
        business_type: 'company',
        capabilities: {
            card_payments: {
                requested: true,
            },
            transfers: {
                requested: true,
            },
        },
        external_account: 'btok_us',
        tos_acceptance: {
            service_agreement: 'full',
            date: 1547923073,
            ip: '172.18.80.19',
        },
    });

    account = await stripe.accounts.update(
        account.id,
        {
            business_profile: {
                mcc: '5045',
                url: 'https://bestcookieco.com',
            },
            company: {
                address: {
                    city: 'Schenectady',
                    line1: 'address_full_match',
                    postal_code: '12345',
                    state: 'NY',
                },
                tax_id: '000000000',
                name: 'The Best Cookie Co',
                phone: '8888675309',
            },
        }
    );

    let representative = await stripe.accounts.createPerson(
        account.id,
        {
            first_name: 'Jenny',
            last_name: 'Rosen',
            relationship: {
                representative: true,
                title: 'CEO',
            },
        }
    );

    representative = await stripe.accounts.updatePerson(
        account.id,
        representative.id,
        {
            address: {
                city: 'Schenectady',
                line1: 'address_full_match',
                postal_code: '12345',
                state: 'NY',
            },
            dob: {
                day: 1,
                month: 1,
                year: 1902,
            },
            ssn_last_4: '0000',
            phone: '8888675309',
            email: 'jenny@bestcookieco.com',
            relationship: {
                executive: true,
            },
            id_number: '000-00-0000'
        }
    );

    let owner = await stripe.accounts.createPerson(
        account.id,
        {
            first_name: 'Kathleen',
            last_name: 'Banks',
            email: 'kathleen@bestcookieco.com',
            relationship: {
                owner: true,
                percent_ownership: 80,
            },
            id_number: '000-00-0000'
        }
    );

    owner = await stripe.accounts.updatePerson(
        account.id,
        owner.id,
        {
            address: {
                city: 'Schenectady',
                line1: 'address_full_match',
                postal_code: '12345',
                state: 'NY',
            },
            dob: {
                day: 1,
                month: 1,
                year: 1902,
            },
            ssn_last_4: '0000',
            phone: '8888675309',
            email: 'kathleen@bestcookieco.com',
            relationship: {
                owner: true,
                percent_ownership: 80,
            },
        }
    );

    account = await stripe.accounts.update(
        account.id,
        {
            company: {
                owners_provided: true,
            },
        }
    );

    const stripeConnect = new Stripe(STRIPE_KEY!, {
        apiVersion: "2024-10-28.acacia",
        stripeAccount: account.id
    });

    // Note: poll account until stripe has completed account verification
    while (true) {
        const connectedAccount = await stripeConnect.accounts.retrieve();
        console.log('Pending requirements: ', connectedAccount.requirements?.pending_verification?.length);
        if (connectedAccount.requirements?.pending_verification?.length === 0) break;
        await new Promise(r => setTimeout(r, 2000));
    }

    console.log('Account ID:', account.id);

    return account;
}