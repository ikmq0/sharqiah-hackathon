import json
import sys

# Set stdout to utf-8
sys.stdout.reconfigure(encoding='utf-8')

INPUT_FILE = "GeoJSON/districts (1).geojson"

def inspect_eastern_cities():
    with open(INPUT_FILE, 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    cities = set()
    
    for feature in data['features']:
        props = feature.get('properties', {})
        if str(props.get('region_id')) == '5':
            city = props.get('name_ar', '') 
            # In some geojson, city might be in another field, checking 'city_ar' if exists
            # properties often have 'city_id' mapping to another file, but here we only have this file easily readable
            # The previous output showed "name_ar" as the district name. 
            # Usually strict city name is not in district properties directly or it is.
            # Let's check what keys are available in a standard Region 5 feature
            
            # Let's collect 'city_id' if available
            cities.add(str(props))
            
    # That might be too much data. Let's just print one full feature from Region 5 to see structure again clearly
    count = 0
    for feature in data['features']:
        props = feature.get('properties', {})
        if str(props.get('region_id')) == '5':
            print("\nSAMPLE EASTERN FEATURE:")
            print(json.dumps(props, indent=2, ensure_ascii=False))
            count += 1
            if count >= 3:
                break

if __name__ == "__main__":
    inspect_eastern_cities()
