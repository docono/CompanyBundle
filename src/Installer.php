<?php

namespace docono\Bundle\CompanyBundle;


use Doctrine\DBAL\Migrations\Version;
use Doctrine\DBAL\Schema\Schema;
use Pimcore\Db\ConnectionInterface;
use Pimcore\Extension\Bundle\Installer\AbstractInstaller;
use Pimcore\Log\Simple;
use Pimcore\Tool;
use Pimcore\Model\Translation;
use Pimcore\Model\Translation\Admin;
use Symfony\Component\HttpKernel\Bundle\BundleInterface;
use Pimcore\Extension\Bundle\Installer\InstallerInterface;

class Installer extends AbstractInstaller
{
    private $installSourcesPath;

    public function __construct(BundleInterface $bundle) {
        $this->installSourcesPath = __DIR__ . '/Resources/install';

        parent::__construct($bundle);
    }


    public function install(): void
    {
        $this->installTranslations();

        fopen(PIMCORE_CONFIGURATION_DIRECTORY . '/doconoCompanyBundleInstalled', 'w');
    }

    public function uninstall(): void
    {

    }

    public function isInstalled(): bool
    {
        return file_exists(PIMCORE_CONFIGURATION_DIRECTORY . '/doconoCompanyBundleInstalled');
    }

    public function canBeInstalled(): bool
    {
        return !file_exists(PIMCORE_CONFIGURATION_DIRECTORY . '/doconoCompanyBundleInstalled');
    }

    /**
     * install translations
     * @throws \Exception
     */
    private function installTranslations(): void
    {
        Translation::importTranslationsFromFile($this->installSourcesPath . '/admin-translations/init.csv', Translation::DOMAIN_ADMIN, false, Tool\Admin::getLanguages());
    }

    public function needsReloadAfterInstall(): bool
    {
        return true;
    }
}