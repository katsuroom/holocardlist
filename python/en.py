import requests
from bs4 import BeautifulSoup

from .Card import Card

products = {
    "PROMO CARDS": "hPR",
    "Start Cheer Set": "hYS01",
    "Booster Pack – Blooming Radiance": "hBP01",
    "Start Deck – Tokino Sora & AZKi": "hSD01",
    # "スタートデッキ 紫 癒月ちょこ": "hSD04",
    # "スタートデッキ 青 猫又おかゆ": "hSD03",
    # "スタートデッキ 赤 百鬼あやめ": "hSD02",
    # "ブースターパック「クインテットスペクトラム」": "hBP02",
    # "スタートデッキ 黄 不知火フレア": "hSD07",
    # "スタートデッキ 緑 風真いろは": "hSD06",
    # "スタートデッキ 白 轟はじめ": "hSD05",
    # "ブースターパック「エリートスパーク」": "hBP03",
    # "【イベント物販／hololive production OFFICIAL SHOP限定商品】オフィシャルホロカコレクション-PCセット-": "hPC01",
    # "ブースターパック「キュリアスユニバース」": "hBP04",
    # "【使用可能カード】エントリーカップ「キュリアスユニバース」": "ent04"
}

def get_oshi(soup, info_list):
    children = info_list.findAll("dd")

    rarity = children[1].text
    products = filter(lambda el: el.name == None and el.text != "\n", children[2].children)
    products = list(map(lambda el: el.strip(), products))

    color = children[3].find("img").get("alt")
    cardno = soup.find("p", {"class": "number"}).find("span").text

    return {
        "rarity": rarity,
        "products": products,
        "color": color,
        "cardno": cardno
    }

def get_holomem(soup, info_list):
    children = info_list.findAll("dd")

    rarity = children[2].text
    products = filter(lambda el: el.name == None and el.text != "\n", children[3].children)
    products = list(map(lambda el: el.strip(), products))

    details = soup.find("dl", {"class": "info_Detail"}).findAll("dd")
    color = details[0].find("img").get("alt")
    bloom = details[2].text

    cardno = soup.find("p", {"class": "number"}).find("span").text

    return {
        "rarity": rarity,
        "products": products,
        "color": color,
        "bloom": bloom,
        "cardno": cardno
    }

def get_support(soup, info_list):
    children = info_list.findAll("dd")

    print(len(children))

    if len(children) == 4:
        rarity = children[1].text
        products = filter(lambda el: el.name == None and el.text != "\n", children[2].children)
    else:
        rarity = children[2].text
        products = filter(lambda el: el.name == None and el.text != "\n", children[3].children)
        
    products = list(map(lambda el: el.strip(), products))
    cardno = soup.find("p", {"class": "number"}).find("span").text

    return {
        "rarity": rarity,
        "products": products,
        "cardno": cardno
    }

def get_yell(soup, info_list):
    children = info_list.findAll("dd")

    rarity = children[1].text
    products = filter(lambda el: el.name == None and el.text != "\n", children[2].children)
    products = list(map(lambda el: el.strip(), products))

    color = children[4].find("img").get("alt")
    cardno = soup.find("p", {"class": "number"}).find("span").text

    return {
        "rarity": rarity,
        "products": products,
        "color": color,
        "cardno": cardno
    }

def get_card_by_id(id: int) -> Card:
    url = f"https://en.hololive-official-cardgame.com/cardlist/?id={id}"

    response = requests.get(url)

    print(response.status_code)
    html = response.content

    soup = BeautifulSoup(html, "html.parser")

    # get attributes
    name = soup.find("h1", {"class": "name"}).text
    img = soup.find("div", {"class": "w100"}).find("img").get("src")

    print(name)

    # info list
    info_list = soup.find("div", {"class": "info"}).find("dl")
    card_types = info_list.find("dd").text.split("・")
    card_type = card_types[0]

    match(card_type):
        case "Oshi":
            obj = get_oshi(soup, info_list)
            card = Card(id, name, img, obj["rarity"], obj["color"], card_types, obj["products"], "", obj["cardno"])
        
        case "holomem" | "Buzz holomem":
            obj = get_holomem(soup, info_list)
            card = Card(id, name, img, obj["rarity"], obj["color"], card_types, obj["products"], obj["bloom"], obj["cardno"])
        
        case "Support":
            obj = get_support(soup, info_list)
            card = Card(id, name, img, obj["rarity"], "", card_types, obj["products"], "", obj["cardno"])
        
        case "Cheer":
            obj = get_yell(soup, info_list)
            card = Card(id, name, img, obj["rarity"], obj["color"], card_types, obj["products"], "", obj["cardno"])
        
        case _:
            print(f"Unknown card type: '{card_type}'")
            card = None

    # process product names
    for i in range(len(card.products)):
        card.products[i] = products[card.products[i]]

    return card