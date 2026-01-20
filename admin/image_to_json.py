import pandas as pd

df = pd.read_excel("images.xlsx")

df = df[["image", "caption", "category", "year"]]

df.to_json("../data/gallery.json", orient="records", indent=2)

print("gallery.json updated")
