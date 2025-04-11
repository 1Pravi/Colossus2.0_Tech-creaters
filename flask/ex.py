import pandas as pd

EXPENSE_FILE = 'ex.csv'
TRANSACTION_FILE = 're.csv'


def read_data():
    expenses = pd.read_csv(EXPENSE_FILE, parse_dates=['Date'])
    transactions = pd.read_csv(TRANSACTION_FILE, parse_dates=['Date'], dayfirst=True)
    return expenses, transactions


def total_revenue():
    _, transactions = read_data()
    return transactions['Net_Revenue'].sum()


def total_expenses():
    expenses, _ = read_data()
    return expenses['Total_With_Tax'].sum()


def net_balance():
    return total_revenue() - total_expenses()


def top_expense_category():
    expenses, _ = read_data()
    return expenses.groupby('Category')['Total_With_Tax'].sum().idxmax()


def bar_chart_data():
    expenses, transactions = read_data()
    expenses['Month'] = expenses['Date'].dt.to_period('M').astype(str)
    transactions['Month'] = transactions['Date'].dt.to_period('M').astype(str)

    monthly_expense = expenses.groupby('Month')['Total_With_Tax'].sum()
    monthly_revenue = transactions.groupby('Month')['Net_Revenue'].sum()

    result = []
    for month in sorted(set(monthly_expense.index).union(set(monthly_revenue.index))):
        result.append({
            'month': month,
            'revenue': float(monthly_revenue.get(month, 0)),
            'expense': float(monthly_expense.get(month, 0))
        })
    return result


def payment_status_donut():
    expenses, _ = read_data()
    return expenses['Payment_Status'].value_counts().to_dict()


def net_balance_line_chart():
    expenses, transactions = read_data()
    expenses['Month'] = expenses['Date'].dt.to_period('M').astype(str)
    transactions['Month'] = transactions['Date'].dt.to_period('M').astype(str)

    monthly_expense = expenses.groupby('Month')['Total_With_Tax'].sum()
    monthly_revenue = transactions.groupby('Month')['Net_Revenue'].sum()

    balance = []
    all_months = sorted(set(monthly_expense.index).union(set(monthly_revenue.index)))
    cum_rev, cum_exp = 0, 0
    for month in all_months:
        cum_rev += monthly_revenue.get(month, 0)
        cum_exp += monthly_expense.get(month, 0)
        balance.append({
            'month': month,
            'net_balance': float(cum_rev - cum_exp)
        })
    return balance


def transaction_history():
    _, transactions = read_data()
    transactions['Date'] = transactions['Date'].dt.strftime('%Y-%m-%d')
    return transactions.sort_values(by='Date', ascending=False).head(10).to_dict(orient='records')