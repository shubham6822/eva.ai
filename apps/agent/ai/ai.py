from langchain_google_genai import ChatGoogleGenerativeAI
from dotenv import load_dotenv
from langchain_core.prompts import PromptTemplate
from langchain_core.output_parsers import StrOutputParser
from langchain_core.schema.messages import SystemMessage
from langgraph.prebuilt import create_react_agent

load_dotenv(".env.local")


model = ChatGoogleGenerativeAI(model="gemini-2.5-flash-lite",temperature=0.7,max_output_tokens=10)

messages = [SystemMessage(content="You are a helpful assistant.")]

tools = []


agent = create_react_agent(
    llm=model,
    tools=tools,
    prompt_template=PromptTemplate(
        input_variables=["input"],
        template="You are a helpful assistant. {input}",
    ),
    output_parser=StrOutputParser(),
    system_messages=messages,
)






print(result)