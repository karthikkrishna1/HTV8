import requests

openaiKey = "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"

while True:
    finalNums = ""
    userInput = ""
    while userInput == "":
        userInput = input("").strip()
    name = userInput

    # for i in range(5):
    userInput = name
    # userInput = "Evaluate "+userInput+"'s startup pitches from podcasts, YouTube, and TED Talks, by comparing to other visionary leaders. Always answer only in this specific format: '{INSERT RATING NUMBER FROM 1 TO 100}'"
    userInput = "Your input consists of the names of 5 entrepeneurs. Your answer should be in the following format: '[INT1,INT2,INT3,INT4], DESCRIPTION OF FIRST PERSON. [INT1,INT2,INT3,INT4], DESCRIPTION OF SECOND PERSON. [INT1,INT2,INT3,INT4], DESCRIPTION OF THIRD PERSON. [INT1,INT2,INT3,INT4], DESCRIPTION OF FOURTH PERSON. [INT1,INT2,INT3,INT4], DESCRIPTION OF FIFTH PERSON.'. The ints have range from 0 to 100. For the first number, generate a higher number the more likely "+userInput+" is to become a successful startup entrepreneur, based on his speeches and presentations, relative to other visionary leaders. For the second number, generate a higher number the more likely "+userInput+" is to become a successful startup entrepreneur, based on his LinkedIn Profiles, Biographies, and Forbes Fortune 500, relative to other visionary leaders. For the third number, generate a higher number the more likely "+userInput+" is to become a successful startup entrepreneur, based on his social media metrics and engagement online, relative to other visionary leaders.  For the fourth number, generate a higher number the more likely "+userInput+" is to become a successful startup entrepreneur, based on his his Company Insights from Crunchbase and AngelList, relative to other visionary leaders."

    message =   [
                # {'role': 'system', 'content': startingPrompt},
                {'role': 'user', 'content': userInput}
            ]
    headers  = {'Authorization': f'Bearer {openaiKey}'}
    data     = {'model': 'gpt-3.5-turbo', 'temperature': 0.3, 'messages': message}
    response = requests.post('https://api.openai.com/v1/chat/completions', headers=headers, json=data)

    # print(response.json()['choices'][0]['message']['content'])
    finalNums = response.json()['choices'][0]['message']['content']
    # finalNums.append(response.json())

    # for i in range(5):
    #     print(finalNums[i])
    print(finalNums)
