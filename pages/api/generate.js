import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function (req, res) {
  const response  = await openai.createCompletion(
    "code-davinci-002",{
    prompt: `${req.body.answerInput} ${req.body.skill} `,
    temperature: 0,
    max_tokens: 150,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    stop: ["#", ";"],
  });
  console.log(response);
  res.status(200).json({ result: response.data.choices[0].text  });
}

