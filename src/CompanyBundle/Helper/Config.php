<?php

namespace CompanyBundle\Helper;

use Symfony\Component\Yaml\Yaml;

abstract class Config {

    /**
     * @var string
     */
    private static $configPath = PIMCORE_APP_ROOT . '/config/docono_company';

    /**
     * @var array
     */
    private static $data = null;

    /**
     * @return string
     */
    public static function getFile() {
        if(\Pimcore\Model\Site::isSiteRequest()) {
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
    public static function getFileForSite(String $site) {
        return self::$configPath . '.' . $site . '.yml';
    }

    /**
     * @return array
     */
    public static function getData(String $site=null) : array {
        if(self::$data === null) {
            $filePath = !$site? self::getFile(): self::getFileForSite($site);

            if(is_file($filePath)) {
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
    public static function getCompany() : array {
        return self::getData()['company'];
    }

    /**
     * @return array
     */
    public static function getCoordinates() : array {
        return self::getData()['coordinates'];
    }

    /**
     * @return array
     */
    public static function getOpeningtimes() : array {
        return self::getData()['times'];
    }

    /**
     * @return array
     */
    public static function getSocialmedia() : array {
        return self::getData()['socialmedia'];
    }
}