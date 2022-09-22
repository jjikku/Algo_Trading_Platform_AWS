let emaillocal = "aneeshvdas@yahoo.co.in";
let emailPasslocal = 'xxx'
module.exports = {
    EMAIL:emaillocal,
    EMAILPASS:emailPasslocal,
    development: {
        connectionString: 'mongodb://localhost:27017/Algo_Trading_Platform',
        //connectionString: 'mongodb+srv://AneeshV:Aneesh*1234@cluster0.hdx3u.mongodb.net/BookStore'
        MD_secretKey: 'Yosw818$pm',
        MD_appKey: '9b07ec7466302b78e3f479',
        MD_source: 'WEBAPI',
        //MD_url: 'https://developers.symphonyfintech.in/marketdata/',
        userID: '56J04',
        MD_url: 'http://103.69.170.14:10349/apimarketdata'

    }
    
    
};
