const Certificate = require("../models/Certificate");

exports.requestCertificate = async (req, res) => {
  try {
    const certificate = new Certificate({
      student: req.user.id,
      certificateType: req.body.certificateType,
      description: req.body.description,
    });
    await certificate.save();
    res.status(200).json(certificate);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
