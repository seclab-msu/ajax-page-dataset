let fsContent = {
    bin: {
        name: "price-spider",
        files: {
            "https://cdn.pricespider.com/1/1750/ps-utid.js": "async",
            "https://cdn.pricespider.com/1/lib/ps-widget.js": "async",
            "https://cdn.pricespider.com/1/lib/2.3.99/ps-widget.js": "",
        },
        enable: true,
        meta: {
            "ps-key": "1750-5db31b2e0a36b30033a103a3",
            country: "US",
            language: "en",
        },
    },
    shopTheStory: {
        scroll: "25",
        title: "SHOP ALL PRODUCTS IN THIS ARTICLE",
        btntext: "Shop Story",
        carouselTitle: "SHOP THE STORY"
    },
    brand: {
        name: 'tresemme',
        locale: 'us',
        language: 'en'
    },
    learnMore: "Learn More",
    buynow: "Buy Now",
};

let fsTheming = {
    env: "PROD",
    tooltip: {
        titlecolor: "#000",
        titlesize: "16px",
        titlesizemobile: "14px",
        titlelineheight: "1.3",
        titleweight: "bold",
        titlefontfamily: "Arial",
        backgroundcolor: "#fff",
        crosscolor: "#000",
    },
    grid: {
        color: "#000",
        backgroundcolor: "#fff",
    },
    shopTheStory: {
        desktopPosition: "60px",
        tabPosition: "80px",
        mobilePosition: "80px",
    },
    buynow: {
        color: "#fff",
        background: "#000",
        size: "14px",
        sizemobile: "12px",
        lineheight: "1",
        weight: "bold",
        fontfamily: "Arial",
        hovercolor: "#000",
        hoverbackground: "#fff",
    },
};

function addScript(src, type, add, defer) {
    var s = document.createElement("script");
    s.setAttribute("src", src);
    // s.setAttribute( 'type', type );
    if (defer)
        s.setAttribute('defer', true);
    if (add)
        s.setAttribute(add, true);
    document.querySelector("body").appendChild(s);
}

['mousemove', 'touchmove'].forEach(function(e) {
    window.addEventListener(e, function() {
        addScript("https://dajiofaemix0d.cloudfront.net/components/build/bundle_v0.1.8.js", "", "", true);
    }, {
        once: true
    });
});
