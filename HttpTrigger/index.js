const streams = require('memory-streams');
const request = require('request-promise-native');


module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');
    const writer = new streams.WritableStream();

    if (req.body && req.body.image_url) {
        context.log(req.body.image_url);
        const response = await request({url: req.body.image_url, encoding: null});
        writer.write(Buffer.from(response, 'utf8'));
        context.bindings.response = writer.toBuffer();
    }
    else {
        context.res = {
            status: 400,
            body: "Please pass a name on the query string or in the request body"
        };
    }
};