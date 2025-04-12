from flask import Flask, request, jsonify
from flask_cors import CORS
import cash
import ex
from pl import get_pl_insights
from cf import load_cashflow_data, generate_forecast
from exf import load_expense_data, generate_expense_forecast
from fr import load_revenue_data, generate_revenue_forecast
from mg import get_chatbot_response
app = Flask(__name__)
CORS(app)

CSV_PATH = 'cash_data.csv'  # Your CSV location
CSV_PATH1 = 'ex.csv'  # Your CSV location
CSV_PATH2 = 're.csv'  # Your CSV location

@app.route('/chat', methods=['POST'])
def chat():
    print(request.json)
    user_input = request.json.get("message")
    print(user_input)
    if not user_input:
        print("fail")
        return jsonify({"error": "Missing message"}), 400
    try:
        print("try")
        response = get_chatbot_response(user_input)
        return jsonify({"reply": response})
    except Exception as e:
        print("e")
        return jsonify({"error": str(e)}), 500
@app.route('/forecast_revenue', methods=['GET'])
def forecast_revenue():
    try:
        df = load_revenue_data(CSV_PATH2)
        forecast_df = generate_revenue_forecast(df)
        return jsonify(forecast_df.to_dict(orient='records'))
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/forecast_expense', methods=['GET'])
def forecast_expense():
    try:
        df = load_expense_data(CSV_PATH1)
        forecast_df = generate_expense_forecast(df)
        return jsonify(forecast_df.to_dict(orient='records'))
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/forecast_cashflow', methods=['GET'])
def forecast_cashflow():
    try:
        df = load_cashflow_data(CSV_PATH)
        forecast_df = generate_forecast(df)
        return jsonify(forecast_df.to_dict(orient='records'))
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/pl-insights', methods=['GET'])
def pl_insights():
    data = get_pl_insights()
    return jsonify(data)

@app.route('/api/revenuee')
def revenue():
    return jsonify({'total_revenue': ex.total_revenue()})


@app.route('/api/expensese')
def expenses():
    return jsonify({'total_expenses': ex.total_expenses()})


@app.route('/api/net-balancee')
def net_balance():
    return jsonify({'net_balance': ex.net_balance()})


@app.route('/api/top-expense-categorye')
def top_expense():
    return jsonify({'top_expense_category': ex.top_expense_category()})


@app.route('/api/bar-charte')
def bar_charte():
    return jsonify(ex.bar_chart_data())

@app.route("/api/forecast")
def forecast():
    return revenue()

@app.route('/api/payment-status-donute')
def payment_status():
    return jsonify(ex.payment_status_donut())


@app.route('/api/net-balance-line-charte')
def net_balance_chart():
    return jsonify(ex.net_balance_line_chart())


@app.route('/api/transaction-historye')
def transaction_data():
    return jsonify(ex.transaction_history())

@app.route('/api/summary')
def summary():
    return jsonify(cash.get_summary())


@app.route('/api/line')
def line_chart():
    return jsonify(cash.line_chart_data())


@app.route('/api/bar')
def bar_chart():
    return jsonify(cash.bar_chart_data())


@app.route('/api/transactions')
def transactions():
    return jsonify(cash.transaction_table())


if __name__ == '__main__':
    app.run(debug=True)
