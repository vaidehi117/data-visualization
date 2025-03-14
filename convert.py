import pandas as pd
# Reload the Excel file
xls = pd.ExcelFile("cpsa2024.xlsx")

# Load the relevant sheet with job labor data (previously identified as "cpsaat01")
df_jobs = xls.parse("cpsaat01")

# Drop metadata rows and reset index
df_jobs_cleaned = df_jobs.iloc[3:].reset_index(drop=True)

# Rename columns, keeping "Year" and "Employed" relevant for the chart
df_jobs_cleaned.columns = ["Year"] + df_jobs_cleaned.iloc[0, 1:].tolist()
df_jobs_cleaned = df_jobs_cleaned[1:].reset_index(drop=True)

# Convert "Year" to numeric and filter for valid years
df_jobs_cleaned["Year"] = pd.to_numeric(df_jobs_cleaned["Year"], errors="coerce")
df_jobs_cleaned = df_jobs_cleaned.dropna(subset=["Year"])

# Extract only the necessary columns: Year and Employed count
df_jobs_filtered = df_jobs_cleaned[["Year", "Employed"]].dropna()

# Save as CSV file
csv_path = "jobData.csv"
df_jobs_filtered.to_csv(csv_path, index=False)

# Return the path of the generated CSV file
csv_path
