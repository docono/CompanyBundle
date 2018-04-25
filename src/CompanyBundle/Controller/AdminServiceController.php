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

            $data = $this->gnerateArrayTree($data);

            //ensure lunchbreak is a bool
	        $data['times']['lunchbreak'] = (bool)(isset($data['times']['lunchbreak']) && ($data['times']['lunchbreak'] == 'on'));

            //generate Yaml
            $yaml = Yaml::dump($data);

            //wrie Yaml file
            file_put_contents(Config::getFileForSite($site), $yaml);
        } catch(\Exception $e) {
            return new JsonResponse(['success'=> false]);
        }

        return new JsonResponse(['success'=> true]);
    }

    private function gnerateArrayTree(array $array) {
    	$data = [];

	    foreach($array as $key => $element) {
		    if(preg_match('@(.*)\_(.*)@i', $key, $subKeys)) {
		        if(is_numeric($subKeys[2])) {
			        $data[$subKeys[1]][] = $element;
		        } else {
				    $data[$subKeys[1]][$subKeys[2]] = $element;
			    }
		    } else {
		    	$data[$key] = $element;
		    }
	    }

	   return $data;
    }
}