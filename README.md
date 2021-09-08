# DOCONO.io Company Bundle
![interface](https://docono.io/companyBundle/interface_v1_2.jpg)

* [Description](#getting-started)
* [Configuration File](#configuration-file)
* [Configuration Helper](#configuration-helper)
* [Example](#example)

## Description
The Company Bundle provides to the backend user a simplified management panel to edit all important company information such as:
* address details
* opening hours
* social media links
* Schema.org details
* business location coordinates

The Bundle includes also HTML and Schema.org templates which easily be extended and implemented with a Pimcore Document Tag.

included translations
- German (v1.0.0)
- English (v1.0.0)
- Ukrainian (v1.0.1) thanks to Olya Batyr
- Russian (v1.0.1) thanks to Olya Batyr

#### new in v2
- Pimcore 10 ready
- removed templates
- removed the doucment tag

#### new in v1.4
- document tag adjustment for the latest Pimcore version

#### new in v1.3
- Pimcore 6 ready

#### new in v1.2.2
- removed Google+ from socialmedias
- added Metatag accounts (Twitter & Facebook)

#### new in v1.2.1
- opening times bugfix (closing times)
- opening times UX improvements

DO CHECK YOUR TIMES AFTER UPDATE!

#### new in v1.2.0
- replaced Twig templates with PHP templates
- caching

#### new in v1.1.1
- added VAT number field
- added company founding information fields
- added VKontakte, Medium & Reddit to the social media channels
- translation fixes
- style fixes


#### new in v1.1.0
- new tab organisation
- add holidays to the opening hours
- edit site description & keywords based on the site language
- new template handling

<a name="getting-started"/>

##Getting Started

* download bundle with Composer ```"docono/company-bundle": "^1.1"```
* install the Bundle in the Extension Management Tool in Pimcore
* make sure the cache is flushed and Pimcore reloaded
* open the "Company Information" panel and fill in the company details
* assign data to the view in your controller ```$this->twig->addGlobal('companyInfo', Config::getData($siteID));```

<a name="configuration-file"/>

## Configuration File

Each site has its own YAML configuration file which is located in the app config folder `/app/config`.

#### site ids
The Bundle uses the Pimcore site ids:

* default: the main site 
* site_1: site with the id 1
* site_2: site with the id 2
* etc

#### example
`/app/config/docono_company.default.yml`
`/app/config/docono_company.site_1.yml`

#### config YAML
```yml
company:
    name: DOCONO
    address: 'Bahnhofstrasse 8'
    town: Alpnach
    postalcode: '6055'
    region: OW
    country: CH
    phone: '+41 XX XXX XX XX' 
    fax: '+41 41 670 01 70'
    email: hello@docono.io
    vat-number: ''
socialmedia:
    linkedin: 'https://www.linkedin.com/company/docono/'
    xing: ''
    facebook: 'http://www.facebook.com/docono.io'
    vk: ''
    twitter: ''
    instagram: 'http://www.instagram.com/docono.io'
    pinterest: ''
    youtube: ''
    vimeo: ''
    medium: ''
    reddit: ''
times:
    lunchbreak: true
    monday: { open: '09:00', close: '11:30', open_pm: '13:00', close_pm: '16:00' }
    tuesday: { open: '09:00', close: '11:30', open_pm: '13:00', close_pm: '16:00' }
    wednesday: { open: '09:00', close: '11:30', open_pm: '13:00', close_pm: '16:00' }
    thursday: { open: '09:00', close: '11:30', open_pm: '13:00', close_pm: '16:00' }
    friday: { open: '09:00', close: '11:30', open_pm: '13:00', close_pm: '16:00' }
    saturday: { allday_closed: 'on' }
    sunday: { allday_closed: 'on' }
holiday:
    - { name: 'Easter weekend', start: 30.03.2018, end: 02.04.2018 }
    - { name: 'Christmas & New Year', start: 21.12.2018, end: 06.01.2019 }
seo:
    en: { description: 'site description', keywords: 'keywords, metakeywords' }
    de: { description: 'Seitenbeschreibung', keywords: 'keywords, metakeywords' }
schema:
    type: LocalBusiness
    subtype: ''
    url: 'https://docono.io'
    logo: /var/assets/logo/DOCONO-logo.jpg
    image: /var/assets/logo/DOCONO-logo.jpg
    founder-name: ''
    founding-date: '2017'
    founding-town: 'Alpnach Dorf'
location:
    lat: '47.050168'
    long: '8.309307'
    link: 'https://goo.gl/maps/CPzgDp35bS52'
accounts:
    twitter-site: 'docono'
    twitter-creator: 'docono'
    facebook-publisher: 'https://www.facebook.com/docono.io/'
    facebook-author: 'https://www.facebook.com/docono.io/'
    facebook-app-id: ''

```


<a name="configuration-helper"/>

## Configuration Helper
If you want to access any of the company information data, simply use the STATIC config helper to access them.

`CompanyBundle\Helper\Config`


| Name                            | Return  | Description                            |
|---------------------------------|---------|----------------------------------------|
| `getFile()`                     | string  | get YAML config file for current site  |
| `getFileForSite(String $site)`  | string  | get YAML config file for given site id |
| `getData(String $site=null)`    | array   | array of all data                      |
| `getCompany()`                  | array   | array of the 'company' namespace       |
| `getSocialmedia()`              | array   | array of the 'socialmedia' namespace   |
| `getOpeningtimes()`             | array   | array of the 'times' namespace         |
| `getHolidays()`                 | array   | array of the 'holiday' namespace       |
| `getSEO(string $language='en')` | array   | array of the 'seo' namespace           |
| `getSchema()`                   | array   | array of the 'schema' namespace        |
| `getLocation()`                 | array   | array of the 'location' namespace      |
| `getAccounts()`                 | array   | array of the 'accounts' namespace      |


<a name="example"/>

## Example
```php
        if (Site::isSiteRequest()) {
            $companyData = Config::getData();

        } else {
            $site = Pimcore\Tool\Frontend::getSiteForDocument($this->document);
            $siteID = !$site ? 'default' : 'site_' . $site->getId();
            $companyData = Config::getData($siteID);
        }

        $this->twig->addGlobal('companyInfo', $companyData);
```
