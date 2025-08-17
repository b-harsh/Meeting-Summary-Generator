const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');

router.post('/', async (req, res) => {
  const { transcript, prompt } = req.body;

  if (!transcript || !prompt) {
    return res
      .status(400)
      .json({ msg: 'Please provide both a transcript and a prompt.' });
  }

  try {
    const API_KEY = process.env.GROQ_API_KEY;
    const API_URL = 'https://api.groq.com/openai/v1/chat/completions';

    const payload = {
      model: 'llama3-8b-8192',
      messages: [
        {
          role: 'system',
          content:
            'You are a helpful assistant that summarizes meeting transcripts.',
        },
        {
          role: 'user',
          content: `${prompt}:\n\n---\n\n${transcript}`,
        },
      ],
      temperature: 0.5,
      max_tokens: 1024,
      top_p: 1,
      stop: null,
      stream: false,
    };

    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        // Corrected capitalization for consistency
        'Content-Type': 'application/json',
        Authorization: `Bearer ${API_KEY}`,
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorBody = await response.text();
      console.error('API Error Response:', errorBody);
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data = await response.json();

    if (data.choices && data.choices.length > 0 && data.choices[0].message) {
      const summary = data.choices[0].message.content;
      res.json({ summary });
    } else {
      console.error('Unexpected API response structure:', data);
      res
        .status(500)
        .json({ msg: 'Failed to extract summary from Groq API response.' });
    }
  } catch (err) {
    console.error('Error in /api/generate:', err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
