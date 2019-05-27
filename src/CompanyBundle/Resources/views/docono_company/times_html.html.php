<table class="opening-hours">
<?php
    foreach($times as $day => $data):
        if((!isset($data['allday_closed']) || !$data['allday_closed'])  && (isset($data['open']) && isset($data['close']))):
?>
    <tr class="<?= $day; ?>">
        <td><?= strtoupper($this->t($day)) ?></td>
        <td><?= $data['open']; ?> - <?= $data['close']; ?> </td>
    </tr>
    <?php if($times['lunchbreak'] && (isset($data['open_pm']) && isset($data['close_pm']))): ?>
    <tr class="<?= $day; ?> afternoon">
        <td></td>
        <td><?= $data['open_pm']; ?> - <?= $data['close_pm']; ?> </td>
    </tr>
    <?php endif; ?>
<?php endif; ?>
<?php endforeach; ?>
</table>
