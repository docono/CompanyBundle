<?php

namespace CompanyBundle\Services;


use CompanyBundle\Helper\Config;

class Template {
    const html = 'html';
    const schema = 'schema';
    const combined = 'combined';

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
     * @return String
     * @throws \Exception
     */
    public function template(String $tpl) : String {
        //ensure template exists
        if(!$this->templating->exists('@docono.company/'.$tpl))
            throw new \Exception('could not find template "' . $tpl . '""');

        return $this->templating->render('@docono.company/' . $tpl, Config::getData());
    }

    /**
     * render address template
     *
     * @param String $type
     * @return String
     */
    public function address(String $type=self::combined) : String {
    	return $this->template('docono_company/address_' . $type . '.html.twig');
    }

    /**
     * render times template
     *
     * @param String $type
     * @return String
     */
    public function times(String $type=self::combined) : String {
	    return $this->template('docono_company/times_' . $type . '.html.twig');
    }

    /**
     * render social media html template
     *
     * @return string
     */
    public function socialmedia() : String {
	    return $this->template('docono_company/socialmedia.html.twig');
    }

    /**
     * render full template
     *
     * @param String $type
     * @return string
     */
    public function full(String $type=self::combined) : string {
	    return $this->template('docono_company/full_' . $type . '.html.twig');
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