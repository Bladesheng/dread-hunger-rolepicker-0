# dread-hunger-rolepicker

![Demo](https://raw.githubusercontent.com/Bladesheng/dread-hunger-rolepicker/main/demo.gif)

## About this repository

Role picker for the game Dread Hunger.

Select 8 players and press the shuffle button. Players will be assigned random roles.

Output is shown on the page and a neatly formated text is also copied to clipboard, so you can immediately paste it to Discord.

Players are saved in localstorage, so you don't have to keep adding their names every time, even when you close the tab.

Some players are already loaded and you can add more / delete them as you wish.

Inspired by the [original role picker](https://dreadhunger.azurewebsites.net/) from Crooker

## Building locally

- Clone the repository, then:

```
npm install
npm run build
```

- Then to deploy to Github pages, run:

```
npm run deploy
```

- Or run the development server with:

```
npm run dev
```
