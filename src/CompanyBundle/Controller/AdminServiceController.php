<?php

namespace CompanyBundle\Controller;

use CompanyBundle\Helper\Config;
use Pimcore\Bundle\AdminBundle\Controller\AdminController;
use Pimcore\Bundle\AdminBundle\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Yaml\Yaml;

class AdminServiceController extends AdminController
{

    public function getAction(Request $request) {
        //get site
        $site = $request->query->get('site');
        $site = $site===null? 'default': $site;

        //load data
        $data = Config::getData($site);

        return $this->json(['success'=> true, 'data' => $data]);
    }

    public function updateAction(Request $request)
    {
        try {
            //get all data
            $data = $request->query->all();
            //remove _dc elemnet
            unset($data['_dc']);

            //get site
            $site = $data['site'];
            //remove site element
            unset($data['site']);

            //add times array
            $data['times'] = [];
            //init day array
            $days = array('monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday');

            foreach($days as $day) {
                $data[$day]['closed'] = (bool)(isset($data[$day]['closed']) && ($data[$day]['closed'] == 'on'));
                //add day data to times array
                $data['times'][$day] = $data[$day];
                //remove day data
                unset($data[$day]);
            }

            //generate Yaml
            $yaml = Yaml::dump($data);

            //wrie Yaml file
            file_put_contents(Config::getFileForSite($site), $yaml);
        } catch(\Exception $e) {
            return new JsonResponse(['success'=> false]);
        }

        return new JsonResponse(['success'=> true]);
    }
}