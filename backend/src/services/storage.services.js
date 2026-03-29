const imageKit = require("imagekit");

const storageInstance = new imageKit({

    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey: process.env.IMAGEKIT_PRIVATE_KRY,
    urlEndpoint: process.env.IMAGEKIT_URL,

});

// ----------------------------------------
// funcation to upload file in imagekit
// -----------------------------------------

const imageKitSendFiles = async (file, fileName) => {

    try {
        const res = await storageInstance.upload({
            file,
            fileName,
            folder: "profile"
        })

        return res
    } catch (error) {
        console.log("error in imagekit", error)
    }
};

module.exports = imageKitSendFiles;