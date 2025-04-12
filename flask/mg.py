# model.py
import requests
import google.generativeai as genai

genai.configure(api_key="AIzaSyB0UvZftISxJLqSj7Xy1VQdxiwpCBsz86o")

BASE_URL = "http://localhost:5000"

def fetch_data():
    summary = requests.get(f"{BASE_URL}/summary").json()
    line_data = requests.get(f"{BASE_URL}/line-data").json()
    bar_data = requests.get(f"{BASE_URL}/bar-data").json()
    return summary, line_data, bar_data

def build_context(summary, line_data, bar_data):
    return f"""
You are a financial advisor bot. Use the following data to respond to user queries.

📊 Summary:
- Inflow: ₹{summary['total_inflow']}
- Outflow: ₹{summary['total_outflow']}
- Net Cashflow: ₹{summary['net_cashflow']}
- Balance: ₹{summary['current_balance']}

📈 Monthly Balances: {line_data}
📉 Monthly Inflow/Outflow: {bar_data}

Give smart financial insights and suggestions.
"""

def get_chatbot_response(user_input):
    print("User Input:", user_input)
    summary, line_data, bar_data = fetch_data()
    print(summary, line_data, bar_data)
    context = build_context(summary, line_data, bar_data)
    print("Context:", context)

    model = genai.GenerativeModel("gemini-pro")
    chat = model.start_chat(history=[{"role": "system", "parts": [context]}])
    response = chat.send_message(user_input)
    print("Response:", response.text)
    return response.text
