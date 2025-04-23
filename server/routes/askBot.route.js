// // routes/askBot.route.js
// import express from 'express';
// import { OpenAI } from 'openai';
// import dotenv from 'dotenv';

// dotenv.config();

// const router = express.Router();

// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY
// });

// router.post('/', async (req, res) => {
//   try {
//     const { question } = req.body;

//     if (!question) {
//       return res.status(400).json({ error: 'Question is required' });
//     }

//     const completion = await openai.chat.completions.create({
//       model: "gpt-3.5-turbo",
//       messages: [
//         { 
//           role: "system", 
//           content: "You are a helpful study assistant for university students. Provide clear, concise answers to academic questions. If a question is not academic-related, politely decline to answer." 
//         },
//         { role: "user", content: question }
//       ],
//       temperature: 0.7,
//       max_tokens: 500
//     });

//     const answer = completion.choices[0].message.content;
//     res.json({ answer });

//   } catch (error) {
//     console.error("OpenAI error:", error);
//     res.status(500).json({ 
//       error: "Failed to get response from AI",
//       details: error.message 
//     });
//   }
// });

// export default router;


// routes/askBot.route.js
// import express from 'express';
// import fetch from 'node-fetch';
// import dotenv from 'dotenv';

// dotenv.config();

// const router = express.Router();

// router.post('/', async (req, res) => {
//   try {
//     const { question } = req.body;

//     if (!question) {
//       return res.status(400).json({ error: 'Question is required' });
//     }

//     const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
//       method: 'POST',
//       headers: {
//         'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
//         'HTTP-Referer': req.headers.origin || 'http://localhost:8080', // Dynamic referer
//         'X-Title': 'Study Assistant',
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify({
//         model: "deepseek/deepseek-r1:free", // Free model
//         // model: "openai/gpt-3.5-turbo", // Alternative if you have credits
//         messages: [
//           { 
//             role: "system", 
//             content: "You are a helpful study assistant for university students. Provide clear, concise answers to academic questions." 
//           },
//           { role: "user", content: question }
//         ],
//         temperature: 0.7,
//         max_tokens: 500
//       })
//     });

//     if (!response.ok) {
//       const errorData = await response.json();
//       throw new Error(errorData.error?.message || 'OpenRouter API error');
//     }

//     const data = await response.json();
//     const answer = data.choices[0].message.content;
    
//     res.json({ answer });

//   } catch (error) {
//     console.error("OpenRouter error:", error);
//     res.status(500).json({ 
//       error: "Failed to get response from AI",
//       details: error.message 
//     });
//   }
// });

// export default router;



// routes/askBot.route.js
import express from 'express';
import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

// Middleware to verify API key exists
router.use((req, res, next) => {
  if (!process.env.OPENAI_API_KEY) {
    console.error("ERROR: OPENROUTER_API_KEY is missing in .env");
    return res.status(500).json({ 
      error: "Server configuration error",
      details: "API key not configured" 
    });
  }
  next();
});

router.post('/', async (req, res) => {
  try {
    const { question } = req.body;

    if (!question) {
      return res.status(400).json({ error: 'Question is required' });
    }

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'HTTP-Referer': req.headers.origin || 'http://localhost:8080',
        'X-Title': 'Study Assistant',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: "deepseek/deepseek-r1:free",
        messages: [
          { 
            role: "system", 
            content: "You are a helpful study assistant..." 
          },
          { role: "user", content: question }
        ]
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || `API Error: ${response.status}`);
    }

    const data = await response.json();
    res.json({ answer: data.choices[0].message.content });
    // const fullResponse = data.choices[0].message.content;
    // const conciseAnswer = fullResponse.split(/[.!?]+/).slice(0, 2).join('. ') + '.';
    
    res.json({ answer: conciseAnswer });

  } catch (error) {
    console.error("API Error:", {
      message: error.message,
      stack: error.stack
    });
    res.status(500).json({ 
      error: "AI service unavailable",
      details: error.message 
    });
  }
});

export default router;