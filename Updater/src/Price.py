import datetime


class Price:
    def __init__(self, data: tuple):
        self.drink_id: int = data[1]
        self.price: float = data[2]
        self.date: datetime.datetime = data[3]

    def __str__(self):
        return f"\t{self.date:%Y-%m-%d %H:%M:%S}: {self.price} €"