const express = require('express');
const PImage = require('pureimage');
const fs = require('fs');
const path = require('path');
const PerpetualOutput = require('./perpetual');

const app = express();
const port = process.env.PORT || 3000;

// Determine the correct font path
const fontPath = process.env.VERCEL 
  ? path.join(process.cwd(), 'public', 'simhei.ttf')
  : 'simhei.ttf';

// Load the font
let fontLoaded;
PImage.registerFont(fontPath, 'SimHei').load(() => {
  fontLoaded = true;
  console.log('Font loaded successfully');
});

app.get('/lunar/getpic', async (req, res) => {
  if (!fontLoaded) {
    return res.status(503).send('Font not loaded yet. Please try again.');
  }

  const img = PImage.make(400, 300);
  const ctx = img.getContext('2d');

  ctx.fillStyle = 'white';
  ctx.fillRect(0, 0, 400, 300);

  ctx.font = '20px SimHei';
  ctx.fillStyle = 'black';

  let y = 30;
  for (const [key, value] of Object.entries(PerpetualOutput)) {
    ctx.fillText(`${key}: ${value}`, 10, y);
    y += 25;
  }

  const stream = new (require('stream').Readable)();
  stream.push(await PImage.encodePNGToStream(img));
  stream.push(null);

  res.setHeader('Content-Type', 'image/png');
  stream.pipe(res);
});

app.get('/lunar/getapi', (req, res) => {
  res.json(PerpetualOutput);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});