<?php

namespace docono\Bundle\CompanyBundle\Controller\Admin;

use docono\Bundle\CompanyBundle\Helper\Config;
use Pimcore\Bundle\AdminBundle\Controller\AdminAbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Yaml\Yaml;
use Symfony\Component\Routing\Annotation\Route;

/**
 * @Route("/service")
 */
class ServiceController extends AdminAbstractController
{

    /**
     * @Route("/get", name="docono_company_admin_get", methods={"GET"})
     * @param Request $request
     * @return JsonResponseval
     */
    public function getDataAction(Request $request) {
        //get site
        $site = $request->query->get('site');
        $site = $site===null? 'default': $site;

        //load data
        $data = Config::getData($site);

        return $this->json(['success'=> true, 'data' => $data]);
    }

    /**
     * * @Route("/update", name="docono_company_admin_update", methods={"GET"})
     * @param Request $request
     * @return JsonResponse
     */
    public function updateDataAction(Request $request)
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

            if(!is_dir(Config::getPath())) {
                mkdir(Config::getPath());
            }

            //wrie Yaml file
            file_put_contents(Config::getFileForSite($site), $yaml);
        } catch(\Exception $e) {
            return $this->json(['success'=> false]);
        }

        return $this->json(['success'=> true]);
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