"""
Eastern Province GeoJSON Extractor
Extracts districts for Dammam, Khobar, and Dhahran from the large districts file.
"""
import json
import os

# File paths
INPUT_FILE = "GeoJSON/districts (1).geojson"
OUTPUT_FILE = "public/eastern_districts.json"
CITIES_FILE = "GeoJSON/cities.json"

def extract_eastern_districts():
    print(f"Reading {INPUT_FILE}...")
    
    with open(INPUT_FILE, 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    # 1. Extract Polygons (Districts)
    eastern_features = []
    district_city_ids = set()
    
    for feature in data.get('features', []):
        props = feature.get('properties', {})
        region_id = props.get('region_id')
        
        if str(region_id) == '5':
            eastern_features.append(feature)
            if props.get('city_id'):
                district_city_ids.add(props.get('city_id'))
    
    print(f"Eastern Province Polygon Districts found: {len(eastern_features)}")

    # 2. Extract Points (Rural Cities/Hajar)
    print(f"Reading {CITIES_FILE}...")
    with open(CITIES_FILE, 'r', encoding='utf-8') as f:
        cities = json.load(f)
        
    rural_count = 0
    for city in cities:
        # Check if Eastern Province (Region 5)
        if str(city.get('region_id')) == '5':
            cid = city.get('city_id')
            
            # If this city has NO districts in the polygon file, treat it as a Rural Point
            # Or if it explicitly has "هجرة" in name
            is_rural_keyword = any(k in city.get('name_ar', '') for k in ["هجرة", "مركز", "قرية"])
            
            if cid not in district_city_ids or is_rural_keyword:
                # Create a Point feature
                point_feature = {
                    "type": "Feature",
                    "properties": {
                        "name_ar": city.get('name_ar'),
                        "name_en": city.get('name_en'),
                        "city_id": cid,
                        "region_id": 5,
                        "type": "Rural" if is_rural_keyword else "City"
                    },
                    "geometry": {
                        "type": "Point",
                        "coordinates": [city['center'][1], city['center'][0]] # GeoJSON is [lon, lat]
                    }
                }
                eastern_features.append(point_feature)
                rural_count += 1
                
    print(f"Eastern Province Rural Points added: {rural_count}")
    
    # Create output GeoJSON
    output = {
        "type": "FeatureCollection",
        "features": eastern_features
    }
    
    # Ensure output directory exists
    os.makedirs(os.path.dirname(OUTPUT_FILE), exist_ok=True)
    
    with open(OUTPUT_FILE, 'w', encoding='utf-8') as f:
        json.dump(output, f, ensure_ascii=False)
    
    # Get file size
    size_mb = os.path.getsize(OUTPUT_FILE) / (1024 * 1024)
    print(f"Saved to {OUTPUT_FILE} ({size_mb:.2f} MB)")
    
    return len(eastern_features)

if __name__ == "__main__":
    count = extract_eastern_districts()
    print(f"Done! Extracted {count} districts.")
