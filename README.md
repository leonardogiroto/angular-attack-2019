# Whatshouldido

Entry project for Angular Attack 2019 Hackathon.  
Hackathon project page: http://www.angularattack.com/entries/32-abacate

The idea is pretty simple: based on a given location, we give you activity suggestions, for those who don't know what to do with their spare time - very useful for indecisive people. Also, you can provide some filters - like wheter you prefer something at home or going out - and the suggestion will be based on those. After receiving a suggestion, we have an integration with HERE Maps, which searches for places nearby the given location that are related to the suggestion. Then, it shows to the user a list of those places, which he can click to view more information. And it is translated to English, Portuguese and Spanish.

## Published Link

Application was published in Netlify.  
Link: https://hardcore-northcutt-0f75dd.netlify.com/

## Environment

Angular 7.2.0  
Angular Material 7.3.6  
Typescript 3.2.2  
HERE Maps API Integration  
Sentry Integration

## Installation

```
npm install
```

## Runing the Project

```
ng serve
```

## Production Build

```
ng build --prod
```
