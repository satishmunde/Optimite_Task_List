import pandas as pd


df = pd.read_csv('./patients.csv')

# Convert 'LastCholCheckupDate' to datetime
df['LastCholCheckupDate'] = pd.to_datetime(df['LastCholCheckupDate'])

# Define the reference date (12 Nov 2023)
reference_date = pd.to_datetime('2023-11-12')

# Calculate the difference between reference date and 'LastCholCheckupDate'
df['CheckupAgeDiff'] = (reference_date - df['LastCholCheckupDate']).dt.days / 365

# Filter patients whose last cholesterol checkup was more than 3.5 years ago
patients_over_3_5_years = df[df['CheckupAgeDiff'] > 3.5]

# Count the number of patients meeting this condition
num_patients_over_3_5_years = len(patients_over_3_5_years)

print("Number of patients who had their last cholesterol checkup more than 3.5 years ago:", num_patients_over_3_5_years)
