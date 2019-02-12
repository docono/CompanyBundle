<script type="application/ld+json">
{
    "@context": "http://schema.org",
    "@type": "<?= $schema['type']; ?>",
    <?= $this->template('CompanyBundle::/docono_company/partial.address.html.php'); ?>
    "description": "{{ seo[app.request.locale].description }}",
    "name": "<?= $company['name']; ?>",
    "@id": "",
    "url": "<?= $schema['url'] ?>",
    "email":"<?= $company['email'] ?>",
    "phone":"<?= $company['phone'] ?>",
}
</script>