<?php

namespace CompanyBundle;

use Pimcore\Extension\Bundle\AbstractPimcoreBundle;
use Pimcore\Extension\Bundle\Traits\PackageVersionTrait;

class CompanyBundle extends AbstractPimcoreBundle
{
    use PackageVersionTrait;

    public function getInstaller()
    {
        return $this->container->get('docono_company.install');
    }

    public function getJsPaths() {
        return [
            '/bundles/company/js/plugin.js',
	        '/bundles/company/js/store/country.js',
            '/bundles/company/js/panel.js',
            '/bundles/company/js/information/panel.js',
            '/bundles/company/js/information/form.js',
            '/bundles/company/js/times/form.js',
            '/bundles/company/js/seo/form.js'
        ];
    }

    public function getCssPaths() {
        return [
            '/bundles/company/css/style.css'
        ];
    }

    public function getEditmodeJsPaths() {
        return [
            '/bundles/company/js/document/tags/company.js',
        ];
    }

    protected function getComposerPackageName(): string {
        return 'docono/company-bundle';
    }
}