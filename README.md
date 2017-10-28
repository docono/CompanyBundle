# DOCONO.io Company Bundle
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

<a name="getting-started"/>

##Getting Started

* download bundle with Composer ```"docono/company-bundle": "^1.0"```
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
    email: hello@docono.io
    description: 'DOCONO | Inter-Web Freelancers'
socialmedia:
    linkedin: ''
    xing: ''
    facebook: 'http://www.facebook.com/docono.io'
    googleplus: ''
    twitter: ''
    instagram: 'http://www.instagram.com/docono.io'
    pinterest: ''
    youtube: ''
    vimeo: ''
schema:
    type: ''
    subtype: ''
    url: 'https://docono.io/'
    logo: /var/assets/logo.png
    image: /var/assets/tester/dee1.jpg
coordinates:
    lat: '47.05'
    long: '8.30'
    hasmap: 'https://goo.gl/maps/CPzgDp35bS52'
times:
    monday: { open: '08:00', close: '15:00', closed: false }
    tuesday: { open: '09:00', close: '15:00', closed: false }
    wednesday: { open: '09:00', close: '15:00', closed: false }
    thursday: { open: '09:00', close: '15:00', closed: false }
    friday: { open: '09:00', close: '15:00', closed: false }
    saturday: { closed: true }
    sunday: { closed: true }
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
To overriding the address HTML template (`address.html.twig`) create following file:
`app/Resources/views/Template/address.html.twig`

### Custom Template
To use your own template simply create your template in one of the defined type folders.

#### example
To build your own Schema.org template creat following file:
`app/Resources/views/Schema/mySchema.html.twig`

Implementing it into your view:
```php
<?= $this->company('demoSchema', ['tpl'=>'mySchema.html.twig', 'type'=>\CompanyBundle\Services\Template::schema]); ?>
```


<a name="rendering-templates"/>

## Rendering Templates

Template options:
* address   [only address]
* times     [only opening times]
* full      [all information]
* template  [using your customised template]

Type options:
* Template  [only HTML]
* Schema    [only Schema.org JSON-LD]
* Combined  [HTML and JSON-LD]

### Document Tag
#### configuration

| Name               | Type    | Configuration                                                                                                           |
|--------------------|---------|-------------------------------------------------------------------------------------------------------------------------|
| `tpl`              | string  | `address`, `times`, `full` or tpl path                                                                                        |
| `type`             | string  | use service const for type configuration (html, schema, combined) e.g.: `\CompanyBundle\Services\Template::html` |

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

| Name                                                   | Return   | Description                        |
|--------------------------------------------------------|----------|------------------------------------|
| `template(String $tpl, String $type=self::combined)`   | string   | render custom template             |
| `address(String $type=self::combined)`                 | string   | render standard address template   |
| `times(String $type=self::combined)`                   | string   | render standard times template     |
| `full(String $type=self::combined)`                    | string   | render standard full template      |
| `__toString()`                                         | string   | full() alias                       |


#### basic usage
```php
<?= $this->container->get('docono.company.template'); ?>
```

#### advanced usage
```php
<?= $this->container->get('docono.company.template')->address(\CompanyBundle\Services\Template::combined); ?>
<?= $this->container->get('docono.company.template')->template('Template/myAddress.html.twig', \CompanyBundle\Services\Template::schema); ?>
```

<a name="configuration-helper"/>

## Configuration Helper
If you want to access any of the company information data, simply use the STATIC config helper to access them.

`CompanyBundle\Helper\Config`


| Name                           | Return  | Description                            |
|--------------------------------|---------|----------------------------------------|
| `getFile()`                    | string  | get YAML config file for current site  |
| `getFileForSite(String $site)` | string  | get YAML config file for given site id |
| `getData(String $site=null)`   | array   | array of all data                      |
| `getCompany()`                 | array   | array of the 'company' namespace       |
| `getCoordinates()`             | array   | array of the 'coordinates' namespace   |
| `getOpeningtimes()`            | array   | array of the 'times' namespace         |
| `getSocialmedia()`             | array   | array of the 'socialmedia' namespace   |

```php
<?= CompanyBundle\Helper\Config::getCompany()['name']; ?>
<?= CompanyBundle\Helper\Config::getData()['socialmedia']['facebook']; ?>
```