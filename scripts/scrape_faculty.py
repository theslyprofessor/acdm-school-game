#!/usr/bin/env python3
"""
Scrape SWC Faculty Directory and create indexed JSON database
"""

import requests
from bs4 import BeautifulSoup
import json
import time

def scrape_faculty_directory():
    """Scrape all faculty from SWC directory"""
    
    base_url = "https://www.swccd.edu/_showcase/directory/"
    faculty_data = []
    
    print("Fetching faculty directory...")
    
    try:
        response = requests.get(base_url)
        response.raise_for_status()
        
        soup = BeautifulSoup(response.content, 'html.parser')
        
        # Find all faculty entries
        # The directory uses Vue.js, so we might need to search for data in script tags
        # or make API calls directly
        
        # Try to find the data source
        scripts = soup.find_all('script')
        for script in scripts:
            if script.string and 'directory' in script.string.lower():
                print("Found potential data in script tags")
                # Extract the data (this will need adjustment based on actual structure)
        
        # Alternative: Look for direct faculty listings
        faculty_cards = soup.find_all(['div', 'article', 'li'], class_=lambda x: x and 'faculty' in x.lower())
        
        print(f"Found {len(faculty_cards)} potential faculty entries")
        
        for card in faculty_cards:
            # Extract faculty info
            name_elem = card.find(['h2', 'h3', 'h4', 'a'])
            if name_elem:
                name = name_elem.get_text(strip=True)
                
                # Get contact link
                contact_link = card.find('a', href=True)
                contact_url = contact_link['href'] if contact_link else None
                
                # Get department/title
                title_elem = card.find(['p', 'span'], class_=lambda x: x and any(t in str(x).lower() for t in ['title', 'position', 'department']))
                title = title_elem.get_text(strip=True) if title_elem else None
                
                faculty_data.append({
                    'name': name,
                    'title': title,
                    'contact_url': contact_url
                })
        
        return faculty_data
        
    except Exception as e:
        print(f"Error scraping directory: {e}")
        return []

def search_faculty_by_keywords(faculty_data, keywords):
    """Search faculty by department/program keywords"""
    results = []
    for faculty in faculty_data:
        if faculty['title']:
            title_lower = faculty['title'].lower()
            if any(keyword.lower() in title_lower for keyword in keywords):
                results.append(faculty)
    return results

def create_acdm_faculty_database():
    """Create database of ACDM-related faculty"""
    
    # For now, create a manual database based on known ACDM structure
    # This will be populated as we find actual contact URLs
    
    acdm_faculty = {
        "dean": {
            "name": "Diana Arredondo",
            "title": "Dean of Arts, Communication, Design & Media",
            "contact_url": None  # To be found
        },
        "departments": {
            "visual_arts": {
                "chair": {
                    "name": "TBD",
                    "contact_url": None
                },
                "programs": {
                    "architecture": {
                        "lead": {
                            "name": "TBD",
                            "contact_url": None
                        }
                    },
                    "art": {
                        "lead": {
                            "name": "TBD",
                            "contact_url": None
                        }
                    }
                }
            },
            "communication": {
                "chair": {
                    "name": "TBD",
                    "contact_url": None
                },
                "programs": {
                    "communication": {
                        "lead": {
                            "name": "TBD",
                            "contact_url": None
                        }
                    },
                    "film": {
                        "lead": {
                            "name": "TBD",
                            "contact_url": None
                        }
                    },
                    "journalism": {
                        "lead": {
                            "name": "TBD",
                            "contact_url": None
                        }
                    },
                    "recording_arts": {
                        "lead": {
                            "name": "Nakul Tiruviluamala",
                            "title": "Professor, Recording Arts & Technology",
                            "contact_url": "https://go.swccd.edu/contact/person/8a27ea911b4a741036c0a685624bcb5a"
                        }
                    }
                }
            },
            "performing_arts": {
                "chair": {
                    "name": "TBD",
                    "contact_url": None
                },
                "programs": {
                    "dance": {
                        "lead": {
                            "name": "TBD",
                            "contact_url": None
                        }
                    },
                    "music": {
                        "lead": {
                            "name": "TBD",
                            "contact_url": None
                        }
                    },
                    "theatre": {
                        "lead": {
                            "name": "TBD",
                            "contact_url": None
                        }
                    }
                }
            },
            "applied_technologies": {
                "chair": {
                    "name": "TBD",
                    "contact_url": None
                },
                "programs": {
                    "cad": {
                        "lead": {
                            "name": "TBD",
                            "contact_url": None
                        }
                    }
                }
            },
            "humanities": {
                "chair": {
                    "name": "TBD",
                    "contact_url": None
                },
                "programs": {
                    "liberal_arts": {
                        "lead": {
                            "name": "TBD",
                            "contact_url": None
                        }
                    },
                    "mexican_american_studies": {
                        "lead": {
                            "name": "TBD",
                            "contact_url": None
                        }
                    }
                }
            }
        },
        "counselors": [
            {
                "name": "TBD",
                "title": "ACDM Counselor",
                "contact_url": None
            }
        ]
    }
    
    return acdm_faculty

if __name__ == "__main__":
    print("SWC Faculty Directory Scraper")
    print("=" * 50)
    
    # Create ACDM faculty database
    acdm_data = create_acdm_faculty_database()
    
    # Save to JSON
    output_file = "../js/data/faculty.json"
    with open(output_file, 'w') as f:
        json.dump(acdm_data, f, indent=2)
    
    print(f"\n✅ ACDM faculty database saved to {output_file}")
    print("\nNote: Contact URLs marked as TBD need to be manually filled in")
    print("Search the directory at: https://www.swccd.edu/_showcase/directory/")
