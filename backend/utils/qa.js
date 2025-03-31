const { OpenAI } = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

const generateQA = async (transcript) => {
  try {
    const prompt = `
    Analyze the following transcript and extract 5 key questions that are answered in the content.
    For each question, provide a concise answer based on the transcript.
    Format your response as a JSON array of objects with "question" and "answer" properties.

    Transcript:
    ${transcript}

    Response:
    `;

    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are a helpful assistant that extracts questions and answers from transcripts."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.3,
      max_tokens: 1000
    });

    const content = response.choices[0].message.content;
    return JSON.parse(content);
  } catch (error) {
    console.error('QA generation error:', error);
    throw new Error('Failed to generate Q&A pairs');
  }
};

module.exports = { generateQA };