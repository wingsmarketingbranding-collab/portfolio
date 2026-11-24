
document.addEventListener("DOMContentLoaded", () => {

    // MOBILE MENU

    const menuToggle = document.getElementById("menuToggle");
    const navigation = document.getElementById("navigation");
    const navLinks = document.querySelectorAll(".nav-link");

    function closeMenu() {
        navigation.classList.remove("open");
        menuToggle.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
    }

    menuToggle.addEventListener("click", () => {

        const isOpen = navigation.classList.toggle("open");

        menuToggle.classList.toggle("open", isOpen);

        menuToggle.setAttribute(
            "aria-expanded",
            String(isOpen)
        );

    });


    // CLOSE MENU AFTER SELECTING NAVIGATION LINK

    navLinks.forEach(link => {

        link.addEventListener("click", () => {

            navLinks.forEach(item => {
                item.classList.remove("active");
            });

            link.classList.add("active");

            closeMenu();

        });

    });


    // CLOSE MENU WHEN CLICKING OUTSIDE

    document.addEventListener("click", event => {

        if (
            !navigation.contains(event.target) &&
            !menuToggle.contains(event.target)
        ) {
            closeMenu();
        }

    });


    // CLOSE MENU WITH ESCAPE KEY

    document.addEventListener("keydown", event => {

        if (event.key === "Escape") {
            closeMenu();
        }

    });


    // CLOSE MOBILE MENU ON DESKTOP RESIZE

    window.addEventListener("resize", () => {

        if (window.innerWidth > 767) {
            closeMenu();
        }

    });


    // ACTIVE NAVIGATION WHILE SCROLLING

    const sections = document.querySelectorAll(
        "section[id], footer[id]"
    );

    let ticking = false;

    function updateActiveNavigation() {

        const scrollPosition = window.scrollY + 150;
        let currentSection = "home";

        sections.forEach(section => {

            if (scrollPosition >= section.offsetTop) {
                currentSection = section.id;
            }

        });

        if (
            window.innerHeight + window.scrollY >=
            document.documentElement.scrollHeight - 10
        ) {
            currentSection = "contact";
        }

        navLinks.forEach(link => {

            link.classList.toggle(
                "active",
                link.getAttribute("href") === "#" + currentSection
            );

        });

        ticking = false;
    }

    window.addEventListener("scroll", () => {

        if (!ticking) {

            window.requestAnimationFrame(
                updateActiveNavigation
            );

            ticking = true;

        }

    }, { passive: true });


    // AUTOMATIC COPYRIGHT YEAR

    const year = document.getElementById("year");

    if (year) {
        year.textContent = new Date().getFullYear();
    }

    updateActiveNavigation();

});
