import { Magic } from "mmmagic";
import sharp from "sharp";
import util from "util";

const isImage = async (imageBuffer: Buffer) => {
    const magic = new Magic();
    const magicDetect = util.promisify(magic.detect.bind(magic));
    const fileType = (await magicDetect(imageBuffer)) as string;
    return fileType.includes("image");
};
const createProfilePicture = async (imageBuffer: Buffer) => {
    const profilePicture = { full: Buffer.from(""), mini: Buffer.from("") };
    if (await isImage(imageBuffer)) {
        profilePicture.full = await sharp(imageBuffer).resize(400, 400).toBuffer();
        profilePicture.mini = await sharp(imageBuffer).resize(64, 64).toBuffer();
    }
    return profilePicture;
};
const createPostImage = async (imageBuffer: Buffer) => {
    let postImage = Buffer.from("");
    if (await isImage(imageBuffer)) {
        postImage = await sharp(imageBuffer)
            .resize(512, 512, {
                withoutEnlargement: true,
                fit: "inside",
            })
            .toBuffer();
    }
    return postImage;
};

export { createProfilePicture, isImage, createPostImage };
