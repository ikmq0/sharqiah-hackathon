import json
import os
import sys

# Set stdout to utf-8
sys.stdout.reconfigure(encoding='utf-8')

CITIES_FILE = "GeoJSON/cities.json"
DISTRICTS_FILE = "public/eastern_districts.json"

def check_rural_coverage():
    # Load cities
    print("Loading cities...")
    with open(CITIES_FILE, 'r', encoding='utf-8') as f:
        cities = json.load(f)
        
    # Filter Eastern cities
    eastern_cities = [c for c in cities if c.get('region_id') == 5]
    print(f"Total Eastern Province Cities: {len(eastern_cities)}")
    
    # Load extracted districts
    print("Loading extracted districts...")
    if not os.path.exists(DISTRICTS_FILE):
        print("Districts file not found!")
        return

    with open(DISTRICTS_FILE, 'r', encoding='utf-8') as f:
        districts = json.load(f)
        
    extracted_district_city_ids = set()
    for feature in districts['features']:
        props = feature.get('properties', {})
        cid = props.get('city_id')
        if cid:
            extracted_district_city_ids.add(cid)
            
    # Check which cities are missing from districts
    missing_cities = []
    rural_cities = []
    
    for city in eastern_cities:
        cid = city.get('city_id')
        name = city.get('name_ar', '')
        
        # Check if rural keyword
        is_rural = any(k in name for k in ["هجرة", "مركز", "قرية"])
        if is_rural:
            rural_cities.append(city)
            
        if cid not in extracted_district_city_ids:
            missing_cities.append(city)
            
    print(f"\nTotal Rural Cities Identified: {len(rural_cities)}")
    print(f"Rural Cities with NO districts in current map: {len([c for c in rural_cities if c in missing_cities])}")
    
    if len(missing_cities) > 0:
        print("\nSample Missing Cities (no districts mapped):")
        for c in missing_cities[:10]:
            print(f"- {c.get('name_ar')} (ID: {c.get('city_id')})")
            
    # Check if we have any districts named "Hajar" directly
    hajar_districts = 0
    for feature in districts['features']:
        name = feature['properties'].get('name_ar', '')
        if "هجرة" in name:
            hajar_districts += 1
            
    print(f"\nDistricts named 'Hajar' currently in map: {hajar_districts}")

if __name__ == "__main__":
    check_rural_coverage()
