import os
from pathlib import Path

# Fix TS errors
front_fixes = [
    'src/app/fan/assistant/page.tsx',
    'src/app/fan/dashboard/page.tsx',
    'src/app/role-select/page.tsx',
    'src/app/staff/dashboard/page.tsx',
    'src/app/volunteer/dashboard/page.tsx',
    'src/components/layout/TopNavBar.tsx',
]

for file_path in front_fixes:
    fp = Path(file_path)
    if not fp.exists(): continue
    content = fp.read_text(encoding="utf-8")
    
    # Replace useUserStore with useAuth
    if 'useUserStore' in content and 'useAuth' not in content:
        content = content.replace("import { useUserStore } from '@/store/userStore';", "import { useAuth } from '@/providers/AuthProvider';")
        content = content.replace('import { useUserStore } from "@/store/userStore";', 'import { useAuth } from "@/providers/AuthProvider";')
        content = content.replace('useUserStore()', 'useAuth()')
    
    # Handle role-select page specifically (or just remove the setRole part)
    if 'setRole' in content:
        content = content.replace('const { setRole } = useAuth();', 'const { user } = useAuth(); // setRole not supported anymore')
        content = content.replace('setRole(role.id as UserRole);', '// setRole is managed by backend JWT now')
        
    fp.write_text(content, encoding="utf-8")
    print(f'Fixed {file_path}')

# Fix conftest.py
conftest = Path('backend/tests/conftest.py')
if conftest.exists():
    content = conftest.read_text(encoding="utf-8")
    imports_to_add = '''
from app.models.stadium import Stadium, Zone
from app.models.match import Match
from app.models.operations import CrowdStatus, Incident, Notification
from app.models.tasks import VolunteerTask, StaffTask
'''
    if 'app.models.match' not in content:
        content = content.replace('from app.models.user import User, Role', 'from app.models.user import User, Role' + imports_to_add)
        conftest.write_text(content, encoding="utf-8")
        print('Fixed conftest.py imports')
