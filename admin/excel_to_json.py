import pandas as pd

df = pd.read_excel("products.xlsx")

df = df[["id", "name", "description", "image", "category", "price"]]

df.to_json("../data/products.json", orient="records", indent=2)

print("products.json updated")
