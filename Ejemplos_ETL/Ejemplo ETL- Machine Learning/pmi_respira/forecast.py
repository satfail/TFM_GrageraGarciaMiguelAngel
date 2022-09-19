# python script

import pandas as pd
import numpy as np
import warnings
import os
warnings.filterwarnings("ignore")

dataset = pd.read_csv('table_input.csv', delimiter = ';')

#Orden
dataset.sort_values(['entityId','recvTime'], ascending=False)


#Eliminar datos fuera de rango
Q1 = dataset.quantile(0.25)
Q3 = dataset.quantile(0.75)
IQR = Q3 - Q1


#dataset_out = dataset[~((dataset < (Q1 - 1.5 * IQR)) |(dataset > (Q3 + 1.5 * IQR))).any(axis=1)]

dataset_out = dataset

#Index para serie
dataset_out.index = dataset_out["recvTime"]
dataset_out = dataset_out.drop(columns = "recvTime")
dataset_out.index = dataset_out.index.astype('datetime64[ns]')



#Train + pred para cada entidad
from statsmodels.tsa.arima.model import ARIMA

forecast_df = pd.DataFrame(columns=['entityId'])
training_df = pd.DataFrame(columns=['entityId','airQualityIndex'])
training_df.index = training_df.index.astype('datetime64[ns]')
forecast_df.index = training_df.index.astype('datetime64[ns]')
for item in dataset_out["entityId"].unique() : 
    trainingData = dataset_out["airQualityIndex"].where(dataset_out.entityId == item).dropna().resample("H").mean()
    trainingData = trainingData.to_frame()
    trainingData.insert(0, 'entityId', item)
    training_df = training_df.append(trainingData)
    model = ARIMA(trainingData["airQualityIndex"],order= (9,1,2))
    model.initialize_approximate_diffuse()
    results_AR = model.fit()
    fc = results_AR.forecast(24,alpha=0.05)#30 muestras,intervalo de confianza
    fc_series = pd.Series(fc)
    fc_series = fc_series.to_frame()
    fc_series.insert(0, 'entityId', item)
    forecast_df = forecast_df.append(fc_series)
    #print(fc_series)

#Formatear
forecast_df["entityId"] = forecast_df["entityId"].str.strip()
forecast_df.loc[forecast_df["predicted_mean"] < 0 , "predicted_mean"] = 0
forecast_df.loc[forecast_df["predicted_mean"] < 0.01 , "predicted_mean"] = 0
forecast_df['recvTime'] = forecast_df.index
forecast_df.reset_index(drop=True)
forecast_df.to_csv('calculated_forecast.csv', sep = ';' )