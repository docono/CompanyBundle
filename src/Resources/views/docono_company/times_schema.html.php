<script type="application/ld+json">
{
  "@context": "http://schema.org",
  "@type": "<?= $schema['type'] ?>",
  "name": "<?= $company['name']; ?>",
  <?= $this->template('CompanyBundle::/docono_company/partial.times.html.php'); ?>
}
</script>