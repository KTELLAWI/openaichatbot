import { Message, MessageArraySchema } from '@/lib/validators/message'
import {
    ChatGPTMessage,
    OpenAIStreamPayload,
  } from '@/lib/openai-stream'
import { chatbotPrompt } from '@/helper/chatbot-prompt';
import { vectorStore } from '../index/route';
import { OpenAIChat ,OpenAI} from "langchain/llms/openai";
import {
    ChatPromptTemplate,
    HumanMessagePromptTemplate,
    PromptTemplate,
    SystemMessagePromptTemplate,
  } from "langchain/prompts";
  import { LLMChain } from "langchain/chains";
  import {
    createParser,
    ParsedEvent,
    ReconnectInterval,
  } from "eventsource-parser";

  const chatPrompt = ChatPromptTemplate.fromPromptMessages([
    SystemMessagePromptTemplate.fromTemplate(" You are a helpful assistant that that can answer questions about Imām Bukhāri, was a 9th-century Muslim muhaddith who is widely regarded as the most important hadith scholar in the history of  Islam. based on : {context} Only use the factual information from the context to answer the question.If you feel like you don't have enough information to answer the question, say I dont know "
      
    ),
    HumanMessagePromptTemplate.fromTemplate("{qouestion}"),
  ]);

//   const responseD = await chatPrompt.formatPromptValue({
//     input_language: "English",
//     output_language: "French",
//     text: "I love programming.",
//   });
//   const messages = responseD.toChatMessages();


const model = new OpenAIChat({ temperature: 0.9, streaming: false,openAIApiKey:process.env.OPENAI_API_KEY });

const template = `
You are a helpful assistant that that can answer questions about Al-Hajj worship based on : {context}
 Only use the factual information from the context to answer the question.
 If you feel like you don't have enough information to answer the question, say I dont know .
 answer always in Arabic
    
  `;

const system_message_prompt = SystemMessagePromptTemplate.fromTemplate(template);

 const human_template = "Answer the following question: {question}"
const human_message_prompt = HumanMessagePromptTemplate.fromTemplate(human_template);

const chat_prompt = ChatPromptTemplate.fromPromptMessages(
    [system_message_prompt, human_message_prompt]
)
const chain = new LLMChain({ llm: model, prompt:chat_prompt });

// Call the chain with the inputs and a callback for the streamed tokens

// console.log(query.text);
// const ss= JSON.stringify(res);
// const obj = JSON.parse(ss);

// console.log( obj );




 async function OpenAIStream(messages:Message[]) {
   
    // const encoder = new TextEncoder();
    // const decoder = new TextDecoder();
    const query: Message = messages[messages.length -1];
    const context = await vectorStore(query.text);
    let counter = 0;

    const res = await chain.call({  context: context,

        question:query.text , }, 
        // [
        //   {
        //     handleLLMNewToken(token: string) {
        //       process.stdout.write(token);
        //     },
        //   },
        // ]
        );
 const ss= JSON.stringify(res);
 const obj = JSON.parse(ss);
    // const stream = new ReadableStream({
    //   async start(controller) {
    //     // callback
    //     function onParse(event: ParsedEvent | ReconnectInterval) {
    //       if (event.type === "event") {
    //         const data = event.data;
    //         // https://beta.openai.com/docs/api-reference/completions/create#completions/create-stream
    //         if (data === "[DONE]") {
    //           controller.close();
    //           return;
    //         }
    //         try {
    //           const json = JSON.parse(data);
    //           const text = json.choices[0].delta?.content || "";
    //           if (counter < 2 && (text.match(/\n/) || []).length) {
    //             // this is a prefix character (i.e., "\n\n"), do nothing
    //             return;
    //           }
    //           const queue = encoder.encode(text);
    //           controller.enqueue(queue);
    //           counter++;
    //         } catch (e) {
    //           // maybe parse error
    //           controller.error(e);
    //         }
    //       }
    //     }
  
    //     // stream response (SSE) from OpenAI may be fragmented into multiple chunks
    //     // this ensures we properly read chunks and invoke an event for each SSE event stream
    //     const parser = createParser(onParse);
    //     // https://web.dev/streams/#asynchronous-iteration
    //     for await (const chunk of obj.text as any) {
    //       parser.feed(decoder.decode(chunk));
    //     }
    //   },
    // });
  
    return obj.text;
  }

export async function POST(req:Request) {

  // const context = await vectorStore()
    const {messages} = await req.json()
    const query: Message = messages[messages.length -1];
    const parsedMessage = MessageArraySchema.parse(messages);
    const outboundMessages:ChatGPTMessage[]= parsedMessage.map((message)=>({
        role:message.isUserMessage? "user" : "system",
        content:message.text,
    }))
    // outboundMessages.unshift({
    //     role:"system" ,
    //     content: `
    //     You are a helpful assistant that that can answer questions about Imām Bukhāri, was a 9th-century Muslim muhaddith who is widely regarded as the most important hadith scholar in the history of  Islam.
    //     based on the context: ${context} 
    //     Only use the context to answer the question.
    //     dont answer from any source , just use  the context: ${context}  to answer the questions.
    //     If you feel like you don't have enough information to answer the question, say "I don't know".
    //     Your answers should be verbose and detailed.
    //     dont and prevent to answer on qouestions that does not related to context
    //     answer only in Arabic languge.
    //     prevent to answer on qouestions that does not related to context: ${context} 

        
    //     `,
    // })

//    const model = new OpenAIChat({ temperature: 0.9, streaming: true, openAIApiKey:"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" });
  // OpenAIChat({
    // openAIApiKey:"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"
//});
// const prompt = PromptTemplate.fromTemplate(
//     "What is a good name for a company that makes {product}?"
  //);
//   const chainA = new LLMChain({ llm: model,  prompt:chatPrompt });
  
  // The result is an object with a `text` property.
//   const stream  = await chainA.call({ qouestion: query.text,context:context },
    
//     [
//         {
//             handleLLMNewToken(token: string) {
//               process.stdout.write(token);
//             },
//           },

//     ]
//     );

    // const payload: OpenAIStreamPayload = {
    //     model: 'gpt-3.5-turbo',
    //     messages: outboundMessages,
    //     temperature: 0.4,
    //     top_p: 1,
    //     frequency_penalty: 0,
    //     presence_penalty: 0,
    //     max_tokens: 150,
    //     stream: true,
    //     n: 1,
    //   }
    
       const stream = await OpenAIStream(messages)
    // Create a new LLMChain from a PromptTemplate and an LLM in streaming mode.
   
    
      return new Response(stream)
}