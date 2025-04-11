import pandas as pd
from prophet import Prophet
import matplotlib.pyplot as plt
import plotly.graph_objs as go  # <== ADD THIS!
from prophet.plot import plot_plotly

# Load your CSV
df = pd.read_csv("cash_data.csv")
df['Date'] = pd.to_datetime(df['Date'])

# Convert credit/debit to signed amount
df['Signed_Amount'] = df.apply(lambda row: row['Amount'] if row['Type'].lower() == 'credit' else -row['Amount'], axis=1)

# Group by month (use 'MS' to avoid warning)
monthly_cashflow = df.groupby(pd.Grouper(key='Date', freq='MS')).sum(numeric_only=True)[['Signed_Amount']].reset_index()
monthly_cashflow.columns = ['ds', 'y']
monthly_cashflow['month'] = monthly_cashflow['ds'].dt.month
monthly_cashflow['quarter'] = monthly_cashflow['ds'].dt.quarter

# Build model
model = Prophet(
    yearly_seasonality=True,
    seasonality_mode='multiplicative',
    changepoint_prior_scale=0.5,
    seasonality_prior_scale=10
)
model.add_seasonality(name='monthly', period=30.5, fourier_order=5)
model.add_regressor('month')
model.add_regressor('quarter')

# Train
model.fit(monthly_cashflow)

# Predict
future = model.make_future_dataframe(periods=6, freq='MS')
future['month'] = future['ds'].dt.month
future['quarter'] = future['ds'].dt.quarter
forecast = model.predict(future)

# Plot
fig = plot_plotly(model, forecast)
fig.update_layout(title='Forecasted Cashflow', xaxis_title='Date', yaxis_title='Cashflow')
fig.show()
