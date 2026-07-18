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

# 3. Fix missing import in stadium.py
filepath = 'backend/app/models/stadium.py'
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

# I will just replace the import block entirely
if "from .operations import CrowdStatus" not in content:
    new_content = content.replace(
        "from typing import TYPE_CHECKING\nif TYPE_CHECKING:\n    from .match import Match",
        "from typing import TYPE_CHECKING\nif TYPE_CHECKING:\n    from .match import Match\n    from .operations import CrowdStatus"
    )
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(new_content)

print("Fixes applied.")
