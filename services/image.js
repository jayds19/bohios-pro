const fs = require("fs");

const genImageName = () =>
	Math.random().toString(36).substring(2, 15) +
	Math.random().toString(36).substring(2, 15);

const saveImage = (imageLocation, imageData) =>
	new Promise((resolve, reject) => {
		fs.writeFile(imageLocation, imageData, "base64", (error) => {
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
			try {
				fs.unlinkSync(`./public/gallery/${imageList[i].name}`);
			} catch (ex) {
				console.log("Imagen a eliminar no encontrada.");
			}
		}

		if (
			imageList[i].imageString != "" &&
			imageList[i].imageString != undefined
		) {
			let base64 = imageList[i].imageString.split(",")[1];
			let name = imageList[i].name;

			try {
				await saveImage(`./public/gallery/${name}`, base64);
			} catch (ex) {
				throw new Error("Could not save image. ", ex.message);
			}
		}
	}
};

module.exports = {
	genImageName,
	saveImage,
	saveGalleryImages,
};
