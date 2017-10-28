<?php

namespace CompanyBundle;

use Pimcore\Extension\Bundle\Installer\AbstractInstaller;
use Pimcore\Log\Simple;
use Pimcore\Model\Translation\Admin;

class Installer extends AbstractInstaller
{
    private $installSourcesPath;

    public function __construct()
    {
        parent::__construct();

        $this->installSourcesPath = __DIR__ . '/Resources/install';
    }

    public function canBeInstalled()
    {
        return !$this->isInstalled();
    }

    public function install() {
        try {
            $this->importTranslations();

            fopen(__DIR__ . '/installed', 'w');

            return true;
        } catch (Exception $e) {
            Simple::log('docono_company', 'installation failed:' . $e->getMessage());
            return false;
        }
    }

    public function isInstalled()
    {
        return (bool)file_exists(__DIR__ . '/installed');
    }

    public function needsReloadAfterInstall()
    {
        return true;
    }

    public function canBeUninstalled()
    {
        return $this->isInstalled();
    }

    public function uninstall()
    {
        unlink(__DIR__ . '/installed');
    }

    private function importTranslations()
    {
        Admin::importTranslationsFromFile($this->installSourcesPath . '/admin-translations/init.csv', true);
    }
}