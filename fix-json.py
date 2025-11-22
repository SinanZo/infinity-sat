#!/usr/bin/env python3
import json
import re

# Read and fix products JSON
with open('scraped_products.json', 'r') as f:
    content = f.read()
    # Unescape the JSON string
    content = content.encode().decode('unicode_escape')
    data = json.loads(content)
    
with open('scraped_products.json', 'w') as f:
    json.dump(data, f, indent=2)
    
print(f"Fixed products JSON: {len(data)} items")

# Read and fix software JSON
with open('scraped_software.json', 'r') as f:
    content = f.read()
    # Unescape the JSON string
    content = content.encode().decode('unicode_escape')
    data = json.loads(content)
    
with open('scraped_software.json', 'w') as f:
    json.dump(data, f, indent=2)
    
print(f"Fixed software JSON: {len(data)} items")
