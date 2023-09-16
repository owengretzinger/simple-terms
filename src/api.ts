// This code is for v4 of the openai package: npmjs.com/package/openai
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

export async function apiCall(pageText:string) {
    const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo-16k",
    messages: [
      {
        "role": "system",
        "content": "The input given should be terms and condition, a privacy policy, or something similar. Summarize the terms into concise bullet points to make it easier to understand. Make sure to include things that would be potential concerns such as waiving rights and selling data. Make sure the answer is not too long, and is easy to understand."
      },
      {
        "role": "user",
        "content": pageText
      }
    ],
    temperature: 0,
    max_tokens: 10000,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });

  return response.choices[0].message.content;
}

export async function getSummary(pageText: string) {
  if (pageText === "") {
    console.log("NO PAGE TEXT PROVIDED");
    return "error";
  }

  const apiCalls: Promise<string | null>[] = [];

  const lengthOfMyString: number = pageText.length;
  let counter = Math.ceil(lengthOfMyString / 20000);
  
  for(let i = 0; i < counter; i ++) {
    console.log(pageText.substring(20000 * i, 20000 * (i+1)));
    let apiCallResult = apiCall(pageText.substring(20000 * i, 20000 * (i+1)));
    if (apiCallResult) {
      apiCalls.push(apiCallResult);
    }
  }

  const responses = await Promise.all(apiCalls);

  const combinedResponse: string = responses.join("\n");
  return combinedResponse;
}

export async function getRating(pageText: string): Promise<1 | 2 | 3 | 0> {
  const responses: number[] = [];

  const lengthOfMyString: number = pageText.length;
  let counter = Math.ceil(lengthOfMyString / 20000);
  
  for(let i = 0; i < counter; i ++) {
    console.log(pageText.substring(20000 * i, 20000 * (i+1)));
    let apiCallResult = await getRatingAPI(pageText.substring(20000 * i, 20000 * (i+1)));
    if (apiCallResult) {
      responses.push(apiCallResult);
    }
  }

  const maxNumber: number = Math.max(...responses);
  if(maxNumber == 0) {
    return 0
  } else if(maxNumber == 1) {
    return 1
  } else if(maxNumber == 2) {
    return 2
  } else {
    return 0
  }
}


export async function getRatingAPI(bulletPoints: string): Promise<1 | 2 | 3 | 0> {
  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo-16k",
    messages: [
      {
        "role": "system",
        "content": "The input given should be terms and condition, a privacy policy, or something similar. Respond with just a number from 1 to 10 and NOTHING ELSE. The number should represent how cautious users should be when accepting the terms. A 10 would mean that the terms are very suspicious and the user should proceed with extreme caution. A 1 would mean that the terms are very standard and the user can proceed without giving a second thought. So the higher the number, the more out of the ordinary the terms are and the more cautious the user should be. Only respond with a single number and nothing else."
      },
      {
        "role": "user",
        "content": bulletPoints
      },
      {
        "role": "assistant",
        "content": "1"
      }
    ],
    temperature: 0,
    max_tokens: 10000,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });

  let ratingString = response.choices[0].message.content || "0";
  let rating = parseInt(ratingString);
  console.log("rating:",ratingString);
  if (rating < 4) {
    return 1;
  } else if (rating > 3 && rating < 7) {
    return 2;
  } else if (rating > 7) {
    return 3;
  } else {
    return 0;
  }
}
