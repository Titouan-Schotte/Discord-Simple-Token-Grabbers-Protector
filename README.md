# Discord Simple Token Grabbers Protector

Protect your Discord token from token grabbers !


This simple application will allow you to *avoid most of the token grabbers on Discord*.

Still in 2022 (or 2023), discord works as a kind of web page.
Your token is still stored in a folder called `Local Storage`.
Even the most novice hackers will have no trouble transferring this sensitive folder to gain access to your account.


This protection allows you to **continuously regenerate this folder** so that hackers will not find anything interesting in the "Local Storage" folder of your Discord application.

I also noticed that some protectors about token grabbers are sometimes forced to encrypt Discord or other files which is perfectly illegal even if it is for your benefit.

This protection will continuously disconnect you from Discord.
So you need to have your **password** and **A2F** handy to avoid losing your Discord account.


**__*So don't be surprised if you get disconnected from your account, it's done on purpose*__.**

## How does it work ?

Here is a desktop application created with [electronJs](https://www.electronjs.org/) which is a framework for NodeJS.
You have available the entire source code of the application and a compiled version in the "Releases" tab.

The operation is very simple and uses only the means offered by Discord.
Indeed there is an `Update.exe` file that exists in your Discord installation folder.
One of the features of this file is to update your `Local Storage` folder and make it completely empty !

The only thing that I do is to relaunch continually this file to make your `Local Storage` folder totally blank.

Once Discord has put the localstorage file in your RAM, it will very rarely reload it to check if you are still up to date.

![img.png](github-assets/img.png)

### Secure Launch Button

This button will launch Discord but with a auto-cleaner in background to destroy the `Local Storage` folder before that a hacker catch your token. (your `Local Storage` folder)

### Clear Token Button

This button will just instantly clear your `Local Storage` folder.

### Choose the cooldown

The shorter the cooldown, the less likely you are to get caught.
I don't advise to set the cooldown to 1s because it means that every second a file is executed : this is not good for your machine performance.

#### Why this little console ?

Just to show you when your token as been cleared


## How to trust this app ?

Most of the protections for your token on the internet are at times token grabbers.
Just go to YouTube and look at the comments of some videos about this.

The purpose of this application is to use to be **simple in every way**.
You can easily **review the code** and **compile it** yourself to observe that I am not doing anything fraudulent with your token.

## How to compile it ?

### If you trust me
Go to release section on Discord and download the .zip file.
Unzip it and execute DiscordSimpleTokenProtector.exe
- Download source code of this app,
- Install [NodeJS](https://nodejs.org/en/),
- Restart your computer,


- Open cmd or powershell
- Type : `cd ...(path to your folder)`
- Type : `npm i`
- Type : `electron-packager . --overwrite --platform=win32 --arch=ia32 --icon=images/icon/test.ico --prune=true --out=release-builds --version-string.CompanyName=CE --version-string.FileDescription=CE --version-string.ProductName="test" && node installers/windows/createinstaller.js`
- Go to release-builds folder and see your app folder !
- Enjoy !


## Sufficient protection ?

No !
It does not protect your browser, if you are connected to Discord on your browser: it's dead !