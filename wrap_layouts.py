from pathlib import Path
import os

layouts_to_wrap = [
    'src/app/fan/layout.tsx',
    'src/app/volunteer/layout.tsx',
    'src/app/organizer/layout.tsx',
    'src/app/staff/layout.tsx'
]

for layout_path in layouts_to_wrap:
    p = Path(layout_path)
    if not p.exists(): continue
    
    with open(p, 'r') as f:
        content = f.read()
    
    role = layout_path.split('/')[2]
    
    if 'ProtectedRoute' not in content:
        # Add import
        content = 'import { ProtectedRoute } from "@/components/auth/ProtectedRoute";\n' + content
        # Wrap children
        content = content.replace('{children}', f'<ProtectedRoute allowedRoles={{{{"{role}"}}}}>\n        {{children}}\n      </ProtectedRoute>')
        
        with open(p, 'w') as f:
            f.write(content)

print("Layouts wrapped.")
