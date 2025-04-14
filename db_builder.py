import sqlite3

FILE_NAME = "adjectives.txt"

# Establish connection to the SQLite database file.
# If 'hebrew_words.db' doesn't exist (or you've deleted it), it will be created.
conn = sqlite3.connect('hebrew_words.db')
cursor = conn.cursor()

# Create a table to store Hebrew words, their gematria values, and the new 'type' column.
cursor.execute('''
    CREATE TABLE IF NOT EXISTS hebrew_words (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        word TEXT NOT NULL,
        gematria_value INTEGER NOT NULL,
        type TEXT
    )
''')
conn.commit()

gematria_map = {
    'א': 1, 'ב': 2, 'ג': 3, 'ד': 4, 'ה': 5,
    'ו': 6, 'ז': 7, 'ח': 8, 'ט': 9, 'י': 10,
    'כ': 20, 'ך': 20, 'ל': 30, 'מ': 40, 'ם': 40,
    'נ': 50, 'ן': 50, 'ס': 60, 'ע': 70, 'פ': 80,
    'ף': 80, 'צ': 90, 'ץ': 90, 'ק': 100, 'ר': 200,
    'ש': 300, 'ת': 400
}

def compute_gematria(hebrew_word: str) -> int:
    """Compute the gematria value of a given Hebrew word by summing up its letter values."""
    return sum(gematria_map.get(letter, 0) for letter in hebrew_word)

# Read the file and process each line.
with open(FILE_NAME, 'r', encoding='utf-8') as file:
    lines = file.readlines()

# Insert each non-empty line from the file into the database with the computed gematria value.
for line in lines:
    trimmed_word = line.strip()
    if trimmed_word:  # Avoid processing empty lines.
        gematria_value = compute_gematria(trimmed_word)
        cursor.execute(
            'INSERT INTO hebrew_words (word, gematria_value, type) VALUES (?, ?, ?)',
            (trimmed_word, gematria_value, 'adjective')
        )
conn.commit()

# Query and print all rows from the table to verify the inserts.
cursor.execute('SELECT * FROM hebrew_words')
rows = cursor.fetchall()
for row in rows:
    print(row)

# Close the connection when done.
conn.close()
