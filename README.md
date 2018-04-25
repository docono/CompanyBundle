# DOCONO.io Company Bundle
![interface](https://docono.io/companyBundle/interface_v1_2.jpg)

* [Description](#getting-started)
* [Configuration File](#configuration-file)
* [Templates](#templates)
* [Rendering Templates](#rendering-templates)
* [Configuration Helper](#configuration-helper)

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

#### new in v1.2
- new tab organisation
- add holidays to the opening hours
- edit site description & keywords based on the site language
- new template handling

<a name="getting-started"/>

##Getting Started

* download bundle with Composer ```"docono/company-bundle": "^1.2"```
* install the Bundle in the Extension Management Tool in Pimcore
* make sure the cache is flushed and Pimcore reloaded
* open the "Company Information" panel and fill in the company details
* add ```<?= $this->company('demoInformations'); ?>``` to your view
* your page will show now all contact details and added a Schema.org JSON-LD to the markup

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
    phone: '+41000000'
    fax: '+41000000'
    email: hello@docono.io
socialmedia:
    linkedin: 'https://www.linkedin.com/company/docono/'
    xing: ''
    facebook: 'http://www.facebook.com/docono.io'
    googleplus: ''
    twitter: ''
    instagram: 'http://www.instagram.com/docono.io'
    pinterest: ''
    youtube: ''
    vimeo: ''
times:
    lunchbreak: true
    monday: { open: '09:00', close: '10:00', open_pm: '13:00', close_pm: '16:00' }
    tuesday: { open: '09:00', close: '10:00', open_pm: '13:00', close_pm: '16:00' }
    wednesday: { open: '09:00', close: '10:00', open_pm: '13:00', close_pm: '16:00' }
    thursday: { open: '09:00', close: '10:00', open_pm: '13:00', close_pm: '16:00' }
    friday: { closed: 'on' }
    saturday: { closed: 'on' }
    sunday: { closed: 'on' }
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
location:
    lat: '47.050168'
    long: '8.309307'
    link: 'https://goo.gl/maps/CPzgDp35bS52'
```

<a name="templates"/>

## Templates
CompanyBundle uses the Twig template engine.

## Types
There are three different kind of templates: html, schema and combined.

Each typ has its own folder for the templates, which are defined in the Template Service as constants.
```php
\CompanyBundle\Services\Template::html
\CompanyBundle\Services\Template::schema
\CompanyBundle\Services\Template::combined
```

### Overriding
If you do not like the standard templates simply override it with a template in the app template dir `app/Resources/views'.

#### example
To override the address HTML template (`address_html.html.twig`) create following file:
`app/Resources/views/docono_company/address_html.html.twig`

To override the address Schema.org template (`address_schema.html.twig`) create following file:
`app/Resources/views/docono_company/address_schema.html.twig`

### Custom Template
To use your own template simply create your template in a folder the views dir.

#### example
To build your own Stemplate creat following file:
`app/Resources/views/myTemplates/demo.html.twig`

Implementing it into your view:
```php
<?= $this->company('demoTemplate', ['tpl'=>'myTemplates/demo.html.twig']); ?>
```


<a name="rendering-templates"/>

## Rendering Templates

Template options:
* address         [only address]
* times           [only opening times]
* socialmedia     [only social media] (fontawesome ready)
* full            [all information]
* template        [using your customised template]

Type options:
* html  [only HTML]
* schema    [only Schema.org JSON-LD]
* combined  [HTML and JSON-LD]

### Document Tag
#### configuration

| Name               | Type    | Configuration                                                                                               |
|--------------------|---------|-------------------------------------------------------------------------------------------------------------|
| `tpl`              | string  | standard template name or path - default: `full`                                                            |
| `type`             | string  | only for standard templats needed, e.g.: `\CompanyBundle\Services\Template::html` - default: `combined`     |
 
#### basic usage
```php
<?= $this->company('demoInformations'); ?>
```


#### advanced usage
```php
<?= $this->company('demoInformations', ['tpl'=>'address', 'type'=>\CompanyBundle\Services\Template::html]); ?>
```

### Template Service
The Template Render Service is registered as `docono.company.template`

#### Methods

| Name                                                   | Return   | Description                                |
|--------------------------------------------------------|----------|--------------------------------------------|
| `template(String $tpl)`                                | string   | render custom template                     |
| `address(String $type=self::combined)`                 | string   | render standard address template           |
| `times(String $type=self::combined)`                   | string   | render standard times template             |
| `socialmedia()`                                        | string   | render standard social media html template |
| `full(String $type=self::combined)`                    | string   | render standard full template              |
| `__toString()`                                         | string   | full() alias                               |


#### basic usage
```php
<?= $this->container->get('docono.company.template'); ?>
```

#### advanced usage
```php
<?= $this->container->get('docono.company.template')->address(\CompanyBundle\Services\Template::combined); ?>
<?= $this->container->get('docono.company.template')->template('myTemplates/demo.html.twig'); ?>
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



```php
<?= CompanyBundle\Helper\Config::getCompany()['name']; ?>
<?= CompanyBundle\Helper\Config::getData()['socialmedia']['facebook']; ?>
```