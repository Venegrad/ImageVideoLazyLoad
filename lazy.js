document.addEventListener('DOMContentLoaded', function () {
    var lazyImages = [].slice.call(document.querySelectorAll('img.lazy'));
    var lazyVideos = [].slice.call(document.querySelectorAll("video.lazy"));

    if ('IntersectionObserver' in window) {


        var lazyImageObserver = new IntersectionObserver(function (entries, observer) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    var lazyImage = entry.target;
                    lazyImage.src = lazyImage.dataset.src;
                    entry.target.onload = function() {
                        lazyImage.parentNode.classList.add("lazy-inner-loaded");
                        lazyImage.classList.add("lazy-loaded");
                    }
                    lazyImageObserver.unobserve(lazyImage);
                }
            });
        });

        var lazyVideoObserver = new IntersectionObserver(function (entries, observer) {
            entries.forEach(function (video) {

                if (video.isIntersecting) {
                    for (var source in video.target.children) {
                        var videoSource = video.target.children[source];
                        if (typeof videoSource.tagName === "string" && videoSource.tagName === "SOURCE") {
                            videoSource.src = videoSource.dataset.src;
                        }
                    }

                    video.target.load();

                    video.target.onloadeddata = function() {
                        video.target.play();
                        video.target.classList.remove("lazy");
                        video.target.classList.add("lazy-loaded");
                        video.target.parentNode.classList.add("lazy-inner-loaded");
                    };

                    lazyVideoObserver.unobserve(video.target);
                }
            });
        });

        lazyImages.forEach(function (lazyImage) {
            lazyImageObserver.observe(lazyImage);
        });

        lazyVideos.forEach(function (lazyVideo) {
            lazyVideoObserver.observe(lazyVideo);
        });

    } else {

        lazyImages.forEach(function (lazyImage) {
            lazyImage.src = lazyImage.dataset.src;
            lazyImage.parentNode.classList.add("lazy-inner-loaded");
            lazyImage.classList.add("lazy-loaded");
        });

        lazyVideos.forEach(function (lazyVideo) {
            for (var source in lazyVideo.children) {
                var videoSource = lazyVideo.children[source];
                if (typeof videoSource.tagName === "string" && videoSource.tagName === "SOURCE") {
                    videoSource.src = videoSource.dataset.src;
                    lazyVideo.load();
                    lazyVideo.play();
                    lazyVideo.classList.add("lazy-loaded");
                    lazyVideo.classList.remove("lazy");
                    lazyVideo.parentNode.classList.add("lazy-inner-loaded");
                }
            }
        });
    }

    

});