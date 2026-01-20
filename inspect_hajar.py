import json
import sys

# Set stdout to utf-8
sys.stdout.reconfigure(encoding='utf-8')

INPUT_FILE = "GeoJSON/districts (1).geojson"

def inspect_for_hajar():
    with open(INPUT_FILE, 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    print("Searching for features containing 'هجرة' (Hajar/Rural)...")
    
    match_count = 0
    region_ids = set()
    
    for feature in data['features']:
        props = feature.get('properties', {})
        name = props.get('name_ar', '') or ''
        
        if "هجرة" in name:
            match_count += 1
            r_id = props.get('region_id')
            region_ids.add(r_id)
            
            if match_count <= 5: # Print first 5 examples
                print(f"\nFOUND HAJAR: {name}")
                print(f"Region ID: {r_id}")
                print(f"City: {props.get('city_ar')}")
                
    print(f"\nTotal 'Hajar' features found: {match_count}")
    print(f"Associated Region IDs: {sorted(list(region_ids))}")

if __name__ == "__main__":
    inspect_for_hajar()
