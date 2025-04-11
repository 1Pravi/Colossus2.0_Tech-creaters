from flask import Flask, jsonify
from flask_cors import CORS
import cash
import ex
from pl import get_pl_insights

app = Flask(__name__)
CORS(app)


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