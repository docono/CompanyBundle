<?php

namespace docono\Bundle\CompanyBundle;

use Pimcore\Extension\Bundle\AbstractPimcoreBundle;
use Pimcore\Extension\Bundle\Traits\PackageVersionTrait;

class DoconoCompanyBundle extends AbstractPimcoreBundle
{
    use PackageVersionTrait;

    public function getInstaller()
    {
        return $this->container->get('docono.company.installer');
    }

    public function getJsPaths() {
        return [
            '/bundles/doconocompany/js/plugin.js',
	        '/bundles/doconocompany/js/store/country.js',
            '/bundles/doconocompany/js/panel.js',
            '/bundles/doconocompany/js/information/panel.js',
            '/bundles/doconocompany/js/information/form.js',
            '/bundles/doconocompany/js/times/form.js',
            '/bundles/doconocompany/js/seo/form.js'
        ];
    }

    public function getCssPaths() {
        return [
            '/bundles/doconocompany/css/style.css'
        ];
    }

    public function getEditmodeJsPaths() {
        return [];
    }

    protected function getComposerPackageName(): string {
        return 'docono/company-bundle';
    }
}