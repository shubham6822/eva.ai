from dotenv import load_dotenv
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain.agents import create_agent
from langchain.messages import HumanMessage, AIMessage

from .prompt import system_prompt
from .tools import add_to_order, confirm_order

load_dotenv(".env.local")


def build_agent():
    """Create and configure the Coffee Culture AI agent."""
    agent = create_agent(
        model=ChatGoogleGenerativeAI(model="gemini-2.5-flash"),
        tools=[add_to_order, confirm_order],
        system_prompt=system_prompt,
    )
    return agent


def run_chat():
    """Run the interactive chat loop with the agent."""
    agent = build_agent()
    messages = []
    
    print("Welcome to Coffee Culture! Type 'exit' to quit.\n")
    
    while True:
        user_input = input("You: ").strip()
        
        if user_input.lower() == "exit":
            print("Thank you for visiting Coffee Culture! See you soon!")
            break
        
        if not user_input:
            continue
        
        messages.append(HumanMessage(content=user_input))
        
        print("AI: ", end="", flush=True)
        
        # Stream the response
        full_content = ""
        for event in agent.stream({"messages": messages}, stream_mode="messages"):
            message, metadata = event
            if hasattr(message, "content") and message.content:
                print(message.content, end="", flush=True)
                full_content += message.content
        
        print("\n")
        
        # Add AI response to history
        if full_content:
            messages.append(AIMessage(content=full_content))
    
    return messages


if __name__ == "__main__":
    run_chat()