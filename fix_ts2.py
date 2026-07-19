import os
from pathlib import Path
import re

files = [
    'src/app/fan/assistant/page.tsx',
    'src/app/fan/dashboard/page.tsx',
    'src/app/role-select/page.tsx',
    'src/app/staff/dashboard/page.tsx',
    'src/app/volunteer/dashboard/page.tsx',
    'src/components/layout/TopNavBar.tsx',
]

for file_path in files:
    fp = Path(file_path)
    if not fp.exists(): continue
    content = fp.read_text(encoding='utf-8')
    
    # Remove unused useUserStore imports
    content = re.sub(r"import\s*\{\s*useUserStore\s*\}\s*from\s*['\"].+?['\"];?\s*", "", content)
    
    # Add useAuth import if not present
    if "useAuth" in content and "from '@/providers/AuthProvider'" not in content and 'from "@/providers/AuthProvider"' not in content:
        # insert after another import
        content = content.replace("import {", "import { useAuth } from '@/providers/AuthProvider';\nimport {", 1)

    fp.write_text(content, encoding='utf-8')
    print(f'Fixed imports in {file_path}')
