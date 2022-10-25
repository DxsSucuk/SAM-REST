import SamJs from 'sam-js';
import express from 'express';
import util from 'tweetnacl-util';

const app = express();

app.get('/', async function (request, result) {
    let text = request.query.text;
    let pitch = request.query.pitch;
    let speed = request.query.speed;
    let mouth = request.query.mouth;
    let throat = request.query.throat;

    if (text == null) {
        result.end(JSON.stringify({success: false, message: "No Text!"}));
        return;
    }

    let sam = new SamJs();
    const buf8 = sam.buf8(text);

    const encoded = util.encodeBase64(buf8);

    console.log(encoded);

    result.status(200).end(JSON.stringify({success: true, message: "Working!", data: encoded}))
})

const server = app.listen(8081, () => {
    const host = server.address().address
    const port = server.address().port
    console.log("Listening at http://%s:%s", host, port)
});

function generateID(length) {
    let result = '';
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}