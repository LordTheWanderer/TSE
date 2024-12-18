// auth: Selector to detect unlogged status
// selector: First result in table
// skipFromStart: If first is table's header
// dateType: Date to byte, source is
//      ["byte"]: byte = 70152431104
//      ["eng"]: english = 2020-08-09 03:40:32
//      ["rusShort"]: russian = 08 Июн 21 or 17/04/20 or 17.04.20
//      ["rusFull"]: russian = 30 октября 2019 в 19:29:32
//      ["rusDots"]: russian = 30.04.2021 в 09:54
//      ["rusLines"]: russian = 2020-01-30 18:25:19
//      ["byte/rusShort/rusDots", "attr", "data-ts_text"]: data from attribute
// sizeType: Size to byte, source is
//      ["byte", ""]: byte = 1620757868
//      ["eng", ""]: english = 4.49 GB
//      ["rus", ""]: russian = 4.49 ГБ
//      ["byte/eng/rus", "attr", "data-ts_text"]: data from attribute
// baseURL: Link generation = baseURL + url
// baseDownloadURL: Download link generation
const trackersDefault = [
  {
    trackerName: "Rutracker",
    trackerActive: true,
    trackerDescription: "Крупнейший русскоязычный битторрент трекер. Скачать бесплатно фильмы, музыку, книги, программы..",
    trackerIcon: "data:image/x-icon;base64,AAABAAEAEBAAAAEAGABoAwAAFgAAACgAAAAQAAAAIAAAAAEAGAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADg4ODLy8vd3d0AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADPz8+KioqgoKDb29vj4+Pf39/q6uoAAAAAAAAAAAAAAAAAAAAAAAAAAADe3t7b29vS0tL29vZOTk5paWlycnJ8fHy8vLwAAAAAAADt7e3c3Nzg4ODc3NympqbDw8OIiIjj4+PtTUD8393///////////+8vLwAAAAAAADU1NSgoKCampqUlJSCgoLz8/NKSUni4uLpJxnqOCrwZ1z2oZvj4+PPz88AAAAAAADr6+vx8fGmpqaurq7P9dn///9paWm9WlPhIBLpIRLpIRL///9XV1fOzMwAAAAAAADg4OD///9D1miK5qEQyz////8+PT1GLCuTFQvNHhHhIBLrtrPPz8+kpKQAAAAAAADh4eH8/PwTzEEQyz8Qyz+M5qL///9sbGxWEQyZJBy9WlO7cmzU1NSioqIAAAAAAADDw8P///8Qyz8Qyz8Qyz8Qyz9r34j///+emZk+PT1lZWTS0tKmpqbg4OAAAAAAAADY2NiP56V74pVh3YAQyz////+mpqZYN9DDtfT///+zoPbf39+xsbEAAAAAAAAAAAAAAAAAAAAAAAAAAAA31F/t7e2YmJhMIedAEulRJ+uhivSYmJi8vLwAAAAAAAAAAAAAAAAAAAAAAADj4+P+/v7IyMh2XdBAEulAEulAEunHuflKSUmYmJgAAAAAAAAAAAAAAAAAAAAAAAAAAADg4ODt7e329vZaM+tAEulAEulRJ+v///9+fn7d3d0AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADd3d2plPV4WO/////////////e3t7j4+MAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADr6+v///////+/v7/i4uLu7u4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADV1dXp6ekAAAAAAAAAAAAAAAAAAAAAAAD+PwAA/gMAAPgDAAAAAwAAAAMAAAADAAAAAwAAAAMAAAADAAAABwAA8AcAAOAHAADwAwAA/AMAAPwPAAD/PwAA",
    trackerURL: "https://rutracker.org",
    searchURL: "https://rutracker.org/forum/tracker.php?nm=",
    searchURLTopSeeds: "https://rutracker.org/forum/tracker.php?o=10&nm=",
    method: "POST",
    windows1251: true,
    authReq: true,
    authURL: "https://rutracker.org/forum/login.php",
    auth: "#login-form-quick",
    selector: "#tor-tbl>tbody>tr",
    skipFromStart: 0,
    title: "td.row4.med.tLeft.t-title-col>div.wbr.t-title>a",
    date: "td.row4.small.nowrap:last-child",
    dateType: ["byte", "attr", "data-ts_text"],
    size: "td.row4.small.nowrap.tor-size",
    sizeType: ["byte", "attr", "data-ts_text"],
    seeds: "td.row4.nowrap:nth-last-child(4)",
    peers: "td.row4.leechmed",
    baseURL: "https://rutracker.org/forum/",
    url: "td.row4.med.tLeft.t-title-col>div.wbr.t-title>a",
    baseDownloadURL: "https://rutracker.org/forum/",
    downloadURL: "td.row4.small.nowrap.tor-size>a",
  },
  {
    trackerName: "Rutor",
    trackerActive: true,
    trackerDescription: "Открытый торрент трекер Rutor",
    trackerIcon: "data:image/x-icon;base64,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",
    trackerURL: "https://rutor.info",
    searchURL: "https://rutor.info/search/0/0/100/0/",
    searchURLTopSeeds: "http://rutor.info/search/0/0/100/2/",
    method: "GET",
    windows1251: false,
    authReq: false,
    authURL: "",
    auth: "",
    selector: "#index>table>tbody>tr",
    skipFromStart: 1,
    title: "td:nth-child(2)>a:last-child",
    date: "td:nth-child(1)",
    dateType: ["rusShort"],
    size: "td:nth-last-child(2)",
    sizeType: ["eng"],
    seeds: "td:nth-last-child(1)>span.green",
    peers: "td:nth-last-child(1)>span.red",
    baseURL: "https://rutor.info",
    url: "td:nth-child(2)>a:last-child",
    baseDownloadURL: "https://",
    downloadURL: "td:nth-child(2)>a:nth-last-child(3)",
  },
  {
    trackerName: "NoNaMe",
    trackerActive: true,
    trackerDescription: "Торрент-трекер NNM-Club. Игры, фильмы, музыка mp3 и lossless, программы, отечественные и зарубежные сериалы, книги, мультфильмы и аниме. Рекомендации, обсуждение, рецензии и рейтинги.",
    trackerIcon: "data:image/x-icon;base64,AAABAAEAEBAAAAEAIABoBAAAFgAAACgAAAAQAAAAIAAAAAEAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAaQicAXRQFADICAQAHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADz4QA8PizAPu3XQDpjEIBtgkCABoAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAIAEuyUAP3/8AD//akA//+hAP92SgCVAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAAAAAAAAAAAAAAAAEAADjLiQD8//wA//7RFP//+lX/WlsPlwAAAAMAAAAGAAAAAAAAAAAAAAAAEAgAQqNBAP99HADfIAYAfgAAABQAAAAX21UC///4AP///Sj/+/Z//lZcMJOOjQCrqIEAwQ4CADAAAAAAAAAAAGEXAM39oAD//7oA/9ucAP94GwDFVRkK6p0wAP//owD/+KoB/+FTC///uQD//+wA//67AP6QUQC9DggAGAAAAACPNQDl964A//qqAv//3AD//8sB/39WAP85AwX/nxkA/5MQAP/sJQD/0T8A//Z9AP/6kwD/86AA/qJGALwTAABEtzcA5cshAP/jOAD//7wg///+Dv/RUQH/AgEE8hcAAG40BgB3RAAAzlYCAPh0BAD/zh8A//+RAP//hQD/5B8A/xcAAEx+HgDXz5oc/8yfPv//2g7/6VMA/AkEABQAAAAAAAAAAQAAAA4cCgBBOwkAg3EfAKyPfQDEdkAAq0ELAGYAAAAABQMBQNldFf3/8w3///sA/7AoAPIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAchNAPLaLgD/+8AA//eOAP9qDAGpAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFwLgCX0h8A//WiAP/+TQD/KgQAZAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAALQwAZqgRAPr0hwD/2VIA/QAAAAYAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAoBACp6BAD/7H0A/3ZlALoAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAARAQAx4zcA/93AAPQAAAAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACgEASawXAPMTCgAnAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/D+sQfgfrEH4H6xBuAesQQADrEEAAaxBAACsQQAArEEBAKxBg/+sQQP/rEED/6xBg/+sQYf/rEGH/6xBj/+sQQ==",
    trackerURL: "https://nnmclub.to",
    searchURL: "https://nnmclub.to/forum/tracker.php?o=1&nm=",
    searchURLTopSeeds: "https://nnmclub.to/forum/tracker.php?o=10&nm=",
    method: "GET",
    windows1251: true,
    authReq: false,
    authURL: "",
    auth: "",
    selector: "table.forumline.tablesorter>tbody>tr",
    skipFromStart: 0,
    title: "td.genmed>a",
    date: "td.gensmall:nth-last-child(1)>u",
    dateType: ["byte"],
    size: "td.gensmall:nth-child(6)>u",
    sizeType: ["byte"],
    seeds: "td.seedmed",
    peers: "td.leechmed",
    baseURL: "https://nnmclub.to/forum/",
    url: "td.genmed>a",
    baseDownloadURL: "https://nnmclub.to/forum/",
    downloadURL: "td:nth-child(5)>a",
  },
  {
    trackerName: "Tapochek.net",
    trackerActive: false,
    trackerDescription: "Скачать игры, фильмы, игры для консолей через торрент бесплатно. Новинки кино в хорошем качестве. Русификаторы для игр. Скачивайте репаки от рг механики первее всех только на торрент-трекере Тапочек.нет. Torrent-tracker Tapochek.net. Качайте стим-рипы от рг игроманы бесплатно.",
    trackerIcon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsTAAALEwEAmpwYAAAEKGlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iWE1QIENvcmUgNS4xLjIiPgogICA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPgogICAgICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgICAgICAgICB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iPgogICAgICAgICA8eG1wOk1vZGlmeURhdGU+MjAxMy0wNC0wNVQxMTowNDo5MDwveG1wOk1vZGlmeURhdGU+CiAgICAgICAgIDx4bXA6Q3JlYXRvclRvb2w+UGl4ZWxtYXRvciAyLjEuMTwveG1wOkNyZWF0b3JUb29sPgogICAgICA8L3JkZjpEZXNjcmlwdGlvbj4KICAgICAgPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIKICAgICAgICAgICAgeG1sbnM6dGlmZj0iaHR0cDovL25zLmFkb2JlLmNvbS90aWZmLzEuMC8iPgogICAgICAgICA8dGlmZjpPcmllbnRhdGlvbj4xPC90aWZmOk9yaWVudGF0aW9uPgogICAgICAgICA8dGlmZjpZUmVzb2x1dGlvbj43MjwvdGlmZjpZUmVzb2x1dGlvbj4KICAgICAgICAgPHRpZmY6Q29tcHJlc3Npb24+NTwvdGlmZjpDb21wcmVzc2lvbj4KICAgICAgICAgPHRpZmY6UmVzb2x1dGlvblVuaXQ+MTwvdGlmZjpSZXNvbHV0aW9uVW5pdD4KICAgICAgICAgPHRpZmY6WFJlc29sdXRpb24+NzI8L3RpZmY6WFJlc29sdXRpb24+CiAgICAgIDwvcmRmOkRlc2NyaXB0aW9uPgogICAgICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgICAgICAgICB4bWxuczpleGlmPSJodHRwOi8vbnMuYWRvYmUuY29tL2V4aWYvMS4wLyI+CiAgICAgICAgIDxleGlmOlBpeGVsWERpbWVuc2lvbj4xNjwvZXhpZjpQaXhlbFhEaW1lbnNpb24+CiAgICAgICAgIDxleGlmOkNvbG9yU3BhY2U+NjU1MzU8L2V4aWY6Q29sb3JTcGFjZT4KICAgICAgICAgPGV4aWY6UGl4ZWxZRGltZW5zaW9uPjE2PC9leGlmOlBpeGVsWURpbWVuc2lvbj4KICAgICAgPC9yZGY6RGVzY3JpcHRpb24+CiAgIDwvcmRmOlJERj4KPC94OnhtcG1ldGE+CnayM0MAAALXSURBVDgRhVNNSFRRGD3vvfvezCijTjVOGZow5A9YUWpRCAX9gVa4C8GFLqQg2ugqKBBaZauiaJMtwloVEVRiJVK50wFJy0KyUsufSB3NmWbm/XTuHWvbhXffnfu+73znO98ZDUWdm86e23mrtCh0AtBc/Hd5uut5ydj4966HV5u7RHtHdc/p+trjsQ/z0HUNmkYYuXF5njxnEXlUF47rIZhj+et2Ry+nk7enRFU0crg/9hXdT8aQGzChM0NTQBos04BMsB0S45uV4fKdsR3cbD8qIuGCU4LhaRYRBUEfAn5LlWMMDIJcOVOHkYkf6O59h0DAUIx0ePidcgjsEtDRhMwwDB2GEDCFgbaGKqylMkimbNSWR7B1Yy7mlxKoqYhg+OM8XsamIMhMMYXmKQCdAILJuq4jlOdHU22ZYiK3kkgQnS371O/RyZ8sZpCd908nAnhKPEEQh9RnF9dU8MJyEg/eTKIw34+T+0vV3exiQrXGtpW4cmRCqcsLKosLTdXYsz2sgnv6J9AXmyE4EA7l4OCOLbjUXIO+4Wnc6X1PAH7gUrvBKNnGatJG2s5aIcdvwrIEAj4TPvYs1xp1SaQd6sX4bD6UBpK+Tf7XH49ibimJlmNlaDoUxWZWDnE6e8vCSGUcXHs0holvy/AT+K9XlAbyh64bygflxQWqWn6uhcYD29RZzl+yqCgpwJeFX3AdR6qgvglqSOOwF85djlMGjM+sKEatR6KYo5j3BiZRWZyPlYQNxdZjm+sOVS1wKFkAgjwbmlaekC7cFd2AT7OrCnB8Jg6HDrTYv+2sZ7MR4Xqa6eNlmj1KAU0mZvvTcHfgs7KvvLMztjpnGOfQ2pZpIpNc1cXg0NsX51sb60sK89RM1ETIRJpKuk2O2ZW2lf8FPg77l5OJx+Ppsdjgc3IJlje0XeyorKiso1ayOPfsKNenLCH4UCiieZqnk03i1euB+yNPb/T8ARexGm5JqwBrAAAAAElFTkSuQmCC",
    trackerURL: "https://tapochek.net",
    searchURL: "https://tapochek.net/tracker.php?nm=",
    searchURLTopSeeds: "https://tapochek.net/tracker.php?o=10&nm=",
    method: "GET",
    windows1251: true,
    authReq: true,
    authURL: "https://tapochek.net/login.php",
    auth: ".post[name=login_username]",
    selector: "table.forumline.tablesorter>tbody>tr",
    skipFromStart: 0,
    title: "td.med>a>b",
    date: "td.small:nth-last-child(1)>u",
    dateType: ["byte"],
    size: "td.small:nth-child(6)>u",
    sizeType: ["byte"],
    seeds: "td.seedmed",
    peers: "td.leechmed",
    baseURL: "https://tapochek.net",
    url: "td.med>a",
    baseDownloadURL: "https://tapochek.net",
    downloadURL: "td.row4.small.nowrap>a.tr-dl",
  },
  {
    trackerName: "Kinozal",
    trackerActive: false,
    trackerDescription: "Список и поиск раздач (торрентов), поиск по разделам кино, музыки, жанрам и персонам.",
    trackerIcon: "data:image/x-icon;base64,AAABAAEAEBAAAAEAIABoBAAAFgAAACgAAAAQAAAAIAAAAAEAIAAAAAAAQAQAAAAAAAAAAAAAAAAAAAAAAACARztMgEc7/4BHO/+ARztMAAAAAIBHO0yhd2n/gEc7/6F3af+ARztMAAAAAIBHO0yARzv/gEc7/4BHO0wAAAAAgEc7/7iYiv/O4+r/pH5x/4FIPP+kfnH/zsrE/87j6v/OycL/pYB1/4BHO/+jfHD/ztbV/7+yrP+ARzv/AAAAAIBHO//O4+r/zu/9/87v/f/O7/3/zu/9/87v/f/O7/3/zu/9/87v/f/O7/3/zu/9/87v/f/O1dT/gEc7/wAAAACARztMpYB1/87v/f8IC5X/CAuV/wgLlf8IC5X/zu/9/77h+v9vgcv/SFSy/wAAif97j87/oXdp/4BHO0wAAAAAAAAAAIBHO//O7/3/gabq/w4Tnv8OE57/gabq/87v/f96muj/DBCd/wAAif83SMf/zu/9/4BHO/8AAAAAAAAAAIBHO0ynhXv/zu/9/87v/f8OE57/CAuV/87v/f+63vn/Hyqx/wAAif9KXMX/zO38/87v/f+mhHn/gEc7TAAAAAChd2n/1eHk/87v/f/O7/3/DhOe/wgLlf9nhuT/MEPF/wAAif82ScT/utjy/87v/f/O7/3/zsrD/6F3af8AAAAAgEc7/9Pk6v/O7/3/zu/9/xQcqP8IC5X/FBqo/xUYlf9of9v/zu/9/87v/f/O7/3/zu/9/87d4f+ARzv/AAAAAIBHO//Y19X/zu/9/87v/f8RGaT/CAuV/wAAif90h8v/zu/9/87v/f/O7/3/zu/9/87v/f/OycL/gEc7/wAAAAChd2n/up6S/87v/f/O7/3/ERmk/wgLlf9DXdj/CQ6Z/zdAqf/O7/3/zu/9/87v/f/O7/3/upyQ/6F3af8AAAAAgEc7TIJLQP/P7/3/zu/9/xQcqP8IC5X/zu/9/46l2f8jNMD/gJXS/87v/f/O7/3/zu/9/45kXf+ARztMAAAAAAAAAACARzv/0e35/5Go2/8UHKj/CAuV/5Go2//O7/3/XHDY/w4Tn/8YHJf/QEms/9Dr9v+ARzv/AAAAAAAAAACARztMu6KY/9Hu+v8IC5X/CAuV/wgLlf8IC5X/zu/9/87v/f9OZtz/FB2q/y08wv/Q6/b/oXdp/4BHO0wAAAAAgEc7/9/s8P/R7fn/0e77/9Hu+//O7/3/zu/9/87v/f/O7/3/z+/9/9Dt+P/Q7Pf/3u3t/87n8P+ARzv/AAAAAIBHO//Sz8j/3+zw/7qhlf+IWE//o31w/9jZ2P/a7fH/2NfV/7ylm/+GVEr/qYyD/87o8f/R2dj/gEc7/wAAAACARztMgEc7/4BHO/+ARztMAAAAAIBHO0yARzv/gEc7/4BHO/+ARztMAAAAAIBHO0yARzv/gEc7/4BHO0wAAAAACCEAAAABAAAAAQAAAAEAAIADAAAAAQAAAAEAAAABAAAAAQAAAAEAAAABAACAAwAAAAEAAAABAAAAAQAACCEAAA==",
    trackerURL: "https://kinozal.tv/",
    searchURL: "https://kinozal.tv/browse.php?s=",
    searchURLTopSeeds: "https://kinozal.tv/browse.php?t=1&s=",
    method: "GET",
    windows1251: true,
    authReq: false,
    authURL: "",
    auth: "",
    selector: "table.t_peer>tbody>tr",
    skipFromStart: 1,
    title: "td.nam>a",
    date: "td.s:nth-child(7)",
    dateType: ["rusDots"],
    size: "td.s:nth-child(4)",
    sizeType: ["rus"],
    seeds: "td.sl_s",
    peers: "td.sl_p",
    baseURL: "https://kinozal.tv",
    url: "td.nam>a",
    baseDownloadURL: "https://kinozal.tv",
    downloadURL: "td.nam>a",
  },
  // {
  //   trackerName: "Piratbit",
  //   trackerActive: false,
  //   trackerDescription: "Крупнейший торрент трекер piratbit.top, скачать торрент, тысячи бесплатных торрент фильмов, торрент игр для pc, repack, сериалы. Самые ожидаемые новинки фильмов, игр, сериалов которые уже можно скачать с нашего торрента.",
  //   trackerIcon: "data:image/x-icon;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAIAAACQkWg2AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAadEVYdFNvZnR3YXJlAFBhaW50Lk5FVCB2My41LjExR/NCNwAAAPJJREFUOE9jOPufNITOJ4igVPNiBghgZmGwcGfY/ZJh5WUGc1cQEpVikFdnmLQNmwZDOwbnYBDDI4ph3hEQQ92QwTsOZIqEPDYNQBLIlpRnUNCAakhvAInY+oDYRz7j0CCrAkLIGjyjQexj34nQEFXIsOYayE5lbahKFA1OQSAVQOAaBtUAAUA/TN+DTQMEAMNk/S2oBmMHhuRqBi5ekCAWDcX9DNufQEWQ/eCXBGJvfQhiQ6WR/QBBZGoAegmoDhg/QLDrBUgcKo1LAxxYe0HFodSKiyDbgSSEC0RbH4FEIAhoECQSgAihgkiEzieA/jMAAONbOzhCedWvAAAAAElFTkSuQmCC",
  //   trackerURL: "https://piratbit.top/",
  //   searchURL: "https://piratbit.org/tracker.php?ss=",
  //   searchURLTopSeeds: "https://piratbit.top/tracker.php?o=10&ss=",
  //   method: "POST",
  //   windows1251: false,
  //   authReq: false,
  //   authURL: "",
  //   auth: "",
  //   selector: "#tor-tbl>tbody>tr",
  //   skipFromStart: 0,
  //   title: "td.row4.med.tLeft>a",
  //   date: "td.row4.small.nowrap:last-child>u",
  //   dateType: ["byte"],
  //   size: "td.row4.small.nowrap>u",
  //   sizeType: ["byte"],
  //   seeds: "td.row4.seedmed>b",
  //   peers: "td.row4.leechmed>b",
  //   baseURL: "https://piratbit.top",
  //   url: "td.row4.med.tLeft>a",
  //   baseDownloadURL: "https://piratbit.top",
  //   downloadURL: "td.row4.med.tLeft>a"
  // },
  {
    trackerName: "BigFANGroup",
    trackerActive: false,
    trackerDescription: "BigFANGroup.org - новейшие сериалы, Comedy Club, фильмы, музыка, игры для компьютера и многое другое...",
    trackerIcon: "data:image/x-icon;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsTAAALEwEAmpwYAAAGOWlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDUgNzkuMTYzNDk5LCAyMDE4LzA4LzEzLTE2OjQwOjIyICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxOSAoV2luZG93cykiIHhtcDpDcmVhdGVEYXRlPSIyMDIxLTA2LTA4VDE2OjQyOjI3KzAzOjAwIiB4bXA6TW9kaWZ5RGF0ZT0iMjAyMS0wNi0wOFQxNzo1NjowNSswMzowMCIgeG1wOk1ldGFkYXRhRGF0ZT0iMjAyMS0wNi0wOFQxNzo1NjowNSswMzowMCIgZGM6Zm9ybWF0PSJpbWFnZS9wbmciIHBob3Rvc2hvcDpDb2xvck1vZGU9IjMiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6Mzc2YzIxYTAtYjQ4Mi0yYzQ2LTgwOTMtZmY5MDE4Nzg3OTc0IiB4bXBNTTpEb2N1bWVudElEPSJhZG9iZTpkb2NpZDpwaG90b3Nob3A6MDVhN2NlMDgtMGQyZC0yMzQzLWFlYzYtMjkxOWFmZmM1OWFkIiB4bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ9InhtcC5kaWQ6Y2M2MTNjMjgtMGRlNi0wMzRkLTg1ZWUtYmI2OGE4ZTI4M2JlIj4gPHhtcE1NOkhpc3Rvcnk+IDxyZGY6U2VxPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0iY3JlYXRlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDpjYzYxM2MyOC0wZGU2LTAzNGQtODVlZS1iYjY4YThlMjgzYmUiIHN0RXZ0OndoZW49IjIwMjEtMDYtMDhUMTY6NDI6MjcrMDM6MDAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE5IChXaW5kb3dzKSIvPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0iY29udmVydGVkIiBzdEV2dDpwYXJhbWV0ZXJzPSJmcm9tIGFwcGxpY2F0aW9uL3ZuZC5hZG9iZS5waG90b3Nob3AgdG8gaW1hZ2UvcG5nIi8+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJzYXZlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDozNzZjMjFhMC1iNDgyLTJjNDYtODA5My1mZjkwMTg3ODc5NzQiIHN0RXZ0OndoZW49IjIwMjEtMDYtMDhUMTc6NTY6MDUrMDM6MDAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE5IChXaW5kb3dzKSIgc3RFdnQ6Y2hhbmdlZD0iLyIvPiA8L3JkZjpTZXE+IDwveG1wTU06SGlzdG9yeT4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4Aby9JAAADNElEQVQ4y42Ta0hTcRjG/9PZdHa1ErzkZWUpaaaWmtOKzZ3R9Kw87szUZUo1C0zMlArCpCtdvmSR9aUIQTKwoqCii2illeZKu9FsFqXOSzNvpLOd83QyCoKKns/v/+H3/p/nJeQP6mygRdaHq9S2FtW9wVfJt2ymlBXkfwTbljmOvuwie8/a17ev0qB1WrAZNO7d1MBuZVrG29Pzx8zrvX57xA8f0mAkey/3Jfex6Uk+v7vEAFkYC+K7FqJYFuJYBmSBDsHRqdhbqsfzRgPH96c95K2KEu6jUUV4rhLGzTlQKOQIDlNgqr8We0oDUV09E8upGDgtEYxkDFazEaio8ERW1kL4+2mxrVAP3rZ1iHCj57/6hGpRtCMIVVXT0dHhBku7FFUXZ2Nw0AVB4Srs2y+DwzEJtXXTMDQkxukzXgiNSgXXt3GAjH0q/hSaIKCGMJArYjE8LEFefiiIxzp0dkpwvCwAGZlRaG6WgngaELkiAbKliUjQMLB3ZLaRz2amZVWqHi5yYVd/PT58cMXRY37I3hCGMbszwuVKZK6PQFOTu2CQDlEIC1GcDhk5WgybU2tJV6OycsdOLZxjGEjnJsM+NgndVjf09LjCZHKHi3cGDh/xx8iIFM0mN5SUBIBE6HH4oAa9TcmnyLsHVO6tK5TgrAMJ0AkEEhQXL8AMXy0GhD/IyolAbm4YzGYp6DVRSKSjQWRpaLxDwVJLpZG2+2rPfrPKHriIhU9wImpqpFBo4kH8DHj5UooLVV4wZIX/WGF+JpwE/MUJKRh6qxlor1NPmeiC5W5k+dnyJNy46TGBvr0oBIVFQeB5MeTK5QLFT4M0iOavxtVLBtia4/b9KlPDObdZ3U+XWY2bKJQKHejulsDBiXHipDfIvHQUFAbh2rVpcJ1DI8eYDq4/29L7KHjyb418Vu0bb21d+UVFsXCazcB9XhJEC1khHR1E35vpswaMkJZ9IG8QVm34H2/BUhevtL1Rfd65KwniuexEMs7RKZDI1Nh/YDcc42U9fG9e7D8PyvJAHdDXSt1orU8U8qexwUij7UUBuNEzl+A4503+V+/rKUVfC3W996nyclcjHfe3uW8UOslRx4OCyAAAAABJRU5ErkJggg==",
    trackerURL: "https://bigfangroup.org/",
    searchURL: "https://bigfangroup.org/browse.php?search=",
    searchURLTopSeeds: "https://bigfangroup.org/browse.php?s=seed&search=",
    method: "GET",
    windows1251: true,
    authReq: false,
    authURL: "",
    auth: "",
    selector: "#highlighted>tr",
    skipFromStart: 0,
    title: "td.indented>a",
    date: "td.indented:nth-child(4)>img:last-child",
    dateType: ["rusFull", "attr", "title"],
    size: "td:nth-last-child(4)",
    sizeType: ["eng"],
    seeds: "td:nth-last-child(3)",
    peers: "td:nth-last-child(2)",
    baseURL: "https://bigfangroup.org/",
    url: "td.indented>a",
    baseDownloadURL: "https://bigfangroup.org/",
    downloadURL: "td.indented>a"
  },
  {
    trackerName: "UnionGang",
    trackerActive: false,
    trackerDescription: "UnionGang is a RUSSIAN Private Torrent Tracker for MOVIES / GENERAL",
    trackerIcon: "data:image/x-icon;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAADAFBMVEUAAAAAAAEBAgIAAwMABQEDBwcEBAQFBQUGBwYEBwcEAwgFBgkCDg8FCQkHDgoHDQwKBwcKCwsLDAwMDAgIDhsNExcKGxYNGRYOGhcMHx4QDQsRDA0QEA4RFBERFRUVEBcUFBIVFRUWFhgXFx4XGRcUGRsZFxcaGhwZHRwcHBwWGykcFiMbHCIbHyIcHiMfHiUUISgbISQdISUgICEgJSUkISElJCEmJiUnJyYnLCUiKS8qJycqKSgqLCwvLjAwLSoyMC4yMTEwMTYzMzg0NDw5MDQ4MzQ4Ozc5PDw9PTs+PT0vPEA4NkI/PUBAPkJERD1AQEBBR0lFS0ZMRkNNQkhQS0JRSEZQS0pVT1NRUU5XVFRXWVZdVllbW19cX11bY2VgWlRkXl9lX2BiZWJlZGlnZmlnaGZkamVsbG10dG16eXl9fHp9gYCBhX6GhIuLhYOIhoaMiomOjo6OkJGVjYeYnJqeoJ6jnJqgnZ2im6Cmo5emoJ6upp6hoqWlpKGnpKKmoaitqKKrrK+vqKisra6oqrSsr7Owq6azq6y2s663tK62srK0srO1tbW7uLq+u7vAvb7Cv7/Eu7nEwsfHxcXJwcHMxsfKysfRz83W09fY0dDY0dTY1dHa1NLb29ng2dni3+P39/X5+PX5+fb+/vv9/f////8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADLbareAAAACXBIWXMAAAsTAAALEwEAmpwYAAAGOWlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDUgNzkuMTYzNDk5LCAyMDE4LzA4LzEzLTE2OjQwOjIyICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxOSAoV2luZG93cykiIHhtcDpDcmVhdGVEYXRlPSIyMDIxLTA2LTA4VDE2OjQyOjI3KzAzOjAwIiB4bXA6TW9kaWZ5RGF0ZT0iMjAyMS0wNi0wOFQxOToyMzo1MiswMzowMCIgeG1wOk1ldGFkYXRhRGF0ZT0iMjAyMS0wNi0wOFQxOToyMzo1MiswMzowMCIgZGM6Zm9ybWF0PSJpbWFnZS9wbmciIHBob3Rvc2hvcDpDb2xvck1vZGU9IjIiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MjMwNTgzYzUtOGJkZS05YzQzLThjMDEtYzQ0Yzk0MjU4ODBmIiB4bXBNTTpEb2N1bWVudElEPSJhZG9iZTpkb2NpZDpwaG90b3Nob3A6YjY3M2I4MTgtOWY5Mi0wMDQxLThmZTYtYjhiYzRkZTgyNTljIiB4bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ9InhtcC5kaWQ6MzQ1NDg5OWItZjA3MS0wNjRhLWJhODMtMzgzZDk5N2QyZDU0Ij4gPHhtcE1NOkhpc3Rvcnk+IDxyZGY6U2VxPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0iY3JlYXRlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDozNDU0ODk5Yi1mMDcxLTA2NGEtYmE4My0zODNkOTk3ZDJkNTQiIHN0RXZ0OndoZW49IjIwMjEtMDYtMDhUMTY6NDI6MjcrMDM6MDAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE5IChXaW5kb3dzKSIvPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0iY29udmVydGVkIiBzdEV2dDpwYXJhbWV0ZXJzPSJmcm9tIGFwcGxpY2F0aW9uL3ZuZC5hZG9iZS5waG90b3Nob3AgdG8gaW1hZ2UvcG5nIi8+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJzYXZlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDoyMzA1ODNjNS04YmRlLTljNDMtOGMwMS1jNDRjOTQyNTg4MGYiIHN0RXZ0OndoZW49IjIwMjEtMDYtMDhUMTk6MjM6NTIrMDM6MDAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE5IChXaW5kb3dzKSIgc3RFdnQ6Y2hhbmdlZD0iLyIvPiA8L3JkZjpTZXE+IDwveG1wTU06SGlzdG9yeT4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4pqRmPAAAA4UlEQVQYGWNgYOCXFBfRc3Q2F5ZhZAADPiYun75FS6YHCDBAAaN+z9LFC5f1msIExFzmzJ4/b8ZcByifk8c4MzapJCTfHirAymvduaCifuY0N5gWdp3g6ok1XeHyUFsYmEQjEvzNQhO1oQKayty+UzuqGmOk1cJc2YACybUZSmn9kwqkvLKao4CKZHObWivT3e38stsbyqOZGBg4LNR1veO76/ICLbWMDLmBWgRVbCNbGpyKS4OsDCRAZsSVTS7y4GSRS22bkqMBsshzVgobAzOQoTqhUAFsr40Q1EEmigwMAP6TNs9TMzdaAAAAAElFTkSuQmCC",
    trackerURL: "https://uniongang.net/",
    searchURL: "https://uniongang.net/browse.php?search=",
    searchURLTopSeeds: "https://uniongang.net/browse.php?sort=7&type=desc&search=",
    method: "GET",
    windows1251: false,
    authReq: true,
    authURL: "https://uniongang.net/login.php",
    auth: ".error2",
    selector: ".torcont",
    skipFromStart: 0,
    title: "td[align='left']>a",
    date: "td[align='left']>i",
    dateType: ["rusLines"],
    size: "td:nth-last-child(3)",
    sizeType: ["eng"],
    seeds: "td:nth-last-child(2)>nobr>b",
    peers: null,
    baseURL: "https://uniongang.net/",
    url: "td[align='left']>a",
    baseDownloadURL: "https://uniongang.net/",
    downloadURL: "td[align='left']>a:nth-last-child(3)"
  },
  {
    trackerName: "RiperAM",
    trackerActive: false,
    trackerDescription: "Скачать торрент Поиск. Riper.AM - Торрент трекер. Смотреть онлайн. Фильмы, сериалы, музыка, игры , софт, книги все новинки только для вас",
    trackerIcon: "data:image/x-icon;base64,AAABAAEAEBAAAAEAGABoAwAAFgAAACgAAAAQAAAAIAAAAAEAGAAAAAAAAAMAAAAAAAAAAAAAAAAAAAAAAAD///8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD///8AAAD///////////////////////////////////////////////////////8AAAAAAAD///8BAp0BAp0BAp0BAp0BAp0BAp0BAp0BAp0BAp0BAp0BAp0BAp3///8AAAAAAAD///8EBaAFBqBub8v////r7PUEBaAEBaBub8v////x8fYEBZ8FBZ////8AAAAAAAD///8ICaMJCaQICqQJCaP///8ICaRub8v////r7PUJCaQICaQICaT///8AAAAAAAD///8OD6gODqgND6gODqj///8ND6jx8fZub8sND6gND6gOD6gODqj///8AAAAAAAD///8TFa0TFK4TFa0UFK3////////x8fb///////8UFK0TFK0TFK3///8AAAAAAAD///8ZGrIZG7IZG7IZG7P///8ZGrMaGrMaGrLr7PX///8aG7MaG7P///8AAAAAAAD///8gIbgfIbgfILggILj///8gIbgfILcgIbgfILj///8gILgfIbj///8AAAAAAAD///8lJr0lJr0lJr1ub8v///8lJr0lJr0lJr3r7PX///8lJr0lJ73///8AAAAAAAD///8rK8IqK8H////////////////x8fb///////8rK8ErLMIqLML///8AAAAAAAD///8uMMUvMMUvMMVub8svMMYvL8UvMMUvMMUvMMUvMMUvMMYuMMX///8AAAAAAAD///8yM8gyM8gyM8gyM8gyM8gNx9ENx9ENx9EyM8gyM8gyM8gyM8j///8AAAAAAAD///8yM8gyM8gyM8gyM8gNx9EyM8gNx9EyM8gNx9EyM8gyM8gyM8j///8AAAAAAAD///////////////////////////////////////////////////////8AAAD///8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD///8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPCEtLQokKCdib2R5JykuZXEoMCkuY3NzKCd3aWR0aCcpCi0tPgo=",
    trackerURL: "https://riperam.org/",
    searchURL: "https://riperam.org/search.php?sr=topics&sf=titleonly&fp=1&tracker_search=torrent&keywords=",
    searchURLTopSeeds: "https://riperam.org/search.php?tracker_search=torrent&terms=all&fp=1&author=&sc=1&sf=firstpost&sr=topics&sk=ts&keywords=",
    method: "GET",
    windows1251: false,
    authReq: true,
    authURL: "https://riperam.org/ucp.php?mode=login",
    auth: ".icon-register",
    selector: "ul.topiclist.topics>li>dl",
    skipFromStart: 0,
    title: "dt>a.topictitle",
    date: "dt",
    dateType: ["rusShort"],
    size: "dt>b:nth-last-child(2)",
    sizeType: ["rus"],
    seeds: "dd.posts>span.seed",
    peers: "dd.posts>span.leech",
    baseURL: "",
    url: "dt>a.topictitle",
    baseDownloadURL: "https://riperam.org/",
    downloadURL: "dt>a",
  },
  {
    trackerName: "bitru",
    trackerActive: false,
    trackerDescription: "Популярные торренты, качайте бесплатно и без регистрации.",
    trackerIcon: "data:image/x-icon;base64,AAABAAEAEBAAAAAAAABoBAAAFgAAACgAAAAQAAAAIAAAAAEAIAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAD///8A////AP///wD///8A////AP///wAAAKAPAgKi/wICoe////8A////AP///wD///8A////AP///wAAAAAA////AP///wD///8A////AP///wACAqL/AgKhnwICov8CAqL/AgKi/wICov////8AAgKif////wD///8AAAAAAP///wD///8A////AAAAoA8CAqL/AgKi/wICov8CAqL/AgKi/wICov8CAqL/AgKi/wICov////8A////AAAAAAD///8A////AP///wABAaJPAgKi/wICov8DAH3/AwB9/wMAff8DAH3/AwB9/wMAff8CAqL/AACjH////wAAAAAAAgKi/wICov8CAqGfAgKi/wICov8CAqL/+/v7//v7+//7+/v/+/v7//v7+//7+/v/AgKi/wICov////8AAAAAAP///wD///8AAgKgrwICov8CAqL/AgKi//v7+//7+/v/AwB9/wICov/7+/v/+/v7/wICov8CAqL/////AAAAAAD///8A////AAICoF8CAqL/AgKi/wICov/7+/v/+/v7/wMAff8CAqL/+/v7//v7+/8CAqL/AgKi/wICoZ8AAAAA////AP///wACAqL/AgKi/wICov8CAqL/+/v7//v7+/8DAH3/AgKi//v7+//7+/v/AgKi/wICov////8AAAAAAP///wD///8AAgKi/wICov8CAqL/AgKi//v7+//7+/v/+/v7//v7+//7+/v/+/v7/wICov8CAqL/AgKifwAAAAD///8A////AP///wACAqL/AgKi/wICov/7+/v/+/v7/wUCg/8CAqL/AgKi/wICov8CAqL/AgKi/wICoY8AAAAA////AP///wD///8AAgKifwICov8CAqL/+/v7//v7+/8DAH3/AgKi/wICov8CAqL/AgKi/wICob////8AAAAAAP///wD///8A////AAICod8CAqE/AgKi//v7+//7+/v/AwB9/wICov8CAqL/AgKi/wICov8CAqL/////AAAAAAD///8A////AP///wD///8A////AAICov8CAqJ/AgKi/wICov8CAqL/AgKi/wICoW8CAqL/////AP///wAAAAAA////AP///wD///8A////AP///wD///8A////AAICov8CAqL/AgKi/////wACAqJ/////AP///wD///8AAAAAAP///wD///8A////AP///wD///8A////AP///wACAqL/AgKi/wICob////8A////AP///wD///8A////AAAAAAD///8A////AP///wD///8A////AP///wD///8AAgKi/wICon////8A////AP///wD///8A////AP///wAAAAAA/n8AAPgfAADwBwAA8AcAAAADAADAAwAA4AEAAMADAADAAwAA4AEAAPADAADoAwAA+hcAAP4/AAD+PwAA/v8AAA==",
    trackerURL: "https://bitru.org/",
    searchURL: "https://bitru.org/browse.php?s=",
    searchURLTopSeeds: "https://bitru.org/browse.php?sort=seeders&s=",
    method: "GET",
    windows1251: false,
    authReq: false,
    authURL: "",
    auth: "",
    selector: ".browse-list>tbody>tr",
    skipFromStart: 0,
    title: ".b-title>a.main",
    date: ".b-info>.ellips>span",
    dateType: ["rusFull"],
    size: "td[title='Размер']",
    sizeType: ["rus"],
    seeds: "td[title='Раздают']",
    peers: "td[title='Качают']",
    baseURL: "https://bitru.org/",
    url: ".b-title>a.main",
    baseDownloadURL: "https://bitru.org/",
    downloadURL: ".b-title>a.main",
  },

];