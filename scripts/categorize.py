import re

with open('/root/.openclaw/workspace/nueva-app/src/data/fermentum-data.ts', 'r') as f:
    content = f.read()

# Extract the articles array
match = re.search(r'export const articles: Article\[\] = \[(.*?)\];\s*export const issues', content, re.DOTALL)
if not match:
    print("Could not find articles array")
    exit(1)

articles_str = match.group(1)

# Split into individual article entries
# Each article starts with {"id": ... and ends with },
entries = re.split(r'(?=\{\s*"id")', articles_str)

articles_data = []
for entry in entries:
    id_match = re.search(r'"id"\s*:\s*"(\d+)"', entry)
    title_match = re.search(r'"title"\s*:\s*"([^"]+)"', entry)
    cat_match = re.search(r'"category"\s*:\s*"([^"]+)"', entry)
    if id_match and title_match:
        articles_data.append({
            'id': id_match.group(1),
            'title': title_match.group(1),
            'category': cat_match.group(1) if cat_match else 'ciencias-sociales',
            'raw': entry
        })

print(f"Total articles: {len(articles_data)}")
print(f"Already humanidades: {sum(1 for a in articles_data if a['category'] == 'humanidades')}")

# Categorization rules - keyword scoring with priority
# Higher score = more specific to that category
# First match in priority order wins for strong signals

def categorize(title):
    t = title.lower()
    
    # ====== FORCE CATEGORIES (very strong signals) ======
    
    # SALUD - very specific health terms
    health_force = ['medicina', 'salud pública', 'salud mental', 'salud reproductive', 'salud ambiental',
                   'epidemiológic', 'epidemiolog', 'nutrición', 'nutricional', 'hospital', 'clínica', 
                   'clínico', 'cirugía', 'quirúrgic', 'partera', 'pediatr', 'enfermer', 'rehabilitación',
                   'terapia', 'psiquiátric', 'psiquiatr', 'adicciones', 'drogas', 'alcohol', 'tabaco',
                   'cáncer', 'diabetes', 'obesidad', 'vacuna', 'vacunación', 'virus', 'bacteria', 'infeccios',
                   'patología', 'síndrome', 'transtorno', 'trastorno', 'discapacidad', 'enfermedad crónica',
                   'sida', 'vih', 'mortalidad infantil', 'morbilidad', 'mortalidad materna']
    for kw in health_force:
        if kw in t:
            return 'salud'
    
    # TECNOLOGÍA - very specific tech terms
    tech_force = ['ingeniería', 'ingeniero', 'informática', 'software', 'hardware', 'telecomunicaci',
                 'computación', 'computacional', 'inteligencia artificial', 'robot', 'automatizaci',
                 'ciber', 'digital (contexto tech)', 'web 2.0', 'sistema de información', 
                 'sistemas de información', 'base de datos', 'programación', 'algoritmo',
                 'biotecnología', 'nanotecnología', 'tecnología apropiada', 'tecnología de la información',
                 'tecnologías de la información', 'tic ', 'tics ', 'recursos humanos de informática',
                 'tableta cuneiforme', 'tableta digital', 'comunicación científica digital']
    for kw in tech_force:
        if kw in t:
            return 'tecnologia'
    
    # CIENCIAS NATURALES - very specific natural science terms
    nature_force = ['biodiversidad', 'fauna', 'flora', 'zoolog', 'botánica', 'geología', 'geológic',
                   'geomorfolog', 'sismolog', 'vulcanolog', 'meteorolog', 'climatolog', 'hidrolog',
                   'oceanograf', 'cartograf', 'topograf', 'mineralog', 'paleontolog', 'productividad primaria',
                   'fotosíntesis', 'ecosistema', 'hábitat', 'bioma', 'cadena trófica', 'biogeoquímica',
                   'microbiolog', 'biología molecular', 'genética', 'biotecnolog', 'bioquímica']
    for kw in nature_force:
        if kw in t:
            return 'ciencias-naturales'
    
    # ====== SCORING SYSTEM ======
    scores = {
        'salud': 0, 'tecnologia': 0, 'ciencias-naturales': 0,
        'economia': 0, 'humanidades': 0, 'ciencias-sociales': 0
    }
    
    # SALUD keywords
    health_kws = {
        'salud': 5, 'medicina': 5, 'enfermedad': 4, 'epidemiológic': 5, 'epidemiolog': 5,
        'nutrici': 4, 'sanidad': 4, 'hospital': 4, 'clínica': 4, 'clínico': 4,
        'quirúrgic': 4, 'partera': 4, 'pediatr': 4, 'enfermer': 3, 'rehabilitación': 3,
        'adicciones': 4, 'drogas': 3, 'alcohol': 3, 'tabaco': 3, 'cáncer': 4, 'diabetes': 4,
        'obesidad': 3, 'vacuna': 3, 'virus': 3, 'bacteria': 3, 'sida': 4, 'vih': 4,
        'salud mental': 5, 'salud pública': 5, 'medicina social': 5, 'medicina popular': 5,
        'síndrome': 3, 'trastorno': 3, 'discapacidad': 3, 'enfermedad crónica': 4,
        'mortalidad': 3, 'morbilidad': 3, 'psicología de': 3, 'psicológico': 2, 'mental': 2
    }
    
    # TECNOLOGÍA keywords
    tech_kws = {
        'tecnolog': 2, 'informática': 5, 'digital': 2, 'internet': 3, 'software': 5,
        'ingeniería': 5, 'ingeniero': 5, 'telecomunicaci': 4, 'computaci': 4,
        'automatizaci': 4, 'robot': 4, 'web 2.0': 5, 'sistema de información': 5,
        'sistemas de información': 5, 'base de datos': 5, 'programación': 5, 'algoritmo': 4,
        'máquina': 2, 'biotecnología': 5, 'nanotecnología': 5, 'tecnología apropiada': 4,
        'tecnología de la información': 5, 'tecnologías de la información': 5,
        'tic ': 3, 'tics ': 3, 'ciber': 3, 'comunicación científica digital': 4,
        'tableta cuneiforme': 4, 'tableta digital': 4, 'etnografía virtual': 4,
        'redes sociales de innovación': 3, 'redes socialistas de innovación': 3
    }
    
    # CIENCIAS NATURALES keywords
    nature_kws = {
        'ecolog': 4, 'ecológic': 4, 'ambiental': 2, 'ambiente': 2, 'medio ambiente': 3,
        'calidad ambiental': 3, 'sostenible': 2, 'sostenibilidad': 2,
        'biodiversidad': 5, 'fauna': 5, 'flora': 5, 'bosque': 3, 'río': 2,
        'geolog': 4, 'geológic': 4, 'geomorfolog': 4, 'paisaje natural': 4,
        'recursos naturales': 4, 'conservación': 2, 'naturaleza': 3,
        'suelo': 2, 'agua': 1, 'clima': 2, 'climátic': 2, 'productividad primaria': 5,
        'biológic': 2, 'biología': 2, 'genética': 3, 'microbiolog': 4,
        'contaminación': 2, 'polución': 2, 'residuo': 1, 'desecho': 1,
        'hábitat': 3, 'ecosistema': 4, 'bioma': 4, 'fotosíntesis': 5,
        'zoolog': 5, 'botánica': 5, 'paleontolog': 5, 'mineralog': 5
    }
    
    # ECONOMÍA keywords
    econ_kws = {
        'economía': 5, 'económico': 4, 'económica': 4, 'macroeconom': 5, 'microeconom': 5,
        'mercado': 2, 'financiero': 4, 'financiera': 4, 'comercial': 3, 'comercio': 3,
        'empresa': 3, 'negocio': 3, 'administración': 2, 'gerencia': 2, 'gestión': 1,
        'desarrollo económico': 4, 'producción': 2, 'productividad': 2, 'consumo': 2,
        'capital': 2, 'industria': 3, 'inversión': 3, 'industrial': 2,
        'línea de pobreza': 4, 'pobreza e ingreso': 4, 'pobreza y': 2,
        'concentración del ingreso': 4, 'desigualdad económica': 4, 'desigualdad del ingreso': 4,
        'globalización económica': 4, 'globalización de la economía': 4,
        'pequeña y mediana empresa': 3, 'pyme': 3, 'empresarial': 3,
        'renta': 2, 'ingreso': 2, 'costo': 1, 'precio': 1, 'moneda': 2,
        'fiscal': 2, 'tributario': 2, 'impuesto': 2, 'deuda': 2,
        'siembra y cosecha': 2, 'producción agrícola': 3, 'agrícola': 2,
        'agrario': 2, 'campesino': 2, 'rural': 1
    }
    
    # HUMANIDADES keywords
    hum_kws = {
        'arte': 3, 'artístico': 3, 'artística': 3, 'literatura': 5, 'literario': 5,
        'poético': 5, 'poesía': 5, 'narrativ': 4, 'narración': 4, 'cuento': 4,
        'filosofía': 5, 'filosófic': 5, 'estética': 5, 'hermenéutica': 4,
        'historia': 3, 'históric': 3, 'prehispánic': 5, 'colonial': 3,
        'folclor': 5, 'folclóric': 5, 'mito': 4, 'religión': 4, 'religios': 3,
        'espiritual': 3, 'humanismo': 5, 'patrimonio cultural': 4, 'patrimonio': 2,
        'memoria histórica': 4, 'etnografía': 3, 'etnológ': 4, 'lengua': 3,
        'castellano': 3, 'español': 1, 'lingüístico': 4, 'lingüística': 4,
        'semiótica': 4, 'semiológ': 4, 'signo': 2, 'símbolo': 2,
        'modernidad': 2, 'posmodernidad': 3, 'identidad cultural': 3,
        'cultura popular': 3, 'tradición': 2, 'costumbre': 2,
        'grabado': 3, 'pintura': 3, 'escultura': 3, 'música': 3, 'danza': 3,
        'teatro': 3, 'cine': 3, 'cinematograf': 3, 'fotograf': 3,
        'arqueología': 4, 'arqueológic': 4, 'bien cultural': 4,
        'universo narrativo': 5, 'universo poético': 5
    }
    
    # CIENCIAS SOCIALES keywords (boosters)
    soc_kws = {
        'sociología': 5, 'sociológic': 4, 'antropología': 4, 'antropológic': 4,
        'urbano': 3, 'urbana': 3, 'ciudad': 3, 'metrópoli': 3, 'metropolitan': 3,
        'territorial': 3, 'territorio': 3, 'espacial': 3, 'espacialidad': 3,
        'demograf': 4, 'población': 2, 'migración': 3, 'migrante': 3, 'inmigración': 3,
        'social': 2, 'política': 2, 'político': 2, 'educación': 2, 'pedagogía': 3,
        'pedagógic': 3, 'violencia': 2, 'crimen': 3, 'delincuencia': 3, 'derechos humanos': 3,
        'género': 3, 'feminista': 3, 'feminismo': 3, 'mujer': 2, 'masculinidad': 3,
        'familia': 2, 'comunidad': 2, 'participación': 2, 'barrio': 3, 'pobreza urbana': 3,
        'organización': 1, 'representaciones sociales': 4, 'identidad': 2,
        'etnicidad': 3, 'exclusión social': 4, 'inclusión social': 4,
        'marginación': 3, 'vulnerabilidad': 2, 'desarrollo social': 3,
        'desarrollo humano': 3, 'desarrollo sostenible': 2,
        'participación ciudadana': 3, 'ciudadanía': 3, 'democracia': 2,
        'gobierno': 2, 'governance': 2, 'administración pública': 3,
        'burocracia': 2, 'corrupción': 2, 'transparencia': 2,
        'conflicto': 2, 'paz': 1, 'guerra': 1, 'revolución': 1,
        'trabajo': 1, 'laboral': 2, 'empleo': 2, 'desempleo': 2, 'ocupación': 1,
        'jubilación': 2, 'vejez': 2, 'ancianidad': 2, 'niñez': 2, 'adolescencia': 2,
        'juventud': 2, 'adultez': 2, 'ciclo vital': 2,
        'escuela': 2, 'universidad': 2, 'estudiante': 1, 'docente': 2,
        'curriculum': 2, 'evaluación educativa': 3, 'aprendizaje': 1,
        'bullying': 3, 'acos': 3, 'disciplina escolar': 3
    }
    
    # Calculate scores
    for kw, score in health_kws.items():
        if kw in t:
            scores['salud'] += score
    for kw, score in tech_kws.items():
        if kw in t:
            scores['tecnologia'] += score
    for kw, score in nature_kws.items():
        if kw in t:
            scores['ciencias-naturales'] += score
    for kw, score in econ_kws.items():
        if kw in t:
            scores['economia'] += score
    for kw, score in hum_kws.items():
        if kw in t:
            scores['humanidades'] += score
    for kw, score in soc_kws.items():
        if kw in t:
            scores['ciencias-sociales'] += score
    
    # Special cases and overrides
    
    # "arte político" is about political philosophy/aesthetics -> humanidades
    if 'arte político' in t or 'arte y política' in t:
        scores['humanidades'] += 5
        scores['ciencias-sociales'] -= 3
    
    # "educación ambiental" is about education (social) not nature
    if 'educación ambiental' in t or 'formación ambiental' in t:
        scores['ciencias-sociales'] += 3
        scores['ciencias-naturales'] -= 3
    
    # "medicina social" is social science methodology
    if 'medicina social' in t:
        scores['salud'] += 3  # still has health content
        scores['ciencias-sociales'] += 2
    
    # "historia de vida" is social science methodology
    if 'historia de vida' in t and 'medicina' in t:
        scores['salud'] += 2
        scores['ciencias-sociales'] += 2
    
    # "semiología" without health context -> humanidades
    if 'semiología' in t and not any(h in t for h in ['medicina', 'clínica', 'síntoma', 'signo médico']):
        scores['humanidades'] += 3
        scores['salud'] -= 2
    
    # "sistemas de información geográfica" -> tecnología (GIS)
    if 'sistema de información geográfica' in t or 'sistemas de información geográfica' in t:
        scores['tecnologia'] += 5
        scores['ciencias-naturales'] -= 2
    
    # "redes" without "sociales" or "innovación" -> ambiguous, default social
    if 'redes' in t and 'sociales' not in t and 'innovación' not in t and 'solidaridad' not in t:
        scores['tecnologia'] += 1
    
    # "globalización" alone -> social (unless paired with economy)
    if 'globalización' in t and not any(e in t for e in ['economía', 'económica', 'mercado', 'financ']):
        scores['ciencias-sociales'] += 2
        scores['economia'] -= 1
    
    # "producción" in rural/agricultural context -> social/economic
    if 'producción agrícola' in t or 'producción campesina' in t:
        scores['economia'] += 2
        scores['ciencias-sociales'] += 1
    
    # "poesía", "narrativa", "literatura" -> humanidades
    if any(h in t for h in ['poesía', 'poético', 'narrativa', 'narrativo', 'literatura', 'literario', 'cuento', 'novela']):
        scores['humanidades'] += 5
    
    # "arquitectura" in urban context -> social
    if 'arquitectura' in t and ('urban' in t or 'ciudad' in t or 'paisaje urbano' in t):
        scores['ciencias-sociales'] += 3
        scores['humanidades'] += 1  # architecture is also humanities
    
    # "arquitectura" as art -> humanidades
    if 'arquitectura' in t and any(h in t for h in ['arte', 'estética', 'textura', 'sensualidad']):
        scores['humanidades'] += 3
    
    # Editorial / Presentación -> keep as is or default social
    if title.strip().lower() in ['editorial', 'presentación', 'presentación:', 'presentacion']:
        return 'ciencias-sociales'
    
    # Find max score
    max_score = max(scores.values())
    if max_score == 0:
        return 'ciencias-sociales'  # default
    
    # Get all categories with max score
    winners = [k for k, v in scores.items() if v == max_score]
    
    # Tie-breaking by specificity priority
    priority = ['salud', 'tecnologia', 'ciencias-naturales', 'economia', 'humanidades', 'ciencias-sociales']
    for p in priority:
        if p in winners:
            return p
    
    return 'ciencias-sociales'

# Apply categorization
changes = []
for article in articles_data:
    new_cat = categorize(article['title'])
    if new_cat != article['category']:
        changes.append({
            'id': article['id'],
            'title': article['title'][:60],
            'old': article['category'],
            'new': new_cat
        })
        article['category'] = new_cat

print(f"\nTotal changes: {len(changes)}")
print("\n--- Sample changes ---")
for c in changes[:30]:
    print(f"  {c['id']}: {c['title']}... | {c['old']} -> {c['new']}")

print("\n--- Random changes ---")
import random
random.seed(42)
for c in random.sample(changes, min(30, len(changes))):
    print(f"  {c['id']}: {c['title']}... | {c['old']} -> {c['new']}")

# Distribution
print("\n--- Final distribution ---")
from collections import Counter
dist = Counter(a['category'] for a in articles_data)
for cat, count in dist.most_common():
    print(f"  {cat}: {count}")

# Write back to file
new_articles_str = articles_str
for article in articles_data:
    old_pattern = f'"category": "{article["old_category"] if "old_category" in article else "ciencias-sociales"}"'
    # Need to find and replace in the specific article block
    pass  # Will do differently

# Actually, let's rebuild the articles string
print("\nRebuilding articles array...")

# Rebuild by replacing each article's category in its raw text
new_entries = []
for article in articles_data:
    raw = article['raw']
    # Replace category line
    new_raw = re.sub(
        r'"category"\s*:\s*"[^"]+"',
        f'"category": "{article["category"]}"',
        raw
    )
    new_entries.append(new_raw)

new_articles_str = ''.join(new_entries)
new_content = content[:match.start(1)] + new_articles_str + content[match.end(1):]

with open('/root/.openclaw/workspace/nueva-app/src/data/fermentum-data.ts', 'w') as f:
    f.write(new_content)

print("Done! File updated.")
