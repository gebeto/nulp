import requests
from bs4 import BeautifulSoup
import io

ID = 166770

resp = requests.get('http://vns.lp.edu.ua/mod/page/view.php?id={}'.format(ID), headers = {
	"Cookie": "_ga=GA1.3.1848652799.1538820573; MoodleSession=qg5a693i8c3mt036bq5jng2391"
}).content
soup = BeautifulSoup(resp, 'html.parser')
main = soup.find('div', {"role": "main"})
# main = BeautifulSoup("<div>Hello</div>")
parsed = main.prettify()
print parsed
with io.open("{}.html".format(ID), "w", encoding="utf-8") as f:
	f.write(parsed)