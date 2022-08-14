module.exports.createEmail = (data, template) => {

    let email_template = {
        'algo trade business_account_created': `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body>
        <p>username: ${data.username}</p>
        <p>password: ${data.password}</p>
        <a href="http://localhost:4200/business/login">Login</a>
    </body>
    </html>
        `,

        'user_purchase_self': `
           <!DOCTYPE html>
           <html lang="en">
           <head>
               <meta charset="UTF-8">
               <meta name="viewport" content="width=device-width, initial-scale=1.0">
           </head>
           <body>
               <p> ${data.user_name} </p>
               <p> You have successfully subscribed Algo Trade worth Rs ${data.amount} </p>
               <p> Happy Trading</p>
           </body>
           </html>
               `,



        'user_purchase_recipient':`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body>
            <p>Your wellwisher ${data.user_name} just subscribed woth Rs ${data.amount}  for you</p>
            <p>Happy Algo Tradingl</p>
        </body>
        </html>
            `


    };
    return email_template[template];
}
