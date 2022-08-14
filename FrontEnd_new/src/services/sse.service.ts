import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
//import * as EventSource from 'eventsource';      

@Injectable({
  providedIn: 'root'
})
export class SseService {
  constructor() {}
  
  getServerSentEvent(url: string) {
    console.log("inside sse service");
      const eventSource = this.getEventSource(url);
      console.log("event source = ", eventSource);
      eventSource.onopen = function() {
        console.log('connection to stream has been opened');
     };
     eventSource.onerror = function (error) {
       console.log('An error has occurred while receiving stream', error);
     };
     eventSource.addEventListener("LTP", function(stream) {
        console.log('received stream', stream);
     });
     

    //  eventSource.onmessage = function (stream) {
    //    console.log('received stream', stream);
    //  };
    //   eventSource.onmessage = event => {
    //     console.log("onmessage1");

    //     this._zone.run(() => {
    //       console.log("onmessage2");
    //       observer.next(event);
    //     });
    //   };
    //   eventSource.onerror = error => {
    //     this._zone.run(() => {
    //       console.log("event source error")
    //       observer.error(error);
    //     });
    //   };
    // });
  }
  private getEventSource(url: string): EventSource {
    console.log("inside sse URL = " + url);

    return new EventSource(url);

  }
}
