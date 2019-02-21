# CompLeap Proof-of-Concept

CompLeap Proof-of-Concept (POC).

## Käytetyt teknologiat ja kehitystyökalut

- React (https://reactjs.org/) (näkymäkirjasto)
- webpack (https://webpack.js.org/) ja Babel (https://babeljs.io/) (build)
- styled-components (https://www.styled-components.com/) (tyylit)
- JavaScript Standard Style (https://standardjs.com/) ja ESLint (https://eslint.org/) (koodityyli ja sen tarkistus)

## Riippuvuuksien asentaminen

```shell
npm i
```

Luo `.env`-tiedosto ympäristömuuttujille kopioimalla esimerkistä:
```shell
cp .env.example .env
```

## Sovelluksen ajaminen paikallisesti

```shell
npm run start:dev
```

Tämä käynnistää kehitysserverin (webpack-dev-server) ja tarjoaa sovelluksen osoitteessa http://localhost:8080/.

Vaihtoehtoisesti voit tehdä sovelluksesta kehitys-buildin (`npm run build:dev`) ja tarjoilla `dist`-hakemistossa olevat tiedostot jollakin toisella HTTP-palvelinsovelluksella.

## Testien ajaminen

Puppeteer-selaintestit:
```shell
npm run test:ui
```

Jest-komponenttitestit (snapshotit):
```shell
npm run test:snapshot
```

Kaikki testit kerralla:
```shell
npm run test
```
