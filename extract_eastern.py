"""
Eastern Province GeoJSON Extractor
Extracts districts for Dammam, Khobar, and Dhahran from the large districts file.
"""
import json
import os

# File paths
INPUT_FILE = "GeoJSON/districts (1).geojson"
OUTPUT_FILE = "public/eastern_districts.json"

# Eastern Province city names to include (Arabic)
EASTERN_CITIES = [
    "الدمام",
    "الخبر", 
    "الظهران",
    "القطيف",
    "سيهات",
    "الجبيل",
    "رأس تنورة",
    "بقيق",
    "الأحساء",
    "حفر الباطن",
]

def extract_eastern_districts():
    print(f"Reading {INPUT_FILE}...")
    
    with open(INPUT_FILE, 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    print(f"Total features: {len(data.get('features', []))}")
    
    # Filter for Eastern Province districts (Region ID 5)
    eastern_features = []
    
    for feature in data.get('features', []):
        props = feature.get('properties', {})
        
        # Check region_id (handle int or str)
        region_id = props.get('region_id')
        
        # Region 5 is Eastern Province
        if region_id == 5 or region_id == '5':
            eastern_features.append(feature)
        # Also keep checking by name just in case region_id is missing but name implies Eastern
        elif "الشرقية" in str(props):
            eastern_features.append(feature)
    
    print(f"Eastern Province features found: {len(eastern_features)}")
    
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
