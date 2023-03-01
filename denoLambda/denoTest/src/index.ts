import { EC2 } from "https://deno.land/x/aws_sdk@v3.32.0-1/client-ec2/mod.ts"
  
const INSTANCE_ID = Deno.env.get("INSTANCE_ID");
if (INSTANCE_ID === undefined) {
    throw new Error('INSTANCE_ID not found')
}
const INSTANCE_REGION = Deno.env.get("INSTANCE_REGION");
if (INSTANCE_REGION === undefined) {
    throw new Error('INSTANCE_REGION not found')
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
    const config = {
        region: INSTANCE_REGION,
        apiVersion: 'latest'
    }
    const ec2 = new EC2(config);
    await startInstance(ec2);
    console.log(`finish to start instance \n INSTANCE_ID: ${INSTANCE_ID}`);
};