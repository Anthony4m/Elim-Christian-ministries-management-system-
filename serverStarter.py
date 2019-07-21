import os
from subprocess import call
# function to start server
def server_starter(path):
    # os.system("start /wait cmd /c {cd\\}")
    # os.system("start /wait cmd /c {cd C:/ & cd Users & cd Himself & cd Documents & cd projects & cd Elim_ministries & node backapp.js}")
    os.system("start /B start cmd.exe @cmd /k " + path)
    # os.system("start /B start cmd.exe @cmd /k" + path)
    # os.startfile(path)
    print("Opening")

path = "cd C:/ & cd Users & cd Himself & cd Documents & cd projects & cd Elim_ministries & npm run dev"
server_starter(path)
# os.system("start /wait cmd /c {path}")