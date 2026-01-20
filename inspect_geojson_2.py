import json
import sys

# Set stdout to utf-8
sys.stdout.reconfigure(encoding='utf-8')

INPUT_FILE = "GeoJSON/districts (1).geojson"

def inspect_data():
    with open(INPUT_FILE, 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    # Find a feature in Dammam/Khobar/Dhahran
    target_cities = ["الدمام", "الخبر", "الظهران", "المنطقة الشرقية"]
    
    print("Searching for Eastern Province features...")
    
    for feature in data['features']:
        props = feature.get('properties', {})
        # Check all values in properties
        found = False
        for k, v in props.items():
            if v and isinstance(v, str) and any(city in v for city in target_cities):
                found = True
                break
        
        if found:
            print("\n--- FOUND MATCH ---")
            print(json.dumps(props, indent=2, ensure_ascii=False))
            # Found one, perform a check for region_id specifically
            if 'region_id' in props:
                print(f"REGION ID: {props['region_id']}")
                return # Exit after finding one good example to avoid noise
            
if __name__ == "__main__":
    inspect_data()
