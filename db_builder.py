import sqlite3

FILE_NAME = "nouns.txt"


# Establish connection to a local SQLite database file
# If 'hebrew_words.db' doesn't exist, it will be created in the current directory.
conn = sqlite3.connect('hebrew_words.db')
cursor = conn.cursor()

# Create a table to store Hebrew words and their gematria values
cursor.execute('''
    CREATE TABLE IF NOT EXISTS hebrew_words (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        word TEXT NOT NULL,
        gematria_value INTEGER NOT NULL
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

def compute_gematria(hebrew_word:str):
    return sum(gematria_map.get(letter, 0) for letter in hebrew_word)

# opens the file and read it line by line
with open(FILE_NAME, 'r', encoding='utf-8') as file:
    lines = file.readlines()

# inserting each word into the db
for line in lines:
    trimmed_word = line.strip()
    if trimmed_word:  # This avoids processing empty lines
        gematria_value = compute_gematria(trimmed_word)
        cursor.execute('INSERT INTO hebrew_words (word, gematria_value) VALUES (?, ?)',
                       (trimmed_word, gematria_value))
conn.commit()

# Query and print all rows
cursor.execute('SELECT * FROM hebrew_words')
rows = cursor.fetchall()
for row in rows:
    print(row)

# Close the connection when done
conn.close()
