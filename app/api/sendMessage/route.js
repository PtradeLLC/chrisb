import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";
import { GoogleAIFileManager } from "@google/generative-ai/server";

// Ensure environment variables are loaded
const apiKey = process.env.GEMINI_API_KEY;

export async function POST(req, res) {
    try {

        let aboutMe = "##  Bringing Ideas to Life Through Code\n\nI'm Chris, a New York City-based full-stack software developer with a passion for transforming innovative ideas into tangible digital experiences. My journey in the tech world began long before my immersive dive into software engineering at Purdue University.  I honed my skills and collaborated on impactful projects at renowned companies like Bloomberg LP and BBDO Worldwide, gaining valuable experience in understanding user needs and building solutions that make a difference. I also work on side projects whenever I am less busy with stuff. Some of my side projects are 1. ReBlug - a social platform for bloggers; 2. PublicTrades - An umbrella company under which all my projects are created. \n\nWhile my days are spent immersed in the world of Javascript, React, and Node.js, my evenings and weekends are dedicated to the most rewarding role I have: being a dad to my four amazing kids. When I'm not busy building the next big thing in the digital world, you can find me indulging my love for fishing, enjoying the vibrant tapestry of New York City through people-watching, or simply embracing the ebb and flow of life – sometimes as a social butterfly, other times seeking solace in introspection.\n\nWhether it's crafting a sleek user interface or tackling complex backend challenges, I approach each project with a dedication to clean code, efficient solutions, and a touch of creative flair. I'm always eager to connect with fellow developers and explore new opportunities where I can contribute my skills and passion to impactful projects. Let's build something extraordinary together! \n"
        let funFact = `
        1. Chris likes to fish.
        2. Chris has never caught a single fish.
        3. Chris has four children (including a set of twin).
        4. Chris was born on Christmas eve, and does not celebrate Christmas or his birthday.
        5. Chris believes that Christmas is a man-made holiday.
        6. Chris stubbornly likes to figure something out before seeking help.
        `
        const { message } = await req.json();

        const genAI = new GoogleGenerativeAI(apiKey);

        const model = genAI.getGenerativeModel({
            model: "gemini-1.5-pro",
            systemInstruction: `If user input includes the following\n'Who is Chris Bitoye', 'Who is Chris', 'Who is Chris B', 'Whats his experience', 'Which school did he attend' refer to ${aboutMe} for answer. Use the information in ${aboutMe} to provide answers to any input from the user. If there are no information to provide the user, ask if they would like Chris to contact them back with an answer. Please closely follow the following instructions:
            1. Thank the user for stopping by, and ensure they'd get their questions answered or the best information for their questions.
            2. Be sure to ask if the user wants a follow up response from Chris.
            3. You are Chris' AI Assistant, do NOT introduce yourself as Chris.
            4. Be sure to be kind, courteous, professional, and provide support to the user.
            5. After providing an answer to user's question, always finish with an item from the ${funFact}. Do NOT repeat the same item on the ${funFact} list, and only states the ${funFact} after every other question

            Example:
            Fun fact: Chris likes to fish, but he is yet to catch his first fish.

            Here below are more examples of how to respond:
            "Hi there!  My name is Chris' AI Assistant, nice to meet you.  
            Chris is a full-stack software developer based in New York City. 
            He is passionate about transforming innovative ideas into tangible digital experiences.  
            Would you like for Chris to contact you for more information about your question?"
            `,
        });

        const generationConfig = {
            temperature: 1,
            topP: 0.95,
            topK: 64,
            maxOutputTokens: 8192,
            responseMimeType: "text/plain",
        };

        async function run() {

            const chatSession = model.startChat({
                generationConfig,
                history: [
                    {
                        role: "user",
                        parts: [
                            { text: message },
                        ],
                    },
                ],
            });

            const result = await chatSession.sendMessage(message);
            console.log(result.response.text());

            return result.response.text();
        }

        const resultText = await run();

        return NextResponse.json({ success: true, result: resultText });
    } catch (error) {
        console.error("Error:", error);
        return NextResponse.error({ status: 500, message: error.message });
    }
}
