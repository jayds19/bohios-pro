const fs = require("fs");
const saveImage = (name, data) =>
	new Promise((resolve, reject) => {
		fs.writeFile(`./public/gallery/${name}`, data, "base64", (error) => {
			if (error) {
				reject(error);
				return;
			}
			resolve("OK");
		});
	});

const saveGalleryImages = async (imageList) => {
	for (let i = 0; i < imageList.length; i++) {
		if (imageList[i].remove == 1) {
			fs.unlinkSync(`./public/gallery/${imageList[i].name}`);
		}

		if (imageList[i].imageString != "" && imageList[i].imageString != undefined) {
			let base64 = imageList[i].imageString.split(",")[1];
			let name = imageList[i].name;

			try{
				await saveImage(name, base64);
			} catch (ex) {
				throw new Error("Could not save image. ", ex.message);
			}
		}
	}
};

module.exports = {
	saveGalleryImages
};
