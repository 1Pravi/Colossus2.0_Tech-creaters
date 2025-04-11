import pandas as pd
from datetime import datetime, timedelta

CSV_FILE = 'cash_data.csv'


def read_csv():
    df = pd.read_csv(CSV_FILE, parse_dates=['Date'])
    df['Amount'] = df['Amount'].astype(float)
    df.sort_values('Date', inplace=True)
    return df


def get_summary():
    df = read_csv()
    inflow = df[df['Type'].str.lower() == 'credit']['Amount'].sum()
    outflow = df[df['Type'].str.lower() == 'debit']['Amount'].sum()
    net_cashflow = inflow - outflow
    current_balance = df.iloc[-1]['Balance_After']
    return {
        'total_inflow': inflow,
        'total_outflow': outflow,
        'net_cashflow': net_cashflow,
        'current_balance': current_balance
    }


def line_chart_data():
    df = read_csv()
    df['Date'] = pd.to_datetime(df['Date'])
    df['Month'] = df['Date'].dt.to_period('M').astype(str)

    # Only take the last 3 months based on unique months in the data
    recent_months = sorted(df['Month'].unique())[-3:]
    df = df[df['Month'].isin(recent_months)]

    monthly_balance = df.groupby('Month')['Balance_After'].last().reset_index()
    return monthly_balance.to_dict(orient='records')


def bar_chart_data():
    df = read_csv()
    df['Date'] = pd.to_datetime(df['Date'])
    df['Month'] = df['Date'].dt.to_period('M').astype(str)

    recent_months = sorted(df['Month'].unique())[-3:]
    df = df[df['Month'].isin(recent_months)]

    inflow = df[df['Type'].str.lower() == 'credit'].groupby('Month')['Amount'].sum()
    outflow = df[df['Type'].str.lower() == 'debit'].groupby('Month')['Amount'].sum()

    result = []
    for month in recent_months:
        result.append({
            'name': month,
            'inflow': inflow.get(month, 0),
            'outflow': outflow.get(month, 0)
        })
    return result


def transaction_table():
    df = read_csv()
    df['Date'] = df['Date'].dt.strftime('%Y-%m-%d')
    return df.to_dict(orient='records')
