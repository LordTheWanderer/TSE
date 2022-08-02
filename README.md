# TSE
TSE - Torrents Search Engine

Latest version: https://addons.mozilla.org/en-US/firefox/addon/tse-torrents-search-engine/

Just simple torrents search engine. It doesn't use any third party sites etc. Just vanilla JS.

Trackers support: rutracker, rutor, nnmclub, kinozal.

Main features:
- Simultaneous search across multiple trackers
- Google suggestions while typing
- Custom trackers editor (beta)
- Dark theme (author's nickname in the left bottom corner)
- Results filter (click on tracker's icon
- Results sorter (click on table header)
- Direct .torrent download (click on torrent's size)*
- Smart view (click on logo or arrow to show/hide left menu)
- Ability to remove all settings ("Reset button")
* Doesn't work for some trackers

Please contact me if you want to use more trackers, I will try to add them in next releases (you can contact me only by addon's comments for now).



Простой поисковик по популярным трекерам без использования внешних сайтов, написанный на чистом JS.

Поддерживет: rutracker, rutor, nnmclub, kinozal.

Основные возможности:
- Поиск по нескольким трекерам
- Подсказки гугла при вводе текста
- Редактор собственных трекеров (бета)
- Тёмная тема (активируется по нажатию на ник автора в левом нижнем углу)
- Фильтр результатов (по нажатию на иконку трекера)
- Сортировка результатов (по нажатию на шапку таблицы)
- Прямое скачивание .torrent файлов (по нажатию на размер торрента)*
- Удобный внешний вид (по нажатию на лого или стрелочку скрывается левое меню)
- Возможность полностью удалить настройки расширения (кнопка "Reset)
* Не работает для некоторых трекеров

Пожалуйста, свяжитесь со мной, если вы хотите увидеть в расширении другие трекеры (пока что только через комментарии к расширению).

Changelog
v0.1 03.07.2020

v0.2 08.08.2020
* Fixed Rutracker (updated selector name)
+ Added links to trackers in trackers list

v0.2.1 08.08.2020
* Fixed bug not showing count of results

v0.3 08.11.2020
* Changed permissions from global to specific sites access
+ Added tracker: Kinozal
+ Dark theme
+ Style improvements
+ Small fixes

v0.3.1 08.11.2020
+ Added context menu item "Search for torrents"

v0.3.2 09.11.2020
+ Added context menu item "Search for torrents"

v0.3.3 10.11.2020
* Fixed context menu item disappearing after browser restart

v0.3.4 10.11.2020
* Fixed nnmclub not showing torrents size when user is logged in

v0.3.5 13.11.2020
* Fixed inability to disable context menu

v0.3.6 27.01.2021
* Fixed rutor.info download links
* Changed permissions to allow http+https
* Kinozal: changed from http to https

v0.3.7 20.02.2021
+ Added Google suggestions
+ Added permissions for Google suggestions

v0.4.1 26.02.2021
+ Added custom trackers editor (beta)
* Edited permissions: access for any site since you can add any tracker manually
+ Added Keyboard control (arrows + enter) for Google suggestions
* Minor fixes

v0.4.2 26.02.2021
* Fixed little bug with new button

v0.4.4 08.06.2021
* Filter works also on tracker's link click from now
+ Added trackers descriptions
+ Added trackers: Pirabit, Underverse, Filebase, BigFANGroup, UnionGang, RiperAM, bitru

v0.4.5 25.06.2021
* Fixed Peers/Seeds counter
* Fixed search input focus outline bug + removed popup outline
* Fixed back/forward browser buttons were not working
* Fixed date/size sorting was not working
* Fixed some wrong dates (BigFANGroup)
* Fixed RiperAM torrent page links
* Fixed not active trackers were activating filter on click
* Suggestions: Up/Down arrows change input value
+ Suggestions: Backspace + Left/Right arrows focus input
+ Suggestions: Esc button restores old input value or closes suggestions list

v0.4.6 06.09.2021
+ Added "TopSeeds Mode": addon will get results with top seeders instead of the newest (by default)
* Sorting can be disabled by clicks on table header
* Minor fixes

v0.4.9
* Edited permissions: From "All websites" to: suggestqueries.google.com - for google suggestions; rutracker.org, rutor.info, nnmclub.to - base trackers
* "Reset" button will also remove optional permissions
* Minor fixes
You can go to Firefox > Extensions > TSE > Permissions tab and allow TSE to access to all websites if you don't want questions about permissions

v0.5
* Table rows background color changes on mouse hover
* Minor changes