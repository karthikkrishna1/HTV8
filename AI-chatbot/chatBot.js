import OpenAI from "openai";
const openai = new OpenAI();

const messages = [];
const functions = [
    {
        "name": "get_current_weather",
        "description": "Get the current weather in a given location",
        "parameters": {
            "type": "object",
            "properties": {
                "location": {
                    "type": "string",
                    "description": "The city and state, e.g. San Francisco, CA",
                },
                "unit": {"type": "string", "enum": ["celsius", "fahrenheit"]},
            },
            "required": [],
        },
    }
];

const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: messages,
    functions: functions,
    function_call: "auto",  // auto is default, but we'll be explicit
});
const responseMessage = response.choices[0].message;

runConversation().then(console.log).catch(console.error);

// require('dotenv').config()
// console.log(process.env.API_KEY)