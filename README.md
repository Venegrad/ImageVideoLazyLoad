# Image and video lazy load for google page speed

## Instalation

Just include the Lazy.js script before closing the body tag

In order for the picture to be loaded using a lazy.js, you need to add the .lazy class to it. And replace `src` with `data-src`, and insert placeholder (if needed) in `src`. For example:

```
<div>
    <img src="img/placeholder.png" data-src="img/1.jpg" alt="" class="lazy">
</div>

<div>
    <video class="lazy" muted="muted" loop="loop" playsinline="playsinline" data-autoplay="true">
        <source src="img/placeholder.png" data-src="img/eino_video.mp4" type="video/mp4" />
    </video>
</div>

```

The video must have a required `source` tag. And as you can see `autoplay` has been replaced by `data-autoplay`.

## Callback

When the img is loaded, the script will add the `.lazy-loaded` class to it, and the `.lazy-inner-loaded` class to the parent block.

You can style and use it as you like, the basic example is shown in `index.html`.


## Supporting

U dont need any libs for using this lazy script. This script support all browsers, but not ie11 :sad:. In IE11, all pictures will load immediately, ignoring lazy load.

