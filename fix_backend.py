import os
import glob

# 1. Delete broken migration
migrations = glob.glob('backend/alembic/versions/*_initial_migration.py')
for m in migrations:
    os.remove(m)

# 2. Fix script.py.mako
mako_path = 'backend/alembic/script.py.mako'
mako_content = '''"""

Revision ID: 
Revises: 
Create Date: 

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = ''
down_revision: Union[str, None] = '' if '' != 'None' else None
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    


def downgrade() -> None:
    
'''
with open(mako_path, 'w', encoding='utf-8') as f:
    f.write(mako_content)

# 3. Fix ruff errors by adding TYPE_CHECKING to models
models = {
    'user': ['ChatHistory', 'VolunteerTask', 'StaffTask'],
    'stadium': ['Match'],
    'match': ['Stadium'],
    'operations': ['Zone'],
    'tasks': ['User'],
    'ai': ['User']
}
for model, imports in models.items():
    filepath = f'backend/app/models/{model}.py'
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    type_checking_imports = "from typing import TYPE_CHECKING\nif TYPE_CHECKING:\n"
    for imp in imports:
        # crude but effective mapping
        if imp == 'Match': module = 'match'
        elif imp == 'Stadium' or imp == 'Zone': module = 'stadium'
        elif imp in ['ChatHistory']: module = 'ai'
        elif imp in ['VolunteerTask', 'StaffTask']: module = 'tasks'
        elif imp in ['User', 'Role']: module = 'user'
        else: module = 'operations'
        type_checking_imports += f"    from .{module} import {imp}\n"
    
    new_content = type_checking_imports + "\n" + content
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(new_content)

print("Fixes applied.")
