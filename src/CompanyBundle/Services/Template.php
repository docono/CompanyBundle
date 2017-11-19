<?php

namespace CompanyBundle\Services;


use CompanyBundle\Helper\Config;

class Template {
    const html = 'Template';
    const schema = 'Schema';
    const combined = 'Combined';

    private $templating = null;

    private $standardTemplates = ['full', 'address', 'times', 'socialmedia'];

    /**
     * Template constructor
     *
     * @param $templating
     */
    public function __construct($templating) {
        $this->templating = $templating;
    }

    /**
     * get standard templates
     *
     * @return array
     */
    public function getStandardTemplates() : array {
        return $this->standardTemplates;
    }

    /**
     * check if given template is a standard template
     *
     * @param String $template
     * @return bool
     */
    public function validStandardTemplate(String $template) : bool {
        return (bool)in_array($template, $this->standardTemplates);
    }

    /**
     * get template types
     *
     * @return array
     */
    public function getTypes() : array {
        $reflection = new \ReflectionClass(__CLASS__);
        return array_flip($reflection->getConstants());
    }

    /**
     * check if given type is valid
     *
     * @param String $type
     * @return bool
     */
    public function validType(String $type) : bool {
        return (bool)(self::combined==$type) || (self::html==$type) || (self::schema==$type);
    }

    /**
     * render user specific template
     *
     * @param String $tpl
     * @param String $type
     * @return String
     * @throws \Exception
     */
    public function template(String $tpl, String $type=self::combined) : String {
        //ensure template exists
        if(!$this->templating->exists('@docono.company/'.$type.'/'.$tpl))
            throw new \Exception('unknown template "' . $tpl . '" - predefined templates: [' . implode(', ', $this->getStandardTemplates()) . ']');

        return $this->templating->render('@docono.company/'.$type.'/'.$tpl, Config::getData());
    }

    /**
     * render address template
     *
     * @param String $type
     * @return String
     */
    public function address(String $type=self::combined) : String {
        return $this->templating->render('@docono.company/'.$type.'/address.html.twig', Config::getData());
    }

    /**
     * render times template
     *
     * @param String $type
     * @return String
     */
    public function times(String $type=self::combined) : String {
        return $this->templating->render('@docono.company/'.$type.'/times.html.twig', Config::getData());
    }

    /**
     * render social media html template
     *
     * @return string
     */
    public function socialmedia() : String {
        return $this->templating->render('@docono.company/'.self::html.'/socialmedia.html.twig', Config::getData());
    }

    /**
     * render full template
     *
     * @param String $type
     * @return string
     */
    public function full(String $type=self::combined) : string {
        return $this->templating->render('@docono.company/'.$type.'/full.html.twig', Config::getData());
    }

    /**
     * render full template
     *
     * @return String
     */
    public function __toString() : String {
        return $this->full();
    }

}