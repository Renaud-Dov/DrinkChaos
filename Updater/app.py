import time

import psycopg2
import schedule
from os import environ
import logging

from src.Drink import Drink
from src.Price import Price

logger = logging.getLogger(__name__)
logger.setLevel(logging.INFO)
handler = logging.StreamHandler()
handler.setLevel(logging.INFO)
formatter = logging.Formatter('[%(asctime)s %(levelname)s] - %(message)s')
handler.setFormatter(formatter)
logger.addHandler(handler)

conn = psycopg2.connect(
    host=environ.get("DB_HOST"),
    database=environ.get("DB_DATABASE"),
    user=environ.get("DB_USERNAME"),
    password=environ.get("DB_PASSWORD")
)

cursor = conn.cursor()

logger.info("Starting update prices")


def update_prices():
    try:
        cursor.execute("SELECT * FROM drinks")

        rows = cursor.fetchall()
    except psycopg2.DatabaseError as error:
        logger.error(error)
        return
    drinks = [Drink(row) for row in rows]

    for drink in drinks:
        try:
            cursor.execute("SELECT * FROM drinkprices WHERE drink_id = %s", (drink.id_drink,))
            rows = cursor.fetchall()
            drink.last_prices = [Price(row) for row in rows]
            drink.set_price()

            cursor.execute("INSERT INTO drinkprices (drink_id, price) VALUES (%s, %s)", (drink.id_drink, drink.price))
            conn.commit()
            logger.info("Updated price for drink: %s to %f", drink.name, drink.price)
        except psycopg2.DatabaseError as error:
            logger.error(error)


timer = int(environ.get("TIMER")) if environ.get("TIMER") else 60
schedule.every(timer).seconds.do(update_prices)
update_prices()  # run once at start
while True:
    schedule.run_pending()
    time.sleep(1)
