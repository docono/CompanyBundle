<p translate="no">
    <a href="<?= $schema['url']; ?>" class="company"><?= $company['name']; ?></a>
    <span class="street"><?= $company['address']; ?></span>
    <span class="town"><?= $company['town']; ?></span>
    <span class="postal-code"><?= $company['postalcode']; ?></span>
    <span class="country"><?= $this->t($company['country']); ?></span>
    <span class="phone"><?= $company['phone']; ?></span>
    <a href="mailto:<?= $company['email']; ?>" class="email"><?= $company['email']; ?></a>
</p>