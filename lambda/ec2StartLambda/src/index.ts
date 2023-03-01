import { EC2 } from "@aws-sdk/client-ec2";

const INSTANCE_ID = process.env['INSTANCE_ID'];
if (INSTANCE_ID === undefined) {
    throw new Error('INSTANCE_ID not found')
}
const INSTANCE_REGION = process.env['INSTANCE_REGION'];
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

exports.handler = async () => {
    console.log(`try to start instance \n INSTANCE_ID: ${INSTANCE_ID}`);
    const ec2 = new EC2({
        region: INSTANCE_REGION,
        apiVersion: 'latest'
    });
    await startInstance(ec2);
    console.log(`finish to start instance \n INSTANCE_ID: ${INSTANCE_ID}`);
};