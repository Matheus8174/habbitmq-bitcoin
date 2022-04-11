import './config/env';

import axios from "axios";
import Period from './enums/Period';
import Candle from './models/Candle';
import createMessageChannel from './messages/messageChannel';

type DataResponse = {
  bitcoin: {
    usd: number
  }
};

async function readMarketPrice() {
  const { data } = await axios.get<DataResponse>(process.env.PRICES_API);

  return data.bitcoin.usd
};

async function generatteCandle() {
  const loopTimes = Period.FIVE_MINUTES / Period.TEN_SECONDS;
  const candle = new Candle('BTC');

  const messageChannel = await createMessageChannel();

  if(!messageChannel) throw new Error('Messsage channel was not created');

  function loop () {
    Array
      .from({ length: loopTimes })
      .forEach(async () => {
        const price = await readMarketPrice()

        candle.addValue(price)

        console.log('reading candle' + price)

        await new Promise(resolve => setTimeout(() => resolve, Period.TEN_SECONDS))
      })

      candle.closeCandle()

      const candleObj = candle.toSimpleObject()

      const candleJson = JSON.stringify(candleObj)

      messageChannel?.sendToQueue(process.env.QUEUE_NAME, Buffer.from(candleJson))
    loop()
  }

  loop()
};

generatteCandle()
