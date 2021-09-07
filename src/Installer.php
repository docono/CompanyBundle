<?php

namespace docono\Bundle\CompanyBundle;


use Doctrine\DBAL\Migrations\Version;
use Doctrine\DBAL\Schema\Schema;
use Pimcore\Db\ConnectionInterface;
use Pimcore\Extension\Bundle\Installer\MigrationInstaller;
use Pimcore\Log\Simple;
use Pimcore\Migrations\MigrationManager;
use Pimcore\Model\Translation\Admin;
use Symfony\Component\HttpKernel\Bundle\BundleInterface;

class Installer extends MigrationInstaller
{
    private $installSourcesPath;

    public function __construct(BundleInterface $bundle, ConnectionInterface $connection, MigrationManager $migrationManager) {
        $this->installSourcesPath = __DIR__ . '/Resources/install';

        parent::__construct($bundle, $connection, $migrationManager);
    }


    public function migrateInstall(Schema $schema, Version $version)
    {
        $this->installTranslations();
    }

    public function migrateUninstall(Schema $schema, Version $version)
    {
        // TODO: Implement migrateUninstall() method.
    }

    /**
     * install translations
     * @throws \Exception
     */
    private function installTranslations()
    {
        Admin::importTranslationsFromFile($this->installSourcesPath . '/admin-translations/init.csv');
    }

    public function needsReloadAfterInstall()
    {
        return true;
    }
}