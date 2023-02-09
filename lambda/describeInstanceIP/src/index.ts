import { EC2 } from "@aws-sdk/client-ec2";
import { SNS } from "@aws-sdk/client-sns";

const INSTANCE_ID = process.env['INSTANCE_ID'];
if (INSTANCE_ID === undefined) {
    throw new Error('INSTANCE_ID not found')
}
const INSTANCE_REGION = process.env['INSTANCE_REGION'];
if (INSTANCE_REGION === undefined) {
    throw new Error('INSTANCE_REGION not found')
}
const SNS_REGION = process.env['SNS_REGION'];
if (SNS_REGION === undefined) {
    throw new Error('SNS_REGION not found')
}
const TOPICS_ARN =  process.env['TOPICS_ARN'];
if (TOPICS_ARN === undefined) {
    throw new Error('TOPICS_ARN not found')
}

const getInstanceIP = async (ec2: EC2): Promise<string> => {
    const param = {
        InstanceIds: [
            INSTANCE_ID
        ]
    };
    
    const ipAddress = await ec2.describeInstances(param).then((data) => {
        return data.Reservations?.[0].Instances?.[0].PublicIpAddress
    }).catch((e) => {
        throw e;
    });
    if (!ipAddress) {
        throw new Error('ipAddress is empty');
    }

    return ipAddress;
}

const publishTopics = async(sns: SNS, message: string) => {
    const output = await sns.publish({
        Message: message,
        TopicArn: TOPICS_ARN,
        Subject: '今日のIPのお知らせ'
    });
    console.log(output);
}

exports.handler = async () => {
    const ec2 = new EC2({
        region: INSTANCE_REGION,
        apiVersion: 'latest'
    });
    const ipAddress = await getInstanceIP(ec2);
    const sns = new SNS({
        region: SNS_REGION,
    });
    const message = `今日のIPはこれだよ↓\n https://${ipAddress}`
    await publishTopics(sns, message);
};