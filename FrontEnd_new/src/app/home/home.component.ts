import { Component, OnInit, AfterViewInit } from '@angular/core';
declare const TradingView: any;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit, AfterViewInit {


  constructor() { }

  ngOnInit(): void {
    
  }
  ngAfterViewInit(){
    new TradingView.widget(
		{
		"width": 1400,
		"height": 550,
		"symbol": "BINANCE:BTCUSDT",
		"interval": "5",
		"timezone": "Asia/Kolkata",
		"theme": "dark",
		"style": "1",
		"locale": "en",
		"toolbar_bg": "#f1f3f6",
		"enable_publishing": false,
		"withdateranges": true,
		"hide_side_toolbar": false,
		"allow_symbol_change": true,
		"watchlist": [
		  
		  "BINANCE:BTCUSDT",
		  "BINANCE:ETHUSDT",
    	  "NASDAQ:TSLA",
    	  "NASDAQ:AAPL",
		],
		"details": true,
		"hotlist": true,
		"calendar": true,
		"studies": [
			"AwesomeOscillator@tv-basicstudies",
			"BB@tv-basicstudies",
			"LinearRegression@tv-basicstudies",
			"MAExp@tv-basicstudies",
			"PivotPointsHighLow@tv-basicstudies"
		 
		],
		"show_popup_button": true,
		"popup_width": "1500",
		"popup_height": "1000",
		"container_id": "tradingview_dc27f"
	  }
		);
		
		
	  }

}
