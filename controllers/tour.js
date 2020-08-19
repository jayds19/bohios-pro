const saveTour = async (req, res) => {
  //console.log(">>> Tour List: ", tourList);
  console.log(">>> Request File: ", req.files);
  console.log(">>> Request Body: ", req.body);

  res.send({ message: "OK" });
};

module.exports = {
  saveTour
};
