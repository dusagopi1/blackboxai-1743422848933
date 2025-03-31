const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

const downloadAudio = async (url) => {
  return new Promise((resolve, reject) => {
    const outputPath = path.join(__dirname, '../../temp');
    const filename = `audio-${Date.now()}.mp3`;
    const fullPath = path.join(outputPath, filename);

    // Create temp directory if it doesn't exist
    if (!fs.existsSync(outputPath)) {
      fs.mkdirSync(outputPath, { recursive: true });
    }

    // Download audio using yt-dlp
    const command = `yt-dlp -x --audio-format mp3 -o "${fullPath}" "${url}"`;
    
    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error downloading audio: ${stderr}`);
        return reject(new Error('Failed to download audio'));
      }
      resolve(fullPath);
    });
  });
};

module.exports = { downloadAudio };