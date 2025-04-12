# forecast.py
import pandas as pd
from prophet import Prophet

def load_cashflow_data(csv_path):
    df = pd.read_csv(csv_path)
    df = df[['Date', 'Amount']].dropna()
    df = df.rename(columns={'Date': 'ds', 'Amount': 'y'})
    df['ds'] = pd.to_datetime(df['ds'])
    return df

def generate_forecast(df, periods=6):
    model = Prophet()
    model.fit(df)
    future = model.make_future_dataframe(periods=periods, freq='M')
    forecast = model.predict(future)
    return forecast[['ds', 'yhat']].tail(periods)
