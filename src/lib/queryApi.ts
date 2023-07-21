import openai from "./chatgpt";

const query = async (model: string, prompt: string) => {
  const res = openai
    .createCompletion({
      model,
      prompt,
      temperature: 0.9,
      top_p: 1,
      max_tokens: 1000,
      frequency_penalty: 0,
      presence_penalty: 0,
    })
    .then((res) => res.data.choices[0].text)
    .catch((err) => {
      console.log(
        `ChatGPT was unable to find an answer for that! (Error: ${err?.message!})`
      );
      console.log(err);
    });

  return res;
};

export default query;
