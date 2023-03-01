import { EC2 } from "@aws-sdk/client-ec2";

const INSTANCE_ID = process.env['INSTANCE_ID'];
if (INSTANCE_ID === undefined) {
    throw new Error('INSTANCE_ID not found')
}
const INSTANCE_REGION = process.env['INSTANCE_REGION'];
if (INSTANCE_REGION === undefined) {
    throw new Error('INSTANCE_REGION not found')
}

const stopInstance = async (ec2: EC2) => {
    const stopInstanceParam = {
        InstanceIds: [
            INSTANCE_ID
        ]
    }
    return await ec2.stopInstances(stopInstanceParam);
}

exports.handler = async () => {
    console.log(`try to stop instance \n INSTANCE_ID: ${INSTANCE_ID}`);
    const ec2 = new EC2({
        region: INSTANCE_REGION,
        apiVersion: 'latest'
    });
    await stopInstance(ec2);
    console.log(`finish to stop instance \n INSTANCE_ID: ${INSTANCE_ID}`);
};