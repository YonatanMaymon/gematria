import sqlite3


conn = sqlite3.connect('hebrew_words.db')
cursor = conn.cursor()
cursor.execute('SELECT * FROM hebrew_words')
rows = cursor.fetchall()
for row in rows:
    print(row)

# Close the connection when done
conn.close()