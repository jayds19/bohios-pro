const saveTour = async (req, res) => {
  let { tourList } = req.body;

  //console.log(">>> Tour List: ", tourList);
  //console.log("Request File: ", req.files);
  console.log(">>> Request size: ", req.size);
  res.send({ message: "OK" });
};

module.exports = {
  saveTour
};
