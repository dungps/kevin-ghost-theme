window.addEventListener("load", function () {
    var $button = document.getElementById("show_spotify_modal")

    if ($button) {
        $button.addEventListener("click", function () {
            const data = $button.dataset.target
            if (data && data !== "") {
                var $modal = document.getElementById(data)
                if ($modal.classList.contains("hidden")) {
                    $modal.classList.add("block")
                    $modal.classList.remove("hidden")
                } else {
                    $modal.classList.add("hidden")
                    $modal.classList.remove("block")
                }
            }
        })
    }

    var $menuButton = document.getElementById("showNavigation")
    if ($menuButton) {
        $menuButton.addEventListener("click", function () {
            const data = $menuButton.dataset.target
            if (data && data !== "") {
                var $menu = document.getElementById(data)
                if ($menu.classList.contains("hidden")) {
                    $menu.classList.add("block")
                    $menu.classList.remove("hidden")
                } else {
                    $menu.classList.add("hidden")
                    $menu.classList.remove("block")
                }
            }
        })
    }
})
