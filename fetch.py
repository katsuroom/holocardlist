import json
from python import jp
from python import en

def download():
    for i in range(1, 1089+1):
        print(f"id: {i}")

        card = en.get_card_by_id(i)

        if card == None:
            break

        with open("out.txt", "a", encoding="utf8") as f:
            json.dump(card.__dict__, f, ensure_ascii=False)

download()
print("done")