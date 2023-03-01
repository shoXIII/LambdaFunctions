import { ApiFactory } from 'https://deno.land/x/aws_api/client/mod.ts';
import { EC2 } from 'https://aws-api.deno.dev/v0.4/services/ec2.ts';

const INSTANCE_ID = Deno.env.get("INSTANCE_ID");
if (INSTANCE_ID === undefined) {
    throw new Error('INSTANCE_ID not found')
}

const startInstance = async (ec2: EC2) => {
    const startInstanceParam = {
        InstanceIds: [
            INSTANCE_ID
        ]
    }
    return await ec2.startInstances(startInstanceParam);
}
export async function handler() {
    console.log(`try to start instance \n INSTANCE_ID: ${INSTANCE_ID}`);
    const ec2 = new ApiFactory().makeNew(EC2);
    await startInstance(ec2);
    console.log(`finish to start instance \n INSTANCE_ID: ${INSTANCE_ID}`);
};