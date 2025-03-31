const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

const downloadAudio = async (url) => {
  return new Promise((resolve, reject) => {
    const outputPath = path.join(__dirname, '../../temp');
    const filename = `audio-${Date.now()}.mp3`;
    const fullPath = path.join(outputPath, filename);

    // Create temp directory if it doesn't exist
    try {
      if (!fs.existsSync(outputPath)) {
        fs.mkdirSync(outputPath, { recursive: true });
      }
    } catch (err) {
      console.error('Failed to create temp directory:', err);
      return reject(new Error('Failed to create temp directory for audio files'));
    }

    // Download audio using yt-dlp (assumes it's in PATH)
    const command = `yt-dlp -x --audio-format mp3 -o "${fullPath}" "${url}"`;
    
    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error downloading audio:`, {error, stdout, stderr});
        if (stderr.includes('Sign in to confirm you’re not a bot')) {
          return reject(new Error('YouTube requires authentication. Please provide cookies or try again later.'));
        }
        return reject(new Error('Failed to download audio: ' + stderr));
      }
      resolve(fullPath);
    });
  });
};

module.exports = { downloadAudio };