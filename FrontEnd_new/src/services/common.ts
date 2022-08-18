export class CommonURL {
    //static BASE_URL: string = 'http://localhost:5000';
    static BASE_URL: string = '/api';

    static SUBSCRIPTION_PLAN = [
      {
        id : 0,
        type : 'Plan1',
        Amount : 1
      },
      {
        id : 1,
        type : 'Plan2',
        Amount : 10
      },
      {
        id : 2,
        type : 'Plan3',
        Amount : 20
      },
      {
        id : 3,
        type : 'Plan4',
        Amount : 30
      }
    ]
    static URL_PURCHASE_GIFT_CARD = 'userpurchase/purchase';
    static URL_PURCHASE_GIFT_CARD_SUCCESS = 'userpurchase/purchasecompletesuccess';
    static URL_PURCHASE_GIFT_CARD_ERROR= 'user-purchase/delete';
  }