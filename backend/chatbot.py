import cohere

co = cohere.Client('xC36OoXLBZNXOSzHuAvGWNfVq7qUHvfO1k17Jnhy')
startingPrompt = "Diversity is important because it enriches our society and our world with different perspectives, " \
                 "experiences, cultures, and ideas. Diversity helps us to learn from each other, to appreciate our " \
                 "similarities and differences, and to foster mutual respect and understanding. Diversity also " \
                 "promotes creativity, innovation, and problem-solving by bringing together diverse minds and talents."

while True:
    userInput = ""
    while userInput == "":
        userInput = input().strip()
    response = co.chat(
        chat_history=[
            {"role": "USER", "message": startingPrompt},
            {"role": "CHATBOT", "message": "Hello, I am a chatbot. Ask me a question about diversity!"}
        ],
        message=userInput,
        connectors=[{"id": "web-search"}]  # perform web search before answering the question
    )
    # print(response)
    if response.text != startingPrompt:
        print(response.text)

