import json
import sys

# Set stdout to utf-8
sys.stdout.reconfigure(encoding='utf-8')

INPUT_FILE = "GeoJSON/districts (1).geojson"

def inspect_data():
    with open(INPUT_FILE, 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    cities_to_check = ["الدمام", "الجبيل", "الأحساء"]
    
    for target in cities_to_check:
        print(f"\nChecking for {target}...")
        for feature in data['features']:
            props = feature.get('properties', {})
            # Check values
            for v in props.values():
                if v and isinstance(v, str) and target in v:
                    print(f"FOUND {target}: Region ID = {props.get('region_id')}")
                    print(f"Name: {props.get('name_ar')}")
                    # Break inner loop to move to next city
                    break 
            else:
                continue
            break # Break outer loop if found
            
if __name__ == "__main__":
    inspect_data()
