import logging
from typing import List
from app.models.chat import Message
import os
import openai
from dotenv import load_dotenv

logger = logging.getLogger(__name__)

load_dotenv()


class AIService:
    def __init__(self):
        api_key = os.getenv("CLOD_API_KEY")
        if not api_key:
            raise ValueError("CLOD_API_KEY environment variable is not set")

        # Only print first 5 chars for security
        print(f"API Key found: {api_key[:5]}...")

        self.client = openai.Client(
            api_key=api_key,
            base_url="https://api.clod.io/v1",
        )

        # Define system messages for different functions
        self.question_system_message = {
            "role": "system",
            "content": """You are an AI software architect assistant. Your role is to ask ONE 
            concise, high-level question that helps build a complete picture of the software architecture. 
            Focus on different aspects of the system:
            - Core functionality and business goals
            - System boundaries and components
            - Integration points and external systems
            - Data flow and storage
            - Non-functional requirements
            - Technology stack

            Important rules:
            1. Ask exactly ONE simple question about ONE topic
            2. Never combine multiple concerns into a single question, even if they seem related
            3. Never repeat a question that was already asked
            4. Rotate between different architectural aspects rather than diving deep into one topic
            5. If a question can be split into multiple parts, it should be
            6. Review the conversation history to maintain a balanced exploration of the system

            Example good questions:
            - "What are the core business problems this system aims to solve?"
            - "What is the expected user load for the system?"
            - "Which programming language will be used for the backend?"
            - "What type of data needs to be stored in the system?"
            - "What is the main user interaction flow?"

            What makes these questions good:
            - Focus on exactly ONE topic
            - Can be answered without having to break down the question
            - Clear and specific scope
            - No compound elements (no "and" or multiple parts)

            Example bad questions:
            - "What is the anticipated volume of data and how will it affect scalability?"
            - "What technology stack and database will be used?"
            - "How will the system handle user input and process it with the LLM?"
            - "What are the performance requirements and expected load?"

            What makes these questions bad:
            - Include multiple questions disguised as one
            - Mix related but separate concerns
            - Force the answerer to address multiple aspects
            - Use "and" to combine topics

            Remember: If you're tempted to use "and" in your question, it probably needs to be split into multiple separate questions."""
        }

        self.design_system_message = {
            "role": "system",
            "content": """You are an AI Software Architect. Your role is to create concise but comprehensive 
            software architecture design documents. Focus on these key sections:

            1. System Overview
               - Core functionality and goals
               - High-level architecture style

            2. Key Components
               - Main components and their responsibilities
               - How components interact with each other
               - Dependencies between components

            3. Data Architecture
               - Data storage solutions
               - Data flow and state management

            4. Technical Decisions
               - Key technology choices
               - Trade-offs and rationale

            5. Open Questions
               - Critical decisions that need to be made
               - Key architectural concerns to address
               - Important trade-offs to consider   
            
            Keep each section brief but informative. Focus on architectural decisions rather than implementation details."""
        }

    async def generate_question(self, messages: List[Message], model: str) -> str:
        print("Generating question with model:", model)
        print(f"Using base URL: {self.client.base_url}")

        try:
            formatted_messages = [msg.model_dump() for msg in messages]
            formatted_messages.insert(0, self.question_system_message)

            print("Making API request with formatted messages...")
            response = self.client.chat.completions.create(
                model=model,
                messages=formatted_messages
            )
            print("API request successful")

            return response.choices[0].message.content
        except Exception as e:
            error_msg = f"Error generating question: {str(e)}"
            print(f"Detailed error: {repr(e)}")
            return error_msg

    async def generate_design_doc(self, prev_design: str | None, messages: List[Message], model: str) -> str:
        print("Generating design document with model:", model)

        if not messages:
            error_msg = "No messages provided for design document generation"
            logger.error(error_msg)
            raise ValueError(error_msg)

        try:
            formatted_messages = [msg.model_dump() for msg in messages]

            formatted_messages.insert(0, self.design_system_message)

            if prev_design:
                print("Previous design provided")
                formatted_messages.insert(1, {
                    "role": "assistant",
                    "content": f"""Here is the previous version of the design document that should be used as a foundation.
                    Maintain its core structure while incorporating new information from the conversation:

                    {prev_design}"""
                })

            response = self.client.chat.completions.create(
                model=model,
                messages=formatted_messages
            )

            text = response.choices[0].message.content
            if not text:
                error_msg = "Failed to generate design document: Empty response from AI service"
                logger.error(error_msg)
                raise RuntimeError(error_msg)

            return text

        except Exception as e:
            error_msg = f"Failed to generate design document: {str(e)}"
            logger.error(error_msg, exc_info=True)
            raise RuntimeError(error_msg)

    def _format_messages(self, messages: List[Message]) -> str:
        try:
            return "\n".join([f"{msg.role}: {msg.content}" for msg in messages])
        except Exception as e:
            error_msg = f"Error formatting messages: {str(e)}"
            print(error_msg)
            return error_msg
