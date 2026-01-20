import json

INPUT_FILE = "GeoJSON/districts (1).geojson"

def inspect_data():
    with open(INPUT_FILE, 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    print(f"Total features: {len(data['features'])}")
    
    # Find a feature in Dammam to see its properties
    for feature in data['features']:
        props = feature.get('properties', {})
        name_ar = props.get('name_ar', '') or props.get('NAME_AR', '')
        
        if "الدمام" in str(props):
            print("\nFOUND DAMMAM DISTRICT:")
            print(json.dumps(props, indent=2, ensure_ascii=False))
            break
            
    # Print distinct region_ids if possible
    region_ids = set()
    for feature in data['features']:
        props = feature.get('properties', {})
        rid = props.get('region_id')
        if rid:
            region_ids.add(rid)
            
    print(f"\nDistinct Region IDs found: {sorted(list(region_ids))}")

if __name__ == "__main__":
    inspect_data()
