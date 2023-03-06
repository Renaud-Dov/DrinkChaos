from typing import List
import random

from src.Price import Price


class Drink:

    def __init__(self, data: tuple):
        self.id_drink: int = data[0]
        self.name: str = data[1]
        self.price: float = 0
        self.min_price: float = data[2]
        self.max_price: float = data[3]
        self.crisis_mode: bool = data[4]
        self.crisis_price: float = data[5] if data[5] > 0 else self.min_price

        self.last_prices: List[Price] = []

    def __str__(self):
        return f"{self.name} - Price: {self.price}"

    def set_price(self):
        # using the last 5 prices to calculate the new price and randomize it a bit
        if len(self.last_prices) > 0:
            # calculate the average price
            avg_price = sum([price.price for price in self.last_prices]) / len(self.last_prices)
            # calculate the standard deviation
            std_dev = (sum([(price.price - avg_price) ** 2 for price in self.last_prices]) /
                       len(self.last_prices)) ** 0.5
            # calculate the new price
            self.price = avg_price + std_dev * random.uniform(-1, 1)
            # add a bit of randomness
            self.price += random.uniform(-0.8, 0.8) if not self.crisis_mode else random.uniform(-0.5, 0.5)
            # make sure the price is within the min and max price
            self.price = max(self.price, self.min_price)
            self.price = min(self.price, self.max_price if not self.crisis_mode else self.crisis_price)
        else:
            self.price = random.uniform(self.min_price, self.max_price if not self.crisis_mode else self.crisis_price)
        self.price = round(self.price, 1)



