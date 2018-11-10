import requests
from bs4 import BeautifulSoup
import io

ID = 166770

data = io.open("{}.html".format(ID), "r", encoding="utf-8").read()
soup = BeautifulSoup(data, 'html.parser')
formatted = soup.prettify()
imgs = soup.find_all('img')
for img in imgs:
	if img.src:
		# img.parent.insert(img.parent.index(img)+1, Tag(soup, 'span', text='HELLO'))
		img.parent.insert(img.parent.index(img)+1, 'HELLO OWORDD')
		# formatted = formatted.replace(str(img), "![{}]({})".format(img.src.split('/')[-1], img.src))
	print str(img)

with io.open("_{}.html".format(ID), "w", encoding="utf-8") as f:
	# f.write(formatted)
	f.write(soup.prettify())