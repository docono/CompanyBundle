<?php

namespace CompanyBundle\Model\Document\Tag;

use CompanyBundle\Services\Template;

class Company extends \Pimcore\Model\Document\Tag
{
    /**
     * render defined company template
     *
     * @return String
     * @throws \Exception
     */
    public function frontend() {
        //retrieve template service
        $templateService = \Pimcore::getContainer()->get('docono.company.template');
        //get options
        $options = $this->getOptions();
        //get requested tpl
        $tpl = $options['tpl'];
        $type = $options['type'];

        //set full as standard type
        if(!$type)
            $type = Template::combined;

        //ensure type is valid
        if(!$templateService->validType($type))
            throw new \Exception('unknown type "' . $type . '" - valid types: [' . implode(', ', array_flip($templateService->getTypes())) . ']');

        //set full as standard template
        if(!$tpl)
            $tpl = 'full';

        //ensure template is valid
        if($templateService->validStandardTemplate($tpl))
            //render standard template
            return call_user_func(array($templateService, $tpl), $type);

        //render user template
        return $templateService->template($tpl, $type);
    }

    /**
     * @return string
     */
    public function getType()
    {
        return 'company';
    }

    /**
     * Get the current data stored for the element
     * this is used as general fallback for the methods getDataForResource(), admin(), getValue()
     *
     * @return mixed
     */
    public function getData()
    {
        // TODO: Implement getData() method.
    }

    /**
     * Receives the data from the editmode and convert this to the internal data in the object eg. image-id to Asset\Image
     *
     * @param mixed $data
     */
    public function setDataFromEditmode($data)
    {
        // TODO: Implement setDataFromEditmode() method.
    }

    /**
     * Receives the data from the resource, an convert to the internal data in the object eg. image-id to Asset\Image
     *
     * @param mixed $data
     *
     * @return string
     */
    public function setDataFromResource($data)
    {
        // TODO: Implement setDataFromResource() method.
    }
}