// This code is for v4 of the openai package: npmjs.com/package/openai
import OpenAI from "openai";
import { segmentText } from "./tools/segmentText";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

async function openAiApiCall(prompt: string, input: string) {
  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo-16k",
    messages: [
      {
        role: "system",
        content: prompt,
      },
      {
        role: "user",
        content: input,
      },
    ],
    temperature: 0.1,
    max_tokens: 500,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });

  return response.choices[0].message.content;
}

export async function getSummary(pageText: string) {
  // return `- Apple may charge your selected payment method for any paid transactions, including taxes, and may attempt to charge your other eligible payment methods if your primary payment method cannot be charged.\n-
  // Apple is not responsible for any losses arising from the unauthorized use of your account.\n-
  // Apple may collect and use technical data and related information about your device for various purposes.\n-
  // Apple does not guarantee that the services will be uninterrupted or error-free and may remove the services for indefinite periods of time without notice.\n-
  // Apple is not responsible for third-party materials included within or linked from the content or services.\n-
  // Apple disclaims all warranties and limits its liability for any damages arising from your use of the services, including but not limited to any errors or omissions in the content.\n-
  // Apple is not responsible for any losses arising from the unauthorized use of your account.\n-
  // Apple may collect and use technical data and related information about your device for various purposes.\n-
  // Apple does not guarantee that the services will be uninterrupted or error-free and may remove the services for indefinite periods of time without notice.\n-
  // Apple is not responsible for third-party materials included within or linked from the content or services.\n-
  // Apple disclaims all warranties and limits its liability for any damages arising from your use of the services, including but not limited to any errors or omissions in the content.`
  const apiCalls: Promise<string | null>[] = [];
  const textSegments = segmentText(pageText);
  const maxNumberOfResults = 
    textSegments.length === 1 ? 6 :
    textSegments.length === 2 ? 4 :
    textSegments.length === 3 ? 3 :
    textSegments.length === 4 ? 3 :
    2;

  for (let segment of textSegments) {
    apiCalls.push(
      openAiApiCall(
        `You will be given terms and condition, a privacy policy, or something similar. Take things that users would find the most concerning and summarize them into ${textSegments.length !== 1 && "a maximum of three"} concise bullet points. Only include the most concerning parts.`,
        segment
      )
    );
  }
  const responses = await Promise.all(apiCalls);
  const combinedResponse: string = responses.join("\n");
  return combinedResponse;
}

export async function getRating(pageText: string) {
  // return 2;
  const apiCalls: Promise<string | null>[] = [];
  for (let segment of segmentText(pageText)) {
    apiCalls.push(
      openAiApiCall(
        "The input given should be terms and condition, a privacy policy, or something similar. Respond with just a number from 1 to 10 and NOTHING ELSE. The number should represent how cautious users should be when accepting the terms. A 10 would mean that the terms are very suspicious and the user should proceed with extreme caution. A 1 would mean that the terms are very standard and the user can proceed without giving a second thought. So the higher the number, the more out of the ordinary the terms are and the more cautious the user should be. Storing data even if the user doesn't have an account, using users' identity in ads, reading private messages, and signing away moral rights are examples of things that would result in high numbers. Not tracking the user, not having to register, IP addresses not being tracked, and not recording any identifiable information are examples of things that would result in low numbers. Only respond with a single number and nothing else.",
        segment
      )
    );
  }
  const responses = await Promise.all(apiCalls);

  const maxNumber: number = Math.max(
    ...responses.map((response) => parseInt(response || "0"))
  );
  if (maxNumber <= 3) {
    return 1;
  } else if (maxNumber >= 4 && maxNumber <= 6) {
    return 2;
  } else if (maxNumber >= 6) {
    return 3;
  } else {
    return 0;
  }
}
