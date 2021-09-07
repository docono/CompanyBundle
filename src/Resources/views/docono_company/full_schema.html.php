<script type="application/ld+json">
  {
    "@context": "http://schema.org",
    "@type": "<?= $schema['type']; ?>",
    "additionalType": "<?= $schema['subtype']; ?>",
    "name": "<?= $company['name']; ?>",
    "description": "<?= $seo[$this->getLocale()]['description']; ?>",
    "@id": "",
    "url": "<?= $schema['url']; ?>",
    "email":"<?= $company['email']; ?>",
    "phone":"<?= $company['phone']; ?>",
    "logo": "<?= $schema['logo']; ?>",
    "image": "{{ schema.image }}",
    "hasMap": "<?= $location['link']; ?>",
    <?= $this->template('CompanyBundle::/docono_company/partial.address.html.php'); ?>

    "geo": {
      "@type": "GeoCoordinates",
   	  "latitude": "<?= $location['lat']; ?>",
      "longitude": "<?= $location['long']; ?>"
    },
    <?= $this->template('CompanyBundle::/docono_company/partial.times.html.php'); ?>
    "sameAs": [
    <?php
      foreach($socialmedia as $media):
        if($media == '')
          continue;
    ?>
        "<?= $media; ?>",
    <?php endforeach; ?>
    ]
  }
</script>
