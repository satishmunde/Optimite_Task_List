import pandas as pd


df = pd.read_csv('./patients.csv')


df['LastCholCheckupDate'] = pd.to_datetime(df['LastCholCheckupDate'])

date = pd.to_datetime('2023-11-12')



df['CheckupAgeDiff'] = (date - df['LastCholCheckupDate']).dt.days / 365

patients = df[df['CheckupAgeDiff'] > 3.5]


num_patients = len(patients)

print("Number of patients ", num_patients)
