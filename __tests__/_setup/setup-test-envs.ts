import createStripeData from '../../test-utils/stripe/create-stripe-test-data';
import createTestData from '../../test-utils/scripts/create-test-data';
import { config } from 'dotenv';
import { exec } from 'child_process';
import { promisify } from 'util';
import getConsoleLoader from '../../test-utils/helpers/console-loading-wheel';

const promiseExec = promisify(exec);

config({ path: '.env.test' });

const globalSetup = async () => {
    console.log('\n PREPARING GLOBAL SETUP')
    const loadingWheel = getConsoleLoader('RESETTING DATABASE');
    await promiseExec('npx prisma db push --force-reset');
    clearInterval(loadingWheel);
    console.log('\n DATABASE RESET');
    
    await createStripeData();
    console.log('\n STRIPE ACCOUNT DATA CREATED')

    await createTestData();
    console.log('\n TEST DATA CREATED');
};

export default globalSetup;