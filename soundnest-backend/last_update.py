from datetime import datetime
try:
    file = open("last_update.txt", "x")
except FileExistsError:
    file = open("last_update.txt", "w")

file.write(str(datetime.now()))

file.close()