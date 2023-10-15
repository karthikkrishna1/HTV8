import requests

openaiKey = "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"

while True:
    finalNums = ""
    userInput = ""
    while userInput == "":
        userInput = input("").strip()
    name = userInput

    # for i in range(5):
    # userInput = name
    # userInput = "Evaluate "+userInput+"'s startup pitches from podcasts, YouTube, and TED Talks, by comparing to other visionary leaders. Always answer only in this specific format: '{INSERT RATING NUMBER FROM 1 TO 100}'"
    userInput = f"In each of the fields, fill in information about {name}\n\n"\
             "Professional Background:\n\n"\
             "Education:\n"\
             "Work History:\n\n"\
             "Key Achievements and Milestones:\n\n"\
             "Notable Accomplishments:\n"\
             "Industry Recognition:\n\n"\
             "Leadership Style and Philosophy:\n\n"\
             "Leadership Approach:\n"\
             "Philosophy and Vision:\n\n"\
             "Innovation and Contributions:\n\n"\
             "Technological Contributions:\n"\
             "Impact on Industry Trends:\n\n"\
             "Public Persona and Communication Skills:\n\n"\
             "Communication Style:\n"\
             "Public Speaking Engagements:\n\n"\
             "Advisory and Mentorship Roles:\n\n"\
             "Advisory Positions:\n"\
             "Mentorship Activities:\n\n"\
             "Company Culture and Employee Satisfaction:\n\n"\
             "Company Culture:\n"\
             "Employee Satisfaction:\n\n"\
             "Global Impact and Philanthropy:\n\n"\
             "Philanthropic Initiatives:\n"\
             "Global Impact:\n\n"\
             "Media Perception and Public Image:\n\n"\
             "Media Coverage:\n"\
             "Public Sentiment:\n\n"\
             "Current and Future Ventures:\n\n"\
             "Current Roles:\n"\
             "Future Ventures:\n\n"\
             "Challenges Faced and Resilience:\n\n"\
             "Challenges Overcome:\n"\
             "Resilience:"

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
