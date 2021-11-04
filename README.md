# DblessLogin

### Auth process without using any database!

dblesslogin is an npm package which is developed for basic authentication processes. With this package u can create ghost users without any record. When creating users their informations dont save anywhere even their passwords and mail addresses, users are asked for their e-mail and passwords, and then a pin is given to them. Anytime they can log in your system with this pin, email and password.

## Uploading Package

This package can download from npm. You can use this command in your project folder. <br>
`npm install dblesslogin`

## Importing

If you are using es6 modules, you can use this command to import
`import Auth from 'dblesslogin'`
else you can use `const Auth = require('dblesslogin')` too.

## Construction

Auth is an object and you need to config some settings on start.<br>
Params : (url: String, rule: String[], privateKey: string, publicKey: string<br>
`const auth = new Auth('https://github.com',['0:0','1:0','2:0'],privateKey,publicKey)` <br>
privateKey and publicKey variables have to be filled with an rsa key u can take a key from [here](https://travistidwell.com/jsencrypt/demo/). And url parameter just needs a string but if you use your url, you can customize it yourself. <br>
Rule parameter is an array and contains 3 string this strings mean index:value you have to customize it for security. Indexes can be between 0 and 63 and values can be hexadecimal numbers [0,1,2,3,4,5,6,7,8,9,0,a,b,c,d,f]

### Example

[ '0:0', '1:0', '2:0' ] => **000**a12fa9b916eb9078f8d98a7864e697ae83ed54f5146bd84452cdafd043c19

[ '0:a', '10:2', '63:f' ] => **0**a12fa9b91**2**eb9078f8d98a7864e697ae83ed54f5146bd84452cdafd043c1**f**<br>
You just have to create your own rule.

## Register Method

Register method returns a pin for login process <br>
`const pin = auth.register('johndoe@example.com', 'password123')`

## Login Method

Login method returns a token for authorization and this token can use in isAuth method for authorization.<br>
`const token = auth.login('johndoe@example.com', 'password123', pin)`

## isAuth Method

isAuth method returns boolean for authorization.

```
if(isAuth(token)){
	console.log('Access Accepted')
}else{
	console.log('Access Denied')
}
```

## License

This project is licenced under the [MIT License](http://opensource.org/licenses/mit-license.html).

Any bundled fonts are copyright to their respective authors and mostly under MIT or [SIL OFL](http://scripts.sil.org/OFL).
