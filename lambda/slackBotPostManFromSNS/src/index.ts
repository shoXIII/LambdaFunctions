import { SNSEvent } from "aws-lambda";

const ENDPOINT = process.env['ENDPOINT'];
if (ENDPOINT === undefined) {
    throw new Error('ENDPOINT not found');
}

const fetchSlack = async (e: SNSEvent) => {
    if (!e.Records[0].Sns.Message) {
        throw new Error('invoke request have no message');
    }
    const message = {
        "text" : e.Records[0].Sns.Message
    }
    return await fetch(ENDPOINT, {
        method: 'POST',
        body: JSON.stringify(message)
    });
}

exports.handler = async (e: SNSEvent) => {
    console.log(`try to send message to slack`);
    await fetchSlack(e);
    console.log(`complete to send message to slack`);
};