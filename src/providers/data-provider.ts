import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { newsAPIKey } from '../environment';

@Injectable()
export class DataProvider {
  dataUrl = "https://api.coinmarketcap.com/v1/ticker/?limit=0";
  newsUrl = "https://newsapi.org/v2";
  cryptoCompareUrl = "https://min-api.cryptocompare.com";
  constructor(public http: HttpClient) {
  }

  getPortfolioCoins(coinSymbols, currency) {
    const url = `${this.cryptoCompareUrl}/data/pricemultifull?fsyms=${coinSymbols}&tsyms=${currency}`;
    console.log("coin symbol url" + url);
    return this.http.get(url);
  }

  getCoinList() {
    return this.http.get(this.dataUrl);
  }

  getCoinHistorical(symbol: string): any {
    return this.http.get(`${this.cryptoCompareUrl}/data/histoday?fsym=${symbol}&tsym=USD&limit=6`);
  }


  getCoinNews(coin: any) {
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() - 5);
    console.log(currentDate.getFullYear() + '-' + (currentDate.getMonth() + 1) + '-' + (currentDate.getDate() < 10 ? '0' + currentDate.getDate() : currentDate.getDate()));
    return this.http.get(this.newsUrl + '/everything?' +
          'q=' + '\+' + coin.id + ' OR ' + coin.symbol + ' OR crypto' + '&' +
          'from=' + currentDate.getFullYear() + '-' + (currentDate.getMonth() + 1) + '-' + (currentDate.getDate() < 10 ? '0' + currentDate.getDate() : currentDate.getDate()) + '&' +
          'sortBy=popularity&' +
          'language=en&' +
          'apiKey=' + newsAPIKey);
  }

}
