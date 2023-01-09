const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export default async function (req, res) {
    const completion = await openai.createCompletion("text-curie-001", {
      prompt: generatePrompt(req.body.skill),
      temperature: 0.6,
      max_tokens: 1500,
    });
    res.status(200).json({ result: completion.data.choices[0].text });
  }
  
  function generatePrompt(skill) {
    return `Write a summary of why I should be hired for the job
   
    Job: frontend developer
    Skill: ${skill}
    Summary:
  `;
  }
  