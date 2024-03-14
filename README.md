# Markdown App

## Description

-   @file Markdown.js
-   @description This file contains the code for handling Markdown files.
-   It provides functions for reading, writing, and manipulating Markdown content.

## Installation

-   To install and build the project, follow these steps:

-   Clone the repository to your local machine:
-   git clone https://github.com/Kabadzh0b/Markdown

-   Navigate to the project directory:
-   cd your-repo

-   Install the dependencies:
-   npm install

-   Run the project:
    node .\markdown.js --from inputFile.txt --out outputFile.txt

## Usage

-   It is not necessary to set output or input files, you will got a default input, and you will see a result in console
-   Also from default you got a inputFile.txt, which you can use in --from parameter

## How to run tests:

-   It's very easy, just go to root of project and write "npm run test" in console

## Revert commit:

-   https://github.com/Kabadzh0b/Markdown/commit/68b04d5e79238766b13e6c8b0f9bcb456442e40c

## Tests fall commit:

-   https://github.com/Kabadzh0b/Markdown/commit/c595b5fc90070894fd6cd64e8a43b11a3a550aff

## Conclusion:

-   Я вважаю, що тести це корисна річ у програмуванні, бо дає змогу відстежувати проблемні місця, і якщо щось в них йде не так, то вони швидко інформують про це програміста. Зараз я працюю в невеликому стартапі на 2 розробника junior програмістом, розробляю мобільний додаток на react-native, і на собі відчуваю, наскільки часто щось може йти не так. Ми використовуємо WatermelonDB, тому VSCode не може підказувати де щось не так. Суть у тому, що можна змінити назву колонки в локальній базі, а в коді забути перейменувати змінну наприклад з category.name на category.title, тому проект може падати через такі зміни. Якщо це потрапить в продакшн, то усім користувачам доведеться чекати фікс та перевстановлювати додаток. Тому нам дуже корисно було б написати тести хоча б на роботу із базою даних, я вже не кажу про Front-end частину, яка може постійно змінюватись, і зміни в одному місці можуть призвести до небажаних змін в іншому місці(так як я намагаюсь перевикористовувати стилі в різних компонентах, але css стилі дуже сильно відрізняються від react-nativeських StyleSheets) Наприклад на телефоні все може бути гарно, а у вебі flexDirection: "row" у сумішку із justifyContent: "space-between" може не працювати, я сам стикнувся із цією проблемою вчора. Тому я вважаю, що тести це дуже корисно, але їх писати і підтримувати дуже дорого. Починаючи від робочого часу програміста, закінчуючи наймом QA спеціаліста. Може із розвитком нейромереж це стане більш доступним, але зараз покривати тестами навіть лише "болючі" місця проекту дуже дорого для бізнесу. 