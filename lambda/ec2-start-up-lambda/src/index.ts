import AWS from "aws-sdk";

const INSTANCE_ID = process.env['INSTANCE_ID'];
if (INSTANCE_ID === undefined) {
    throw new Error('INSTANCE_ID not found')
}
const INSTANCE_REGION = process.env['INSTANCE_REGION'];
if (INSTANCE_REGION === undefined) {
    throw new Error('INSTANCE_REGION not found')
}

const startInstance = (ec2: AWS.EC2) => {
    const startInstanceParam = {
        InstanceIds: [
            INSTANCE_ID
        ]
    }
    return new Promise((resolve, reject) => {
        ec2.startInstances(startInstanceParam, (err, data) => {
            if (err) {
                console.log(err, err.stack);
                reject(err);
                return
            } 
            console.log(data);
            resolve;
        });
    });
}
exports.handler = async () => {
    console.log(`try to start up instance \n INSTANCE_ID: ${INSTANCE_ID}`);
    AWS.config.update({
        region: INSTANCE_REGION
    })
    const ec2 = new AWS.EC2({
        apiVersion: 'latest'
    });
    await startInstance(ec2);
};