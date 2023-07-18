const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();
const port = 3001;

// تكوين multer لرفع الملفات
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'upload/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const fileExtension = path.extname(file.originalname);
    cb(null, uniqueSuffix + fileExtension);
  },
});
const upload = multer({ storage: storage });

// تقديم ملف index.html
app.use(express.static('down-up/build'));

// معالجة رفع الملف
app.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    res.status(400).send('No file uploaded');
  } else {
    res.send('File uploaded successfully');
  }
});

// معالجة تنزيل الملف
app.get('/download/:filename', (req, res) => {
  const file = path.join(__dirname, 'upload', req.params.filename);
  res.download(file);
});

// بدء تشغيل الخادم
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
