import pandas as pd
import os

# Obtener la ruta del directorio del archivo CSV
csv_path = "nombres.csv"
csv_directory = os.path.dirname(csv_path)

# Construir la ruta del archivo JSON
json_filename = "nombres.json"
json_path = os.path.join(csv_directory, json_filename)

# Cargar el CSV, ignorando la tercera columna
df = pd.read_csv(csv_path, header=None, usecols=[0, 1], names=["nombre", "genero"])

# Convertir a JSON y guardar en la misma carpeta que el CSV
df.to_json(json_path, orient="records", force_ascii=False)

print(f"Archivo JSON generado con éxito en: {json_path}")
input("Presiona enter para cerrar la consola...")