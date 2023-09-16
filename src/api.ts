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
        // "content": "The input given should be terms and condition, a privacy policy, or something similar. Summarize the terms into concise bullet points to make it easier to understand."
        "content": "There may be some red flags in the provided terms of service/terms of privacy. Summarize some points that may be adverse to a users privacy they may not be aware of into concise bullet points to make it easier to understand. Two examples for facebook are \"Facebook stores your data whether you have an account or not. \" and \"Your identity is used in ads that are shown to other users\". Be blunt and avoid being vague."
      },
      {
        "role": "user",
        "content": pageText
      }
    ],
    temperature: 1,
    max_tokens: 3000,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });

  console.log(response);

  // const response2 = await openai.chat.completions.create({
  //   model: "gpt-3.5-turbo-16k",
  //   messages: [
  //     {
  //       "role": "system",
  //       // "content": "The input given should be terms and condition, a privacy policy, or something similar. Summarize the terms into concise bullet points to make it easier to understand."
  //       "content": `I'm going to give you bullet points, and you will only return an integer for each bullet point. The bullet point will be on how a company handles your information and privacy. Return an numbers with each element being a number for each prompt on a scale of 1 to 3, with 1 being a good practice, 2 being a normal practice in the industry but still frowned upon by users and 3 being a predatory practice of taking your data and distributing/for their gain.  Add the prompt classification at the end of each prompt. The prompts are below\n\n` + response
  //     },
  //     {
  //       "role": "user",
  //       "content": pageText
  //     }
  //   ],
  //   temperature: 1,
  //   max_tokens: 3000,
  //   top_p: 1,
  //   frequency_penalty: 0,
  //   presence_penalty: 0,
  // });

  // return response2.choices[0].message.content;
  return response.choices[0].message.content;
}

//"I apologize for the error. Please provide me with the terms and conditions or privacy policy that you would like me to summarize into bullet points."
export async function getSummary(pageText: string) {
  // console.log("pageText:");
  // console.log(pageText);
  if (pageText === "") {
    console.log("NO PAGE TEXT PROVIDED");
    return "error";
  }

  // pageText = `YouTube Paid Service Terms of Service
  // Effective as of May 18, 2022 (view previous version)
  // Welcome to YouTube Paid Services!
  
  // 1.        Our Service
  // Thank you for using the YouTube platform and the products, services and features we make available to you as part of the platform. YouTube enables access to certain premium features or content in exchange for one-time or recurring fees (each a "Paid Service"). The Paid Services include YouTube rentals and purchases, channel memberships, paid subscriptions, and other YouTube services which may be offered by Google.
  
  // 1.1         Your Service Provider
  // The entity providing the Paid Services is Google LLC, located at 1600 Amphitheatre Parkway, Mountain View, CA 94043, USA ("Google”, "we", "us", or "our").
  
  // We may use other companies within the Alphabet Inc. corporate group, now or in the future (these companies are referred to as our “Affiliates”) to manage Paid Services.
  
  // 1.2         Applicable Terms
  // Your transactions and any use of the Paid Services are subject to: these Paid Service Terms of Service; the YouTube Terms of Service; the Paid Service Usage Rules; and the YouTube Community Guidelines. We’ll refer to these documents together as the “Terms”.
  
  // Please read the Terms carefully and make sure you understand them. If you do not understand the Terms, or do not accept any part of them, then you may not use the Paid Services. Each time you place an order for a Paid Service (including when you order a subscription or an item of content), you will enter into a separate contract with us for that particular Paid Service and will be asked to accept the Paid Service Terms again.
  
  // 2.        Accessing Paid Services
  // 2.1         Age Requirements
  // The age requirements in the YouTube Terms of Service also apply to your use of the Paid Services. You must also comply with any additional age restrictions that might apply for the use of specific Paid Services (for example an age restriction on a movie).  Family managers and family members must meet these additional requirements as well.`

  

  const responses: string[] = [];

  let apiCallResult = await apiCall(pageText);
  console.log("This will be the substring")
  console.log(pageText.substring(0,7000))
  if (apiCallResult) {
    responses.push(apiCallResult);
  }

  

  // batches.forEach(async(batch) => {
  //   let apiCallResult = await apiCall(batch);
  //   if (apiCallResult) {
  //     responses.push(apiCallResult);
  //   }
  // })

  const combinedResponse: string = responses.join("\n");

  // return pageText;
  return combinedResponse;
  

  //pageText tokenize

  // return "test"
  // const response = `- YouTube enables access to premium features or content through Paid Services
  // - The entity providing the Paid Services is Google LLC
  // - Transactions and use of Paid Services are subject to the Paid Service Terms of Service, YouTube Terms of Service, Paid Service Usage Rules, and YouTube Community Guidelines
  // - It is important to read and understand the Terms before using the Paid Services
  // - Age requirements outlined in the YouTube Terms of Service also apply to the use of Paid Services
  // - Additional age restrictions may apply for specific Paid Services, such as movies
  // - Family managers and members must also meet these requirements`



  // return "test";

  // return response;

}