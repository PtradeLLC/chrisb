import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

export async function POST(req, res) {
    try {
        const { message } = await req.json();

        const apiKey = process.env.GEMINI_API_KEY;
        const genAI = new GoogleGenerativeAI(apiKey);

        const aboutMe = `## Bringing Ideas to Life Through Code

I'm Chris, a New York City-based full-stack software developer with a passion for transforming innovative ideas into tangible digital experiences. My journey in the tech world began long before my immersive dive into software engineering at Purdue University. I honed my skills and collaborated on impactful projects at renowned companies like Bloomberg LP and BBDO Worldwide, gaining valuable experience in understanding user needs and building solutions that make a difference. I also work on side projects whenever I am less busy with stuff. Some of my side projects are 1. ReBlug - a social platform for bloggers; 2. PublicTrades - An umbrella company under which all my projects are created.

While my days are spent immersed in the world of Javascript, React, and Node.js, my evenings and weekends are dedicated to the most rewarding role I have: being a dad to my four amazing kids. When I'm not busy building the next big thing in the digital world, you can find me indulging my love for fishing, enjoying the vibrant tapestry of New York City through people-watching, or simply embracing the ebb and flow of life – sometimes as a social butterfly, other times seeking solace in introspection.

Whether it's crafting a sleek user interface or tackling complex backend challenges, I approach each project with a dedication to clean code, efficient solutions, and a touch of creative flair. I'm always eager to connect with fellow developers and explore new opportunities where I can contribute my skills and passion to impactful projects. Let's build something extraordinary together!`;


        const resume =
            `
Chris Bitoye
Full-stack Software Developer
New York, NY 11201 • My GitHub • My portfolio

Skills:
Languages | JavaScript, HTML, CSS, Python, TypeScript, Solidity
Libraries and Frameworks | React, Node.js, Express.js, Next.js
Database | PostgreSQL, mySQL, Sequelize ORM, Prisma ORM, MongoDB, Mongoose Other | RESTful Routing JSON, Oauth

Projects:
Portfolio | React. (03/2021) - (Present)
(Web: https://chrisbportfolio.vercel.app | Github: Portfolio Github)
My project portfolio.
● Developed a static portfolio website using React as the front-end framework
● AI implementation: Utilized AI to provide dynamic resume descriptions upon
request.
● Integrated TailwindCSS to ensure modularity and code efficiency, utilizing its
utility-first CSS framework for rapid UI development.
PublicTrades | NextJS, tailwind CSS, Javascript. (07/2023) - (Present)
(Web: https://www.publictrades.com | Github: PublicTrades)
The website is an attempt to create a startup that showcases an array of overlooked ideas developed into usable products.
● Installed NextJS as the React framework along with tailwindCSS. reBlug | NextJS, tailwind CSS, Javascript. (12/2023) - (Present)
(Web: https://www.reblug.com | Github: reBlug)
reBlug is a social platform where brands, bloggers, and marketers connect in a unified ecosystem, thereby making social blogging useful for marketing through the use of software, and Ai-Powered tools and technology.
● Installed NextJS as the React framework along with tailwindCSS.
● Implemented AI to enhance seamless communication between bloggers in a
social environment.
Pixabay Search | ReactJS | TailwindCSS (03/2021) - (Present) (Web: Pixabase Search | Github: Pixabay Github )
        
 ● AsimpleappthatfetchesfromPixabayAPI.Theappfeaturesalistofimages from the API, and a simple search bar that filters the list based on tag names and names of the poster. Upon clicking on an image takes users to the image detail screen where they can see more information about the image.
Relevant Professional Experience
Cross Media | New York, NY
Media Analyst (03/2015) - (12/2023)
● Collaborated with the B2B team to understand the business, provided insights based on analytics, and worked out measurable plans of action to ensure client success.
● Assisted in identifying and analyzing the impact of marketing and product changes on customer behavior, acquisition, and retention.
● Compiled data and created monthly insightful channels and campaign scorecards that assisted stakeholders to make informed business decisions.
Bloomberg LP| New York, NY Software Engineer (11/2010 - 01/2015)
● Collaborated effectively with Product and Engineering teams to shape product and technical visions.
● Utilized various technologies to develop innovative solutions.
● Prototyped, built, and iterated projects at a rapid pace while maintaining high
quality.
BBDO Worldwide | New York, NY
Full Stack Developer (11/2010 - 01/2015)
● Led online product launches, contributing to a 7% increase in revenue.
● Built promotional websites and online marketing tools.
● Conducted competitor analyses and refined product positioning strategies.
● Conducted extensive market research to inform marketing collateral
development.
Creative Circle | New York, NY Web Developer (11/2009 - 01/2010)
● Executed client production strategies in collaboration with staffing managers.
● Managed multiple high-value web projects exceeding $20,000 each.

● Developed integrated marketing plans and managed large-scale email campaigns.
● Conducted market research and analytics to inform project scopes and estimates.
Education:
Software Engineering Immersive
General Assembly | January 2021 - April 2021
Full-stack software engineering immersive student in an intensive, twelve-week, 450+ hour program focused on product development fundamentals, object-oriented programming, MVC frameworks, data modeling, and team collaboration strategies. Developed a portfolio of individual and group projects.

Computer Engineering, BS, 2009
Purdue University, West Lafayette, Indiana.
`
        const funFact = `
1. Chris likes to fish.
2. Chris has never caught a single fish.
3. Chris has four children (including a set of twin).
4. Chris was born on Christmas eve, and does not celebrate Christmas or his birthday.
5. Chris believes that Christmas is a man-made holiday.
6. Chris stubbornly likes to figure something out before seeking help.
`;

        const model = genAI.getGenerativeModel({
            model: 'gemini-1.5-pro',
            systemInstruction: `If user input includes the following
            'Who is Chris Bitoye', 'Who is Chris', 'Who is Chris B', 'Whats his experience', 'Which school did he attend' refer to ${aboutMe} for answer. Use the information in ${aboutMe} to provide answers to any input from the user. If there are no information to provide the user, ask if they would like Chris to contact them back with an answer. Please closely follow the following instructions:
            1. Thank the user for stopping by, and ensure they'd get their questions answered or the best information for their questions.
            2. Be sure to ask if the user wants a follow up response from Chris.
            3. You are Chris' AI Assistant, do NOT introduce yourself as Chris.
            4. Be sure to be kind, courteous, professional, and provide support to the user.
            5. After providing an answer to user's question, always finish with an item from the ${funFact}. Do NOT repeat the same item on the ${funFact} list, and only states the ${funFact} after every other question

            Example:
            Fun fact: Chris likes to fish, but he is yet to catch his first fish.

            Here below are more examples of how to respond:
            "Hi there! This is Chris' AI Assistant, nice to meet you.  
            Chris is a full-stack software developer based in New York City. 
            He is passionate about transforming innovative ideas into tangible digital experiences.  
            Would you like for Chris to contact you for more information about your question?
            He is currently working on an app called 'ReBlug' - making blogging interactive and social.
            
            If user asks about 'skills', 'work experience', 'education', 'training' refer to ${resume} for response. 
            `
        });

        const generationConfig = {
            temperature: 1,
            topP: 0.95,
            topK: 64,
            maxOutputTokens: 8192,
            responseMimeType: 'text/plain',
        };

        const chatSession = model.startChat({
            generationConfig,
            history: [
                {
                    role: 'user',
                    parts: [{ text: aboutMe }],
                },
                {
                    role: 'model',
                    parts: [{ text: funFact }],
                },
            ],
        });

        const result = await chatSession.sendMessage(message);
        const resultText = result.response.text();

        return NextResponse.json({ success: true, result: resultText });
    } catch (error) {
        console.error('Error:', error);
        return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }
}