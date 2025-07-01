class Card:
    def __init__(self,
        id: int,
        name: str,
        img: str,
        rarity: str,
        color: str,
        card_type: list[str],
        products: list[str],
        bloom: str,
        cardno: str
    ):
        self.id = id
        self.name = name
        self.img = img
        self.rarity = rarity
        self.color = color
        self.card_type = card_type
        self.products = products
        self.bloom = bloom
        self.cardno = cardno