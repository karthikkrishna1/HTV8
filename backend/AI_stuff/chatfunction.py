import cohere
co = cohere.Client('xC36OoXLBZNXOSzHuAvGWNfVq7qUHvfO1k17Jnhy')

while True:
    userInput = ""
    while userInput == "":
        userInput = input().strip()
    response = co.chat(
        chat_history=[],
        message=userInput,
        connectors=[{"id": "web-search"}] # perform web search before answering the question
    )
    # print(response)
    print(response.text)
