const express = require('express');
const router = express.Router();
const { downloadAudio } = require('../utils/download');
const { transcribe } = require('../utils/transcribe');
const { generateQA } = require('../utils/qa');

router.post('/', async (req, res) => {
  try {
    const { url } = req.body;
    
    // Validate YouTube URL
    if (!url || !url.match(/youtu\.?be/)) {
      return res.status(400).json({ error: 'Invalid YouTube URL' });
    }

    // Process pipeline
    const audioPath = await downloadAudio(url);
    const transcript = await transcribe(audioPath);
    const qaPairs = await generateQA(transcript);

    res.json({ 
      transcript, 
      qa_pairs: qaPairs 
    });

  } catch (error) {
    console.error('Processing error:', error);
    res.status(500).json({ 
      error: error.message || 'Failed to process video' 
    });
  }
});

module.exports = router;