from pathlib import Path
import re

# Fix fan/navigate/page.tsx
p = Path('src/app/fan/navigate/page.tsx')
c = p.read_text(encoding='utf-8')
c = re.sub(r'ShieldAlert,\s*', '', c)
c = re.sub(r'ShoppingBag,\s*', '', c)
c = re.sub(r'Train,\s*', '', c)
c = re.sub(r"import\s*\{\s*\}\s*from\s*['\"].+?['\"];?\n?", "", c)
p.write_text(c, encoding='utf-8')

# Fix role-select/page.tsx
p = Path('src/app/role-select/page.tsx')
c = p.read_text(encoding='utf-8')
c = re.sub(r"const\s*\{\s*user\s*\}\s*=\s*useAuth\(\);\s*\n?", "", c)
c = re.sub(r"import\s*\{\s*useAuth\s*\}\s*from\s*['\"].+?['\"];?\n?", "", c)
p.write_text(c, encoding='utf-8')

# Fix AuthProvider.tsx
p = Path('src/providers/AuthProvider.tsx')
c = p.read_text(encoding='utf-8')
c = re.sub(r"//\s*eslint-disable-next-line\s*react-hooks/exhaustive-deps\s*\n?", "", c)
p.write_text(c, encoding='utf-8')

print("Warnings fixed")
