import { GoogleGenerativeAI } from "@google/generative-ai";

// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI("AIzaSyCUSIrcgXWEN75tMQc4qEoudJfwQr6paGI");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const analyzeCode = async (code: string) => {
    const prompt = `
                Your role and goal is to be an AI smart code quality checker. Your job is to perform quality checks on given code.
                Here is the code: ${code}
                Do not use any special character, bold or any formatting so that it can be converted into Javascript Object.
                Please do not re-write the code in result only provide result in the following array format for easy front-end display:
                [
                    {
                        "section": "Check Report",
                        "details": "A detailed check report of the code covering security, performance and any other relevent aspects"
                    },
                    {
                        "section": "Quality Scores",
                        "details": [
                            {
                                "metric": "Variable Naming",
                                "score": 0-10
                            },
                            {
                                "metric": "Security",
                                "score": 0-10
                            },
                            {
                                "metric": "Performance",
                                "score": 0-10
                            },
                            {
                                "metric": "Other key areas",
                                "score": 0-10
                            },
                            {
                                "metric": "Code Quality",
                                "score": 0-10
                            },
                            {
                                "metric": "Human Understandablity",
                                "score": 0-10
                            }

                        ]
                    },
                    {
                        "section": "Suggestions for Improvements",
                        "details": "Suggestions on how to improve the code in terms of security, performace and any other identified weaknesses"
                    }
                ]
                    Thank You
                `;
    const result = await model.generateContent(prompt);
    const response = await result.response;
    let text = response.text();
    text = text.replace("```json", "");
    text = text.replace("```", "");
    const respObj = JSON.parse(text);
    return respObj;
}


export { analyzeCode };
