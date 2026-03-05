import sys
import os
import json
from pathlib import Path

# Add the skill script path to sys.path
skill_path = Path(r'c:\Users\jaras\patitas-s3\front-s3\json\web\proyecto5-a\API-4PM\Evaluación Práctica C1. NextJS + BDA\proyecto-integrador-2\SKILL\antigravity-hardcode-remover\antigravity-hardcode-remover\scripts')
sys.path.append(str(skill_path))

from detect_hardcode import HardcodeDetector

def run():
    try:
        detector = HardcodeDetector('.')
        results = detector.scan_project()
        with open('full_results.json', 'w', encoding='utf-8') as f:
            json.dump(results, f, indent=2, ensure_ascii=False)
        print("Success: Results saved to full_results.json")
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    run()
