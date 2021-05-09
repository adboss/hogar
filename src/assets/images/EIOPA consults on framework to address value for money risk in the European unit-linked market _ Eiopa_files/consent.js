/*
	by corvela
*/

var consentAccepted_JSON = false,
  consentRefused_JSON = false,
  consentAccepted_String = "",
  consentRefused_String = "",
  docLang = "zz";

var centralised_cookie_list = {
  "a": {
    "europa": ["europa-analytics", "load-balancers", "authentication"]
  }
};


(function (win, doc) {

  win.siteCookiesJSON = {"a": {}};
  if (typeof consent_required_cookies !== 'undefined' && typeof consent_required_cookies["a"] !== 'undefined') {
    win.siteCookiesJSON = consent_required_cookies;
    if (typeof win.siteCookiesJSON["a"]["europa"] === 'undefined') {
      win.siteCookiesJSON["a"]["europa"] = ["all_documented"];
    }
  } else {
    win.siteCookiesJSON = centralised_cookie_list;
  }

  if (typeof cookie_notice_url !== 'undefined') {
    win.cookieNoticeUrl = win.cookie_notice_url;
  } else {
    win.cookieNoticeUrl = {
      "en": "https://ec.europa.eu/info/cookies_en",
      "bg": "https://ec.europa.eu/info/cookies_bg",
      "cs": "https://ec.europa.eu/info/cookies_cs",
      "da": "https://ec.europa.eu/info/cookies_da",
      "de": "https://ec.europa.eu/info/cookies_de",
      "et": "https://ec.europa.eu/info/cookies_et",
      "el": "https://ec.europa.eu/info/cookies_el",
      "es": "https://ec.europa.eu/info/cookies_es",
      "fr": "https://ec.europa.eu/info/cookies_fr",
      "ga": "https://ec.europa.eu/info/cookies_ga",
      "hr": "https://ec.europa.eu/info/cookies_hr",
      "it": "https://ec.europa.eu/info/cookies_it",
      "lv": "https://ec.europa.eu/info/cookies_lv",
      "lt": "https://ec.europa.eu/info/cookies_lt",
      "hu": "https://ec.europa.eu/info/cookies_hu",
      "mt": "https://ec.europa.eu/info/cookies_mt",
      "nl": "https://ec.europa.eu/info/cookies_nl",
      "pl": "https://ec.europa.eu/info/cookies_pl",
      "pt": "https://ec.europa.eu/info/cookies_pt",
      "ro": "https://ec.europa.eu/info/cookies_ro",
      "sk": "https://ec.europa.eu/info/cookies_sk",
      "sl": "https://ec.europa.eu/info/cookies_sl",
      "fi": "https://ec.europa.eu/info/cookies_fi",
      "sv": "https://ec.europa.eu/info/cookies_sv"
    };
  }

  win.cckConfig = win.cck_config || {"ea_ignore": true};
  win.bannerDisplayed = false;

  var tag_add_st = '<a class="wt-cck-btn-add" href="javascript:void(0)" role="button">';
  var tag_ref_st = '<a class="wt-cck-btn-refuse" href="javascript:void(0)" role="button">';

  var _c = {

    euJSON: {
      jsonToString: function (obj) {
        return JSON.stringify(obj);
      },
      stringToJson: function (text, reviver) {
        return JSON.parse(text);
      }
    },

    label: {
      "noconsent": {
        "en": 'This part of the page requires cookies. ' + tag_add_st + 'I accept</a> / ' + tag_ref_st + 'I refuse</a> this site\'s cookies.',
        "bg": 'Тази част от страницата изисква бисквитки. ' + tag_add_st + 'Приемам</a> / ' + tag_ref_st + 'Не приемам</a> всички бисквитки на този сайт.',
        "sl": 'Ta stran zahteva piškotke. ' + tag_add_st + 'Sprejmem</a> piškotke na tej strani / ' + tag_ref_st + 'Ne sprejmem</a> piškotkov na tej strani.',
        "es": 'Esta parte de la página requiere cookies. ' + tag_add_st + 'Acepto</a> / ' + tag_ref_st + 'Rechazo</a> todas las cookies de este sitio.',
        "cs": 'Pro správnou funkci této části stránky je třeba povolit cookies. ' + tag_add_st + 'Povolit</a> / ' + tag_ref_st + 'Zakázat</a> cookies všude na těchto stránkách.',
        "da": 'Denne del kræver, at du accepterer cookies. ' + tag_add_st + 'Jeg accepterer</a> / ' + tag_ref_st + 'Jeg accepterer ikke</a> cookies på hele dette site.',
        "de": 'Dieser Teil der Seite erfordert Cookies. Sämtliche Cookies dieses Portals ' + tag_add_st + 'akzeptieren</a> / ' + tag_ref_st + 'ablehnen</a>.',
        "el": 'Σ΄αυτό το τμήμα της σελίδας χρειάζονται cookies. ' + tag_add_st + 'Αποδέχομαι</a> / ' + tag_ref_st + 'Δεν αποδέχομαι</a> όλα τα cookies του ιστότοπου.',
        "et": 'See lehekülje osa vajab küpsiseid. ' + tag_add_st + 'Nõustun</a> / ' + tag_ref_st + 'Ei nõustu</a> selle veebisaidi küpsistega.',
        "fi": 'Tämä osa sivusta edellyttää evästeiden käyttöä. ' + tag_add_st + 'Sallin</a> evästeet tällä sivustolla / ' + tag_ref_st + 'En salli</a> evästeitä tällä sivustolla.',
        "fr": 'Cette partie de la page nécessite des cookies. ' + tag_add_st + 'J\'accepte</a> / ' + tag_ref_st + 'je refuse</a> tous les cookies de ce site.',
        "ga": 'Tá gá le fianáin ar an gcuid seo den leathanach. ' + tag_add_st + 'Glacaim le fianáin</a> / ' + tag_ref_st + 'diúltaím d\'fhianáin</a> uile an tsuímh seo.',
        "hr": 'Za ovaj dio stranice potrebni su kolačići. ' + tag_add_st + 'Prihvati</a> / ' + tag_ref_st + 'odbaci</a> sve kolačiće ovog web-mjesta.',
        "hu": 'A webhelynek ez a része cookie-kat használ. ' + tag_add_st + 'Elfogadom</a> / ' + tag_ref_st + 'nem fogadom el</a> a webhelyhez tartozó összes cookie-t.',
        "is": 'Þessi hluti síðunnar krefst þess að þú notir vafrakökur. ' + tag_add_st + 'Ég samþykki</a> / ' + tag_ref_st + 'Ég samþykki ekki</a> vafrakökur.',
        "it": 'Questa parte della pagina richiede i cookie. ' + tag_add_st + 'Accetto</a> / ' + tag_ref_st + 'Rifiuto</a> tutti i cookie dal sito.',
        "lt": 'Kad galėtumėte naudotis šia puslapio dalimi, turite priimti slapukus. ' + tag_add_st + 'Priimu</a> / ' + tag_ref_st + 'Atsisakau priimti</a> visus šios svetainės slapukus.',
        "lv": 'Šīs lapas daļas aplūkošanai ir vajadzīgas sīkdatnes. ' + tag_add_st + 'Es pieņemu</a> / ' + tag_ref_st + 'noraidu</a> visas šīs vietnes sīkdatnes.',
        "mt": 'Din il-parti tal-paġna tirrekjedi l-cookies. ' + tag_add_st + 'Naċċetta</a> / ' + tag_ref_st + 'Nirrifjuta</a> l-cookies kollha ta\' dan is-sit.',
        "nl": 'Dit gedeelte van de pagina gebruikt cookies. ' + tag_add_st + 'Ja, ik accepteer</a> / ' + tag_ref_st + 'Nee, ik accepteer geen</a> cookies van deze site.',
        "no": 'Denne delen av siden krever informasjonskapsler. ' + tag_add_st + 'Jeg godtar</a> / ' + tag_ref_st + 'Jeg godtar</a> ikke informasjonskapslene på nettstedet.',
        "pl": 'Ta część strony wymaga zaakceptowania cookies. ' + tag_add_st + 'Akceptuję wszystkie cookies na tej stronie</a> / ' + tag_ref_st + 'Nie akceptuję żadnych cookies na tej stronie</a>.',
        "pt": 'O acesso a esta secção implica a aceitação de cookies. ' + tag_add_st + 'Aceito</a> / ' + tag_ref_st + 'Recuso</a> todos os cookies deste sítio.',
        "ro": 'Această parte a paginii necesită cookie-uri. ' + tag_add_st + 'Accept</a> / ' + tag_ref_st + 'Refuz</a> toate cookie-urile acestui site.',
        "sk": 'Táto časť stránky si vyžaduje použitie súborov cookies. ' + tag_add_st + 'Povoliť</a> / ' + tag_ref_st + 'Zakázať</a> všetky súbory cookies z tejto webovej lokality.',
        "sv": 'Den här delen av sidan kräver kakor. ' + tag_add_st + 'Jag accepterar</a> / ' + tag_ref_st + 'Jag accepterar inte</a> kakorna på den här webbplatsen.'
      },
      "uses_cookies": {
        "en":"This site uses cookies to offer you a better browsing experience",
        "bg":"Този сайт използва бисквитки, за да ви улесни при търсене",
        "es":"Este sitio web utiliza cookies para mejorar su experiencia de navegación",
        "cs":"Tyto stránky využívají v zájmu kvalitnějších služeb cookies",
        "da":"Dette site anvender cookies for at gøre din brugeroplevelse bedre",
        "de":"Dieses Portal verwendet Cookies zur Optimierung der Browserfunktion",
        "el":"Αυτός ο ιστότοπος χρησιμοποιεί cookies για καλύτερη φυλλομέτρηση",
        "et":"Parema sirvimise võimaldamiseks kasutatakse veebisaidil küpsiseid",
        "fi":"Tällä sivustolla käytetään evästeitä sivujen selaamisen helpottamiseksi",
        "fr":"Ce site utilise des cookies pour améliorer votre navigation",
        "ga":"Úsáidtear fianáin ar an suíomh seo chun gur fearr a bheidh do chuid brabhsála",
        "hr":"Ovo web-mjesto koristi kolačiće radi boljeg pregledavanja sadržaja",
        "hu":"Ez a webhely a böngészés tökéletesítése érdekében cookie-kat használ",
        "is":"Síðan notast við vafrakökur til að auðvelda þér að vafra um síðuna",
        "it":"Questo sito utilizza i cookie per migliorare l'esplorazione",
        "lt":"Kad naršymas būtų paprastesnis, šioje svetainėje naudojami slapukai",
        "lv":"Lai jums internetā būtu ērtāk atrast vajadzīgo, šajā vietnē ir izmantotas sīkdatnes",
        "mt":"Dan is-sit juża l-cookies biex joffrilek esperjenza aħjar",
        "no":"Dette nettstedet bruker informasjonskapsler for å gi deg en bedre nettleseropplevelse",
        "nl":"We gebruiken cookies op deze site voor een vlottere surf-ervaring",
        "pl":"W celu zapewnienia wyższej jakości usług, ta strona używa cookies",
        "pt":"Este sítio utiliza cookies (testemunhos de conexão) para facilitar a navegação",
        "ro":"Pentru a vă ajuta să navigaţi cât mai bine, site-ul utilizează cookie-uri",
        "sk":"Táto lokalita používa súbory cookies na zlepšenie funkcií prehliadania",
        "sl":"Uporabnikom želimo omogočiti učinkovito brskanje, zato ta spletna stran uporablja piškotke.",
        "sv":"På den här webbplatsen använder vi kakor för att göra det lättare för dig att söka information"
      },
      "accept": {
        "en":"I accept cookies",
        "bg":"Приемам бисквитки",
        "es":"Acepto las cookies",
        "cs":"Povolit cookies",
        "da":"Jeg accepterer cookies",
        "de":"Cookies akzeptieren",
        "el":"Αποδέχομαι τα cookies",
        "et":"Ma nõustun küpsistega",
        "fi":"Sallin evästeet",
        "fr":"J'accepte les cookies",
        "ga":"Glacaim le fianáin",
        "hr":"Prihvati kolačiće",
        "hu":"Elfogadom a cookie-kat",
        "is":"Ég samþykki vafrakökur",
        "it":"Accetto i cookie",
        "lt":"Priimu slapukus",
        "lv":"Es pieņemu sīkdatnes",
        "mt":"Naċċetta l-cookies",
        "nl":"Ja, ik accepteer cookies",
        "no":"Jeg godtar",
        "pl":"Akceptuję cookies",
        "pt":"Aceito os cookies",
        "ro":"Accept cookie-urile",
        "sk":"Povoliť cookies",
        "sl":"Sprejmem piškotke",
        "sv":"Jag accepterar kakor"
      },
      "refuse": {
        "en":"I refuse cookies",
        "bg":"Не приемам бисквитки",
        "es":"Rechazo las cookies",
        "cs":"Zakázat cookies",
        "da":"Jeg accepterer ikke cookies",
        "de":"Cookies ablehnen",
        "el":"Δεν αποδέχομαι τα cookies",
        "et":"Ma ei nõustu küpsistega",
        "fi":"En salli evästeitä",
        "fr":"Je refuse les cookies",
        "ga":"Diúltaím d'fhianáin",
        "hr":"Odbaci kolačiće",
        "hu":"Nem fogadom el a cookie-kat",
        "is":"Ég samþykki ekki vafrakökur",
        "it":"Rifiuto i cookie",
        "lt":"Atsisakau priimti slapukus",
        "lv":"Es noraidu sīkdatnes",
        "mt":"Nirrifjuta l-cookies",
        "nl":"Nee, ik accepteer geen cookies",
        "no":"Jeg godtar ikke",
        "pl":"Nie akceptuję cookies",
        "pt":"Recuso os cookies",
        "ro":"Nu accept cookie-urile",
        "sk":"Zakázať cookies",
        "sl":"Ne sprejmem piškotkov",
        "sv":"Jag accepterar inte kakor"
      },
      "cookies": {
        "en":"Cookies",
        "bg":"Бисквитки",
        "es":"Cookies",
        "cs":"Cookies",
        "da":"Cookies",
        "de":"Cookies",
        "el":"Cookies",
        "et":"Küpsised",
        "fi":"Evästeet",
        "fr":"Cookies",
        "ga":"Fianáin",
        "hr":"Kolačići",
        "hu":"Cookie-k",
        "is":"Vafrakökur",
        "it":"Cookie",
        "lt":"Slapukai",
        "lv":"Sīkdatnes",
        "mt":"Cookies",
        "nl":"Cookies",
        "no":"Informasjonskapsler",
        "pl":"Cookies",
        "pt":"Cookies",
        "ro":"Cookie-urile",
        "sk":"Súbory cookies",
        "sl":"Piškotki",
        "sv":"Kakor (cookies)"
      },
      "find_out_more_on":{
        "en":"Find out more on ",
        "bg":"Научете повече за това ",
        "es":"Más información sobre ",
        "cs":"Pročtěte podrobnosti, ",
        "da":"Læs mere om, ",
        "de":"Informieren Sie sich, ",
        "el":"Δείτε ",
        "et":"Lugege täiendavalt, ",
        "fi":" ",
        "fr":"En savoir plus sur ",
        "ga":" ",
        "hr":"Saznajte više o tome ",
        "hu":"Ha bővebb információkat szeretne kapni a cookie-k használatáról és arról, hogyan módosíthatja a beállításokat, kattintson ",
        "is":"Frekari upplýsingar hér um ",
        "it":"Scopri ",
        "lt":"Daugiau informacijos, ",
        "lv":"Noskaidrojiet, ",
        "mt":"Skopri aktar dwar, ",
        "nl":"Lees ",
        "no":"Få mer informasjon om ",
        "pl":"Dowiedz się, ",
        "pt":"Mais informações sobre a ",
        "ro":"Mai multe informaţii despre ",
        "sk":"Prečítajte si informácie o tom, ",
        "sl":"Več o ",
        "sv":"Läs mer om "
      },
      "how_we_use": {
        "en":"how we use cookies and how you can change your settings",
        "bg":"как използваме бисквитките и как можете да промените настройките си",
        "es":"cómo usamos las cookies y de qué manera puede cambiar su configuración",
        "cs":"jak přesně cookies využíváme a jak můžete změnit příslušná nastavení",
        "da":"hvordan vi bruger cookies, og hvordan du kan ændre dine indstillinger",
        "de":"wie wir Cookies verwenden und wie Sie Ihre Einstellungen ändern können",
        "el":"πώς χρησιμοποιούμε τα cookies και πώς μπορείτε να αλλάξετε τις ρυθμίσεις σας",
        "et":"kuidas me küpsiseid kasutame ning kuidas saate muuta oma seadeid",
        "fi":"Lisätietoja evästeistä ja asetusten muuttamisesta",
        "fr":"l'utilisation des cookies et la manière de modifier vos paramètres",
        "ga":"Cuir eolas ar an tslí ina n-úsáidimid fianáin agus ar an tslí chun do shocruithe a athrú",
        "hr":"kako se koristimo kolačićima i kako možete promijeniti vaše postavke",
        "hu":"ide",
        "is":"hvernig við notum vafrakökur og hvernig þú breytir stillingum",
        "it":"come usiamo i cookie e come è possibile modificare le tue impostazioni",
        "lt":"kaip naudojami slapukai ir kaip pakeisti savo nuostatas",
        "lv":"kāda ir mūsu sīkdatņu lietošanas politika un kā varat mainīt savus iestatījumus",
        "mt":"kif nużaw il-cookies u kif tista' tibdel is-settings tiegħek",
        "nl":"hoe we cookies gebruiken en hoe u uw instellingen kunt aanpassen",
        "no":"hvordan vi bruker informasjonskapsler og hvordan du kan endre innstillingene dine",
        "pl":"jak używamy cookies i jak można zmienić swoje ustawienia",
        "pt":"utilização de cookies e a alteração de parâmetros",
        "ro":"cum utilizăm cookie-urile şi despre cum vă puteţi modifica setările",
        "sk":"ako používame cookies a ako môžete zmeniť tieto nastavenia",
        "sl":"načinu uporabe piškotkov in kako lahko spremenite svoje nastavitve",
        "sv":"hur vi använder kakor och hur du ändrar dina inställningar"
      }
    },

    setDocLang: function (lang) {
      win.docLang = lang;
    },

    getDocLang: function () {
      if (win.docLang != "zz") {
        return win.docLang;
      }
      var off_lang_spec = new RegExp(/(en|fr|de|es|ga|hr|nl|no|is|it|cs|da|et|el|lv|lt|hu|bg|mt|pl|pt|ro|sk|sl|fi|sv)/);
      var root = doc.getElementsByTagName('html')[0];
      var lang = root.lang || root.getAttribute("lang") || false;

      if (lang && String(lang).length >= 2) {
        lang = lang.toLowerCase().substring(0, 2);
        if (lang.match(off_lang_spec)) {
          win.docLang = lang;
          return win.docLang;
        }
      }

      var metaTags = doc.getElementsByTagName("meta");
      for (var i = 0; i < metaTags.length; i++) {
        if (metaTags[i].httpEquiv == "Content-Language" && String(metaTags[i].content).length >= 2) {
          lang = String(metaTags[i].content).toLowerCase().substring(0, 2);
          if (lang.match(off_lang_spec)) {
            win.docLang = lang;
            return win.docLang;
          }
        }
      }

      var current_url = String(win.location).toLowerCase();
      var li = current_url.match(/_(en|fr|de|es|ga|hr|nl|no|is|it|cs|da|et|el|lv|lt|hu|bg|mt|pl|pt|ro|sk|sl|fi|sv)\./);
      if (li && typeof li[1] !== "undefined") {
        win.docLang = String(li[1]);
        return win.docLang;
      }
      win.docLang = "en";
      return win.docLang;
    },

    getLabel : function (main,lang) {
      return _c.label[main][lang] || _c.label[main]["en"] || "<!-- no such label " + main + " in language " + lang + " -->";
    },

    cookieNoticeUrl : function () {
      var rv = win.cookieNoticeUrl[win.docLang]||win.cookieNoticeUrl["en"]||win.cookieNoticeUrl["zz"]||"/cookies/index_en.htm";
      return rv;
    },

    inArray: function (needle, haystack) {
      var i = -1;
      for (var key in haystack) {
        i++;
        if (haystack[key] == needle) {
          return i
        }
      }
      return false;
    },

    getCookie: function (n) {
      var i, l, x, y, a = document.cookie.split(";");
      for (i = 0, l = a.length; i < l; i++) {
        x = a[i].substr(0, a[i].indexOf("="));
        y = a[i].substr(a[i].indexOf("=") + 1);
        x = x.replace(/^\s+|\s+$/g, "");
        if (x == n) {
          return unescape(y);
        }
      }
      ;
      return false;
    },

    setCookie: function (n, v, d) {
      d = null; // always session cookies
      var h = win.location.host, e = new Date();
      h = (h.match(/europa\.eu/)) ? ".europa.eu" : null;
      e.setDate(e.getDate() + d);
      var f = escape(v) + "; path=/" + ((h == null) ? "" : "; domain=" + h) + ((d == null) ? "" : "; expires=" + e.toUTCString());
      document.cookie = n + "=" + f;
    },

    cookiesEnabled: function () {
      if (_c.getCookie("eu_cookie_consent")) {
        return true
      }
      ;var c = (navigator.cookieEnabled) ? true : false;
      if (typeof navigator.cookieEnabled == "undefined" && !c) {
        _c.setCookie("cookiesenabled", "1");
        c = (document.cookie.indexOf("cookiesenabled") != -1) ? true : false;
      }
      ;
      return c;
    },

    validateJSON: function (j) {
      for (var ch in j) {
        if (ch != "a" && ch != "r") return false;
        for (var d in j[ch]) {
          if (typeof j[ch][d] === "string") {
            j[ch][d] = [j[ch][d]];
          } else if (j[ch][d] instanceof Array) {
            for (var i = 0, l = j[ch][d].length; i < l; i++) {
              if (typeof j[ch][d][i] !== "string") {
                return false;
              }
            }
          } else {
            return false
          }
        }
      }
      return true;
    },

    // LJC check if cookie has been declared and accepted; if not, add it to the site's cookies and present the banner
    declaredAndAccepted: function (widget_cookies_json) {
      if (!_c.cookiesEnabled()) return true;
      var showBanner = false;
      var widget_cookies_accepted = true;

      for (var wcd in widget_cookies_json) {
        for (var i = 0; i < widget_cookies_json[wcd].length; ++i) {
          cname = widget_cookies_json[wcd][i];
          if (!_c.checkConsentedCookies(cname)) {
            showBanner = true;
            widget_cookies_accepted = false;
            if (_c.checkCookieRefused(cname)) {
              showBanner = false;
            }
            if (typeof win.siteCookiesJSON["a"][wcd] === "undefined") {
              win.siteCookiesJSON["a"][wcd] = [cname];
            } else {
              win.siteCookiesJSON["a"][wcd].push(cname); //TODO: only push when cname is not yet in the array
            }
            var el = document.getElementById("validate-consent-" + cname);
            if (el) {
              _c.validateElement(el, cname);
            }
            var stop = false;
            for (var ii = 0; ii <= 20; ii++) {
              el = document.getElementById("validate-consent-" + cname + "-" + ii);
              if (el) {
                stop = false;
                _c.validateElement(el, cname);
              } else {
                if (stop) {
                  break;
                }
                stop = true;
              }
            }
          }
        }
      }
      if (win.bannerDisplayed === false && showBanner === true) {
        _c.showBanner();
      }
      return widget_cookies_accepted;
    },

    // LJC: for each domain and cookie just check if it's contained in the consented cookies string
    checkConsentedCookies: function (name) {
      if (!_c.cookiesEnabled()) return true;
      var ca = win.consentAccepted_String;
      var cacr = win.consentAccepted_String + win.consentRefused_String;
      if (typeof name !== "undefined") {
        var reg = new RegExp(name, "ig");
        if (!ca.match(reg)) return false;
        return true;
      } else {
        var s = win.siteCookiesJSON;
        for (var sd in s["a"]) {
          var rd = new RegExp(sd, "ig");
          if (!cacr.match(rd)) return false;
          for (var i = 0; i < s["a"][sd].length; i++) {
            var rc = new RegExp(s["a"][sd][i], "ig");
            if (!cacr.match(rc)) return false;
          }
        }

        return true;
      }
    },

    // LJC: check if the cookiename is contained in the consent refused string
    checkCookieRefused: function (name) {
      if (!_c.cookiesEnabled()) return true;
      var cr = win.consentRefused_String;
      if (!cr.match(name)) return false;
      return true;
    },

    // LJC: return the no consent message in the page's language
    noConsentMessage: function () {
      return _c.getLabel("noconsent", _c.getDocLang());
    },

    /*
      validateHTML will get elements by id and check if the cookies they create have been accepted.
      The ids are assembled per domain and per cookie and are taken from var consent_required_cookies.
      Id names are preceded by "validate-consent-".
    */
    validateHTML: function () {
      var sc = win.siteCookiesJSON["a"];
      var indi_arr = [];

      for (var scd in sc) {
        indi_arr.push(scd);
        for (var scc in sc[scd]) {
          indi_arr.push(sc[scd][scc]);
        }
      }
      var len = indi_arr.length;
      for (var i = 0; i < len; ++i) {
        var el = document.getElementById("validate-consent-" + indi_arr[i]);
        if (el) {
          _c.validateElement(el, indi_arr[i]);
        }
        var stop = false;
        for (var ii = 0; ii <= 20; ii++) {
          el = document.getElementById("validate-consent-" + indi_arr[i] + "-" + ii);
          if (el) {
            stop = false;
            _c.validateElement(el, indi_arr[i]);
          } else {
            if (stop) {
              break;
            }
            stop = true;
          }
        }
      }

      // render the accept / refuse buttons typicaly used on the cookie notice page.
      var consent_buttons = document.getElementById("cookie-consent-buttons");
      if (typeof consent_buttons !== "undefined" && consent_buttons != null) {
        consent_buttons.innerHTML = '<a class="wt-cck-btn-add" role="button" href="javascript:void(0)">' + _c.getLabel("accept", _c.getDocLang()) + '</a> / <a class="wt-cck-btn-refuse" href="javascript:void(0)">' + _c.getLabel("refuse", _c.getDocLang()) + '</a>';
        _c.initBtnConsent(consent_buttons);
      }

    },

    validateElement: function (el, cookie_spec) {
      if (_c.checkConsentedCookies(cookie_spec)) return;

      el_class = el.className || "";

      if (el_class.match(/consentRefusedCallback-none/)) {
        el.parentNode.removeChild(el);
      } else if (el_class.match(/consentRefusedCallback-/)) {
        el.innerHTML = "";
        el.className += " no-cookie-consent";
        callback = el_class.match(/consentRefusedCallback-([^\s]+)/);
        if (callback) {
          try {
            window[callback[1]](el, win.docLang);
          } catch (e) {
          }
        }

      } else {
        el.innerHTML = _c.getLabel("noconsent", _c.getDocLang());
        el.className += " no-cookie-consent";
      }
    },

    showBanner: function () {

      var h = doc.getElementsByTagName("head")[0],
        i = doc.createElement('link');
      i.setAttribute('type', 'text/css');
      i.setAttribute('rel', 'stylesheet');
      i.setAttribute('href', '//ec.europa.eu/wel/cookie-consent/banner.css');
      h.appendChild(i);

      /*var s = doc.createElement('script');
      s.setAttribute('type', 'text/javascript');
      h.appendChild(s);
      s.setAttribute('src', '//ec.europa.eu/wel/cookie-consent/banner.js');*/

      var lang = win.docLang;
      var cb = document.createElement("div");
      cb.id = "cookie-consent-banner";
      cb.className = "cookie-consent-banner";

      //cb.style.background = "#f1fbff";
      cb.style.border = "1px solid #fff";
      cb.style.lineHeight = "1.5";
      cb.style.padding = "5px 20px 10px";
      cb.style.margin = "0 auto";
      cb.style.fontFamily = "Verdana,Arial,Helvetica,'DejaVu Sans',sans-serif";

      var inner_html = '<h2>' + _c.getLabel("cookies",lang) +'</h2>';
      inner_html += '<p class="cookie-consent-inform">' + _c.getLabel("uses_cookies",lang) + ". ";
      inner_html += _c.getLabel("find_out_more_on",lang) + '<a style="color:#fff" id="cookie-notice" href="' + _c.cookieNoticeUrl() + '" target="_blank">' + _c.getLabel("how_we_use",lang) + "</a>.</p>";
      inner_html += "<div class='cookie-consent-actions' style='margin-right: 20px;'><a class='wt-cck-btn-add' style=\"color:#fff\" href=\"javascript:void(0)\">" + _c.getLabel("accept",lang) + "</a></div><div class='cookie-consent-actions'><a class='wt-cck-btn-refuse' style=\"color:#fff\" href=\"javascript:void(0)\">" + _c.getLabel("refuse",lang) + "</a></div>";
      cb.innerHTML = inner_html;

      var body = document.getElementsByTagName('body')[0];
      body.insertBefore(cb,body.childNodes[0]);

      var globan = document.getElementById("globan");
      if (globan) {
        _c.after(cb, globan);
      }

      _c.initBtnConsent(cb);

      win.bannerDisplayed = true;

    },

    init: function () {

      win.docLang = _c.getDocLang() || "en";

      // LJC: checking if cookies are enabled here.
      // If they are not: 'reload' the page and add a url parameter
      // that can be picked up by the consent server (referrer) so that
      // it simply doesn't block any resources.

      if (!_c.cookiesEnabled()) {
        if (!win.location.search.match(/cookies=disabled/)) {
          if (document.location.search == "") {
            win.location = win.location + "?cookies=disabled";
          } else {
            win.location = win.location + "&cookies=disabled";
          }
        }
        return false;
      }

      if (!win.siteCookiesJSON) {
        return false
      }

      var consent_string = _c.getCookie("eu_cookie_consent") || '{"a":{},"r":{}}';
      var consent_JSON = {};

      try {
        consent_JSON = _c.euJSON.stringToJson(consent_string);
      } catch (e) {
        //if consent_JSON is corrupt, reset the value
        _c.setCookie("eu_cookie_consent", '{"a":{},"r":{}}', 30);
        consent_JSON = _c.euJSON.stringToJson('{"a":{},"r":{}}');
      }

      // if the site cookies JSON does not validate, don't continue
      if (!_c.validateJSON(win.siteCookiesJSON)) return false;

      // if the eu_cookie_consent JSON is not conform, reset its value and continue
      if (!_c.validateJSON(consent_JSON)) {
        _c.setCookie("eu_cookie_consent", '{"a":{},"r":{}}', 30);
        consent_JSON = _c.euJSON.stringToJson('{"a":{},"r":{}}');
      }

      win.consentAccepted_JSON = consent_JSON["a"];
      win.consentRefused_JSON = consent_JSON["r"];
      win.consentAccepted_String = _c.euJSON.jsonToString(consent_JSON["a"]);
      win.consentRefused_String = _c.euJSON.jsonToString(consent_JSON["r"]);

      // validate any html elements indicated by their id 'validate'
      if (doc.addEventListener) {
        doc.addEventListener("DOMContentLoaded", _c.validateHTML, false);
      } else if (doc.attachEvent) {
        doc.attachEvent("onreadystatechange", function () {
          if (/loaded|complete/.test(doc.readyState)) _c.validateHTML();
        })
      }

      // if all cookies are either tagged as accepted or refused don't continue
      if (_c.checkConsentedCookies()) {
        return
      }

      // some cookies have not been accepted or refused: show the banner
      _c.ready(_c.showBanner);

    },

    trigger: function (dom, name, args) {
      var e, v = document.createEvent;
      if (v) {
        e = document.createEvent("HTMLEvents");
        e.initEvent(name, true, true);
      }
      else {
        e = document.createEventObject();
        e.eventType = name;
      }
      e.eventName = name;
      e.parameters = args || false;
      if (v) {
        dom.dispatchEvent(e);
      }
      else {
        dom.fireEvent("on" + e.eventType, e);
      }
    },

    after: function (n, t) {
      var p = t.parentNode;
      (p.lastchild === t) ? p.appendChild(n) : p.insertBefore(n, t.nextSibling);
    },

    ready: function (f) {
      /^(in|com)/.test(document.readyState) ? f() : setTimeout(_c.ready, 0, f);
    },

    consentAdd: function () {
      var h = doc.getElementsByTagName("head")[0], i = doc.createElement('script');
      i.setAttribute('type', 'text/javascript');
      i.setAttribute('src', location.protocol + '//webtools.ec.europa.eu/cookie-consent/consented/yes/');
      h.appendChild(i);

      var consent_banner = doc.getElementById("cookie-consent-banner");
      var s = win.siteCookiesJSON["a"];
      var ca = win.consentAccepted_JSON;
      var cr = win.consentRefused_JSON;

      // opt in to EA
      if (typeof $wt !== "undefined" && typeof $wt.analytics !== "undefined" && typeof $wt.analytics.optIn !== "undefined") {
        $wt.analytics.optIn();
      }

      for (var sd in s) {
        // add to consent accepted
        if (typeof ca[sd] === "undefined") ca[sd] = [];
        for (var sc in s[sd]) {
          if (!_c.inArray(s[sd][sc], ca[sd])) ca[sd].push(s[sd][sc]);
        }
        // remove the whole domain from consent refused
        if (typeof cr[sd] !== "undefined") {
          delete cr[sd];
        }
      }
      newConsentValue = '{"a":' + _c.euJSON.jsonToString(ca) + ',"r":' + _c.euJSON.jsonToString(cr) + "}";
      _c.setCookie("eu_cookie_consent", newConsentValue, 30);

      if (typeof consent_banner !== "undefined" && consent_banner != null) consent_banner.parentNode.removeChild(consent_banner);
      win.bannerDisplayed = false;

      _c.trigger(window,"cck_accepted");

    },

    consentRefuse: function () {
      var h = doc.getElementsByTagName("head")[0], i = doc.createElement('script');
      i.setAttribute('type', 'text/javascript');
      i.setAttribute('src', location.protocol + '//webtools.ec.europa.eu/cookie-consent/consented/no/');
      h.appendChild(i);

      // opt out from EA
      if (typeof $wt !== "undefined" && typeof $wt.analytics !== "undefined" && typeof $wt.analytics.optOut !== "undefined") {
        $wt.analytics.optOut();
      }

      var s = win.siteCookiesJSON["a"];
      var ca = win.consentAccepted_JSON;
      var cr = win.consentRefused_JSON;

      for (var sd in s) {
        // add to consent refused
        if (typeof cr[sd] === "undefined") cr[sd] = [];
        for (var sc in s[sd]) {
          if (!_c.inArray(s[sd][sc], cr[sd])) cr[sd].push(s[sd][sc]);
        }
        // remove the whole domain from consent accepted
        if (typeof ca[sd] !== "undefined") {
          delete ca[sd];
        }
      }
      newConsentValue = '{"a":{},"r":' + _c.euJSON.jsonToString(cr) + "}";
      _c.setCookie("eu_cookie_consent", newConsentValue, null);
      var consent_banner = document.getElementById("cookie-consent-banner");
      if (typeof consent_banner !== "undefined" && consent_banner != null) consent_banner.parentNode.removeChild(consent_banner);
      win.bannerDisplayed = false;

      _c.trigger(window,"cck_refused");

    },

    reset: function () {
      var c = _c.getCookie("eu_cookie_consent");
      setTimeout(function () {
        _c.setCookie("eu_cookie_consent", '{"a":{},"r":{}}', 30);
        if (c == '{"a":{},"r":{}}') {
          return;
        }
        window.location.reload();
      }, 50);
    },

    initBtnConsent: function (container) {
      if (container) {
        var acceptBtn = container.getElementsByClassName('wt-cck-btn-add')[0];
        var refuseBtn = container.getElementsByClassName('wt-cck-btn-refuse')[0];
        acceptBtn.addEventListener("click", _c.consentAdd);
        refuseBtn.addEventListener("click", _c.consentRefuse);
      }
    }

  };

  _c.init();

  win.euCookieConsent = {};
  win.euCookieConsent.accepted = _c.checkConsentedCookies;
  win.euCookieConsent.reset = _c.reset;
  win.euCookieConsent.no_consent_message = _c.noConsentMessage;
  win.euCookieConsent.declaredAndAccepted = _c.declaredAndAccepted;
  win.euCookieConsent.setDocLang = _c.setDocLang;
  win.euCookieConsent.initBtnConsent = _c.initBtnConsent;
  win.euCookieConsent.add = _c.consentAdd;
  win.euCookieConsent.refuse = _c.consentRefuse;

})(window, document);