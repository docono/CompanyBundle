"openingHoursSpecification": [
<?php
foreach($times as $day => $data):
    if((!isset($data['closed']) || !$data['closed'])  && (isset($data['open']) && isset($data['close']))):
?>
    {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": "http://schema.org/<?= strtoupper($day); ?>",
        "opens":  "<?= $data['open']; ?>"
        "closes":  "<?= $data['close']; ?>",
    },
        <?php if($times['lunchbreak'] && (isset($data['open_pm']) && isset($data['close_pm']))): ?>
        {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": "http://schema.org/<?= strtoupper($day); ?>",
        "opens":  "<?= $data['open_pm']; ?>"
        "closes":  "<?= $data['close_pm']; ?>",
    },
    <?php endif; ?>
    <?php endif; ?>
<?php
endforeach;

if(isset($holiday)):
    foreach($holiday as $data):
?>
    {
        "@type": "OpeningHoursSpecification",
        "opens":  "00:00"
        "closes":  "00:00",
        "validFrom": "<?= $data['start']; ?>",
        "validThrough": "<?= $data['end']; ?>"
    },
<?php
    endforeach;
endif;
?>
],