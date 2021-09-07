<ul class="social-media">
<?php
    foreach ($socialmedia as $name => $link):
        if($link == '')
            continue;
?>
    <li class="<?= $name; ?>"><a href="<?= $link; ?>"><i class="fab fa-<?= $name; ?>"></i></a></li>
<?php endforeach; ?>
</ul>