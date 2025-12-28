from langchain_google_genai import ChatGoogleGenerativeAI
from dotenv import load_dotenv
from langchain_core.prompts import PromptTemplate
from langchain_core.output_parsers import StrOutputParser

load_dotenv(".env.local")


model = ChatGoogleGenerativeAI(model="gemini-2.5-flash-lite",temperature=0.7,max_output_tokens=10)

template = PromptTemplate(
    template="Write a one funny joke on {topic}",
    input_variables=["topic"]
)

parser = StrOutputParser()

chain = template | model | parser

result = chain.invoke({"topic": "llm"})

print(result)