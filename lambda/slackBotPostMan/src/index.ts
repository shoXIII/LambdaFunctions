const ENDPOINT = process.env['ENDPOINT'];
if (ENDPOINT === undefined) {
    throw new Error('ENDPOINT not found')
}

const fetchSlack = async (e: any) => {
    if (!e.message) {
        throw new Error('invoke request have no message')
    }
    const message = {
        "text" : e.message
    }
    return await fetch(ENDPOINT, {
        method: 'POST',
        body: JSON.stringify(message)
    });
}

exports.handler = async (e: any) => {
    console.log(`try to send message to slack`);
    await fetchSlack(e);
    console.log(`complete to send message to slack`);
};