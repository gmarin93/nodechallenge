const multer = require("multer");
const IndexModel = require("../models/Files");
const csv = require("csvtojson");
const fs = require("fs");


//Configuration Multer
const MulterConfig = {
  limits: { fileSize: 1000000 },
  storage: (fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, __dirname + "/../uploads");
    },
    filename: (req, file, cb) => {
      const extFile = file.originalname.replace(".", "");
      if (extFile.includes("csv"))
        cb(null, file.fieldname + "-" + Date.now() + "-" + file.originalname);
      else cb(new TypeError("File format is not valid"));
    },
  })),
};


//Upload CSV files to DB
const upload = multer(MulterConfig).single("file");

exports.loadFile = async (req, res, next) => {
  try {
    upload(req, res, async (error) => {
      if (!error && req.file.filename) {
        let filePath = __dirname + "/../uploads/" + req.file.filename;
        csv()
          .fromFile(filePath)
          .then(async (jsonData) => {
            let arrayData = [];

            //Turns the received data into IndexModal format and only gets that established data
            jsonData.map((e) => {
              let schemaData = new IndexModel(e);
              arrayData.push(new IndexModel(schemaData));
            });

            IndexModel.insertMany([...arrayData]); //Save CSV data into MongoDB

            fs.unlinkSync(`${__dirname}/../uploads/${req.file.filename}`); //Delete the file loaded
            res.json({ data: arrayData });
          });
      } else res.json({ msg: 'Something goes wrong, check the file extension' });
    });
  } catch (error) {
    res.json({ msg: error });
  }
};
