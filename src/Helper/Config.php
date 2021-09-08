<?php

namespace docono\Bundle\CompanyBundle\Helper;

use Symfony\Component\Yaml\Yaml;

abstract class Config
{

    /**
     * @var string
     */
    private static $configPath = PIMCORE_CONFIGURATION_DIRECTORY . '/docono_company/';

    /**
     * @var array
     */
    private static $data = null;

    public static function getPath(): string
    {
        return self::$configPath;
    }

    /**
     * @return string
     */
    public static function getFile()
    {
        if (\Pimcore\Model\Site::isSiteRequest()) {
            $site = 'site_' . \Pimcore\Model\Site::getCurrentSite()->getId();
        } else {
            $site = 'default';
        }

        return self::getFileForSite($site);
    }

    /**
     * @param String $site
     * @return string
     */
    public static function getFileForSite(string $site)
    {
        return self::$configPath . 'company.' . $site . '.yml';
    }

    /**
     * @return array
     */
    public static function getData(string $site = null): array
    {
        if (self::$data === null) {
            $filePath = !$site ? self::getFile() : self::getFileForSite($site);

            if (is_file($filePath)) {
                self::$data = Yaml::parse(file_get_contents($filePath));
            } else {
                return [];
            }
        }

        return self::$data;
    }

    /**
     * @return array
     */
    public static function getCompany(): array
    {
        return self::getData()['company'];
    }

    /**
     * @return array
     */
    public static function getSocialmedia(): array
    {
        return self::getData()['socialmedia'];
    }

    /**
     * @return array
     */
    public static function getOpeningtimes(): array
    {
        return self::getData()['times'];
    }

    /**
     * @return array
     */
    public static function getholidays(): array
    {
        return self::getData()['holiday'];
    }

    /**
     * @param string $langauge
     * @return mixed
     */
    public static function getSEO(string $langauge = 'en')
    {
        return self::getData()['seo'][$langauge];
    }

    /**
     * @return array
     */
    public static function getSchema(): array
    {
        return self::getData()['schema'];
    }

    /**
     * @return array
     */
    public static function getLocation(): array
    {
        return self::getData()['location'];
    }

    /**
     * @return array
     */
    public static function getAccounts(): array
    {
        return self::getData()['accounts'];
    }
}