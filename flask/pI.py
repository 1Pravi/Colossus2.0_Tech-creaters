import pandas as pd

def get_pl_insights():
    df = pd.read_csv('pl.csv')

    # Clean column names
    df.columns = df.columns.str.strip().str.replace(' ', '_')

    # Convert Net_Profit to numeric
    df['Net_Profit'] = pd.to_numeric(df['Net_Profit'], errors='coerce')
    df['Total_Revenue'] = pd.to_numeric(df['Total_Revenue'], errors='coerce')
    df['Operating_Expenses'] = pd.to_numeric(df['Operating_Expenses'], errors='coerce')

    # Max/Min Profit Periods
    max_profit_row = df.loc[df['Net_Profit'].idxmax()]
    min_profit_row = df.loc[df['Net_Profit'].idxmin()]

    max_profit_period = str(max_profit_row['Period'])
    max_profit_value = float(max_profit_row['Net_Profit'])

    min_profit_period = str(min_profit_row['Period'])
    min_profit_value = float(min_profit_row['Net_Profit'])

    # Profit / Loss months
    profit_months = df[df['Profit_or_Loss_Status'].str.contains('Profit', na=False)]['Period'].astype(str).tolist()
    loss_months = df[df['Profit_or_Loss_Status'].str.contains('Loss', na=False)]['Period'].astype(str).tolist()

    # Convert chart data to JSON-safe formats
    def convert_records(records):
        return [
            {k: (float(v) if isinstance(v, (int, float)) else str(v)) for k, v in row.items()}
            for row in records
        ]

    chart_data = convert_records(df[['Period', 'Total_Revenue', 'COGS', 'Operating_Expenses', 'Net_Profit']].to_dict(orient='records'))
    line_chart_data = convert_records(df[['Period', 'Net_Profit']].to_dict(orient='records'))
    bar_chart_data = convert_records(df[['Period', 'Total_Revenue', 'Operating_Expenses']].to_dict(orient='records'))

    insights = {
        'max_profit_period': max_profit_period,
        'max_profit_value': max_profit_value,
        'min_profit_period': min_profit_period,
        'min_profit_value': min_profit_value,
        'profit_months': profit_months,
        'loss_months': loss_months,
        'line_chart_data': line_chart_data,
        'bar_chart_data': bar_chart_data,
        'full_chart_data': chart_data
    }

    return insights
