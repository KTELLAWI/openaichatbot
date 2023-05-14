import * as cheerio from 'cheerio';
import { CheerioWebBaseLoader } from "langchain/document_loaders/web/cheerio";
import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import { TextLoader } from "langchain/document_loaders/fs/text";
import { Document } from "langchain/document";
import { CharacterTextSplitter } from "langchain/text_splitter";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { Chroma } from "langchain/vectorstores/chroma";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { OpenAIChat ,OpenAI} from "langchain/llms/openai";
import {
    ChatPromptTemplate,
    HumanMessagePromptTemplate,
    PromptTemplate,
    SystemMessagePromptTemplate,
  } from "langchain/prompts";
  import { LLMChain } from "langchain/chains";



export const vectorStore = async(querystring:string)=>{
    const loader = new TextLoader("/public/alhaj.txt");
  const docs = await loader.load();
  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 1000,
    chunkOverlap: 100,
  });
  
   const output = await splitter.splitDocuments(docs);
   console.log(output);
 const resultOne = await MemoryVectorStore.fromDocuments(
    output,
    new OpenAIEmbeddings({
        openAIApiKey:process.env.OPENAI_API_KEY
    }),
  );
   const query = await resultOne.similaritySearch(querystring,3);
   const docs_page_content = query.map(d => d.pageContent).join(' ');

  console.log(docs_page_content);
  return docs_page_content; //resultOne.memoryVectors[0].content;
 // console.log(resultOne.memoryVectors[0].content);
} 


 async function GET(request: Request) {
//const ss= await vectorStore();

 // Create docs with a loader
 
  // Load the docs into the vector store
  
  // Search for the most similar document
//   const resultOne = await vectorStore.similaritySearch("#####");

//   console.log(resultOne);
const context = await vectorStore("الحج")
// const model = new OpenAIChat({ temperature: 0.9, streaming: false,openAIApiKey:"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"  });

// const template = `
// You are a helpful assistant that that can answer questions about Imām Bukhāri, 
// was a 9th-century Muslim muhaddith who is widely regarded as the most important hadith scholar in the history of  Islam. based on : {context}
//  Only use the factual information from the context to answer the question.
//  If you feel like you don't have enough information to answer the question, say I dont know .
    
//   `;

// const system_message_prompt = SystemMessagePromptTemplate.fromTemplate(template);

//  const human_template = "Answer the following question: {question}"
// const human_message_prompt = HumanMessagePromptTemplate.fromTemplate(human_template);

// const chat_prompt = ChatPromptTemplate.fromPromptMessages(
//     [system_message_prompt, human_message_prompt]
// )
// const chain = new LLMChain({ llm: model, prompt:chat_prompt });

// // Call the chain with the inputs and a callback for the streamed tokens
// const res = await chain.call({  context: context,

// question: "what is name of his wife", }, 
// // [
// //   {
// //     handleLLMNewToken(token: string) {
// //       process.stdout.write(token);
// //     },
// //   },
// // ]
// );
// const ss= JSON.stringify(res);
// const obj = JSON.parse(ss);
// console.log( obj.text );

    return new Response()
  }
  