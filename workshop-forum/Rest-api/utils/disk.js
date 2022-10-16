const { google } = require('googleapis');
const crypto = require("crypto");
const fs = require('fs');

const auth = new google.auth.GoogleAuth({
    keyFile: './config/test-su-project-365110-5fd18d66bded.json',
    scopes: ['https://www.googleapis.com/auth/drive'],
});

const drive = google.drive({
    version: 'v3',
    auth: auth
});

/**
 * 
 * @param {File} file 
 * @returns {Promise<string>}
 */
 function uploadFile(file) {
    var fileMetadata = {
        name: `${crypto.randomBytes(20).toString('hex')}.png`,
        parents: ['1oBGe7p7ZmZiUDMIKgHab9hdmk01iqwNo'],
    };
    var media = {
        mimeType: 'image/png',
        body: fs.createReadStream(file.path)
    };

    return drive.files.create({
        resource: fileMetadata,
        media: media,
        fields: 'id'
    }).then(file => {
        console.log('File Id: ', file.data.id);
        return file.data.id;
    }).catch((err) => console.error(err));
}

module.exports = {
    uploadFile
}