var JQZOOM_OPTIONS = {
    zoomType: "innerzoom",
    preloadImages: false,
    title: false
};
var maxMenuHt = "";
$(function () {
    $.belowthefold = function (e, t) {
        var n = $(window).height() + $(window).scrollTop();
        return n <= $(e).offset().top - t.threshold;
    };
    $.abovethetop = function (e, t) {
        var n = $(window).scrollTop();
        return n >= $(e).offset().top + $(e).height() - t.threshold;
    };
    $.rightofscreen = function (e, t) {
        var n = $(window).width() + $(window).scrollLeft();
        return n <= $(e).offset().left - t.threshold;
    };
    $.leftofscreen = function (e, t) {
        var n = $(window).scrollLeft();
        return n >= $(e).offset().left + $(e).width() - t.threshold;
    };
    $.inviewport = function (e, t) {
        return !$.rightofscreen(e, t) && !$.leftofscreen(e, t) && !$.belowthefold(e, t) && !$.abovethetop(e, t);
    };
    $.extend($.expr[":"], {
        "below-the-fold": function (e, t, n) {
            return $.belowthefold(e, {
                threshold: 0
            });
        },
        "above-the-top": function (e, t, n) {
            return $.abovethetop(e, {
                threshold: 0
            });
        },
        "left-of-screen": function (e, t, n) {
            return $.leftofscreen(e, {
                threshold: 0
            });
        },
        "right-of-screen": function (e, t, n) {
            return $.rightofscreen(e, {
                threshold: 0
            });
        },
        "in-viewport": function (e, t, n) {
            return $.inviewport(e, {
                threshold: 0
            });
        }
    });
    $.fn.slideFadeToggle = function (e, t, n) {
        return this.animate({
            opacity: "toggle",
            height: "toggle"
        }, e, t, n);
    };
    if ($("#TopMenu .ph").text().length > 0) {
        $("#Header .phoneIcon").text($("#TopMenu .ph").text());
        $("#Header .phoneIcon").attr("href", "tel:" + $("#TopMenu .ph").text());
    } else {
        $("#Header .ph-no").hide();
    }
    $("#TopMenu .ph").hide();

    // ============ Side Drawer Menu ============
    $(".topNav").addClass("off-screen");
    $("#Container, .nav-area").addClass("on-screen");

    function toggleMenu(e){
        if (e.hasClass("off-screen")) {
            e.toggleClass("off-screen").toggleClass("on-screen");
        }else if (e.hasClass("on-screen")) {
            e.toggleClass("on-screen").toggleClass("off-screen");
        }
        e.toggleClass("animate");
        setTimeout(function(){
           e.toggleClass("animate"); 
        },350);
    }

    $(".showMenu").click(function () {

        toggleMenu($("#Container, .nav-area"));
        if ($("#Container, .nav-area").hasClass("off-screen")) {
            $(".topNav").removeClass("off-screen").addClass("on-screen");
        } else {
            $(".topNav").addClass("off-screen").removeClass("on-screen");

        }
        $(this).removeClass("nav-active");

        if ($(".topNav").hasClass("off-screen")) {
            $(this).removeClass("nav-active");
        } else {
            $(this).addClass("nav-active");
        }

        //Force a repaint of the container div to get around issue on Android where the offscreen nav in certain situations don't appear
        //A consistently reproducable situation is in the product detail page, using Samsung galaxy s3
        $("#Container").css('display', 'none').height()
        $("#Container").css('display', '');
    });

    // ============ Currency Selector ============
    var selectedCurrency = $(".CurrencyList .Sel").children().clone();
    $(".CurrencyList").before("<a href='#' class='currency-selector'><span class='more-icon fa fa-chevron-down pull-right'></span></a>");
    $(".currency-selector").prepend(selectedCurrency).addClass("closed");
    $(".currency-selector.closed").siblings(".CurrencyList").hide();

    $(".currency-selector").click(function(){
        $(this).toggleClass("closed");
        toggleChevron(".more-icon");
        if ($(this).siblings(".CurrencyList").is(":visible")) {
            $(this).siblings(".CurrencyList").hide();
        } else {
            $(this).siblings(".CurrencyList").show(0,function(){
                $(".topNav").scrollTop($(".topNav")[0].scrollHeight);
            });
        }
    });
    

    $(".show-newsletter").click(function () {
        if ($(this).siblings("#SideNewsletterBox").is(":visible")) {
            $(this).siblings("#SideNewsletterBox").slideUp();
        } else {
            $(this).siblings("#SideNewsletterBox").slideDown();
        }
    });
    $("#tab-create-new").click(function () {
        if ($(".CreateAccount").is(":visible")) {
            $(".CreateAccount").slideUp();
        } else {
            $(".CreateAccount").slideDown();
        }
    });
    $("#tab-create-return").click(function () {
        if ($(".AccountLogin").is(":visible")) {
            $(".AccountLogin").slideUp();
        } else {
            $(".AccountLogin").slideDown();
        }
    });
    if ($(".ProductList li .product-title").length > 0) {
        $(".ProductList li .product-title").each(function () {
            var e = function (e, t, n) {
                if (e.length <= t) return e;
                n = n || "...";
                var r = n.length,
                    i = t - r,
                    s = Math.ceil(i / 2),
                    o = Math.floor(i / 2);
                return e.substr(0, s) + n + e.substr(e.length - o);
            };
            $(this).children("strong").children("a").text(e($(this).children("strong").children("a").text(), 50));
        });
    }
    $(".prodPage .Panel > div").hide();
    $(".prodPage .Panel > h3").click(function () {
        if ($(this).parent().hasClass("current")) {
            $(this).next("div").slideUp({
                duration: 400,
                easing: "easeInSine",
                complete: function () {
                    $(this).parent().removeClass("current");
                }
            });
        } else {
            $(this).next("div").slideToggle({
                duration: 400,
                easing: "easeInSine",
                complete: function () {
                    $(this).parent().toggleClass("current");
                    var e = $(this).parent().children("h3").is(":in-viewport");
                    if (e == false) {
                        var t = $(this).parent().children("h3").offset().top;
                        $("html, body").animate({
                            scrollTop: t - 40
                        }, 600);
                    }
                }
            });
        }
        return false;
    });
    $(".FindByCategory li").prepend('<i class="fa fa-chevron-right"></i>');
    if ($("#cart-amount").children(".Block").length > 0) {
        var e = $("#cart-amount").html();
        var t = $(e).find(".total strong").html();
        var n = $(e).find(".item strong").html();
        $(".mainNavi .Cart .total").html(n);
    }
    if ($(".cart-amnt").length > 0) {
        $(".cart-amnt em").html(t);
        $(".cart-amnt span").html(n + " items");
        $(".cart-amnt").removeClass("cEmpty");
    }
    if ($("select").length > 0) {
        $("select").uniform();
    }
    if ($("input[type=file]").length > 0) {
        $("input[type=file]").uniform();
    }
    if ($('input[type="checkbox"]').length > 0) {
        $('input[type="checkbox"]').not(".productOptionPickListSwatch input, .productOptionViewRectangle input").uniform();
    }
    if ($('input[type="radio"]').length > 0) {
        $('input[type="radio"]').not(".productOptionPickListSwatch input, .productOptionViewRectangle input").uniform();
    }
    $("a[href='#anchorTop']").click(function () {
        $("html, body").animate({
            scrollTop: 0
        }, "slow");
        return false;
    });
    $("html.touch #search_query").click(function () {
        $("html, body").animate({
            scrollTop: 0
        }, 0);
        $(".nav-area").css("position", "absolute");
    });
    $("html.touch #search_query").blur(function () {
        $(".nav-area").removeAttr("style");
    });

    /*
        This block of code removes active state from links if the user moves the screen
        It does it by detaching the active link from the dom, then retaching it, which seems to remove the active state from the element.
    */
    (function(){
        /*
        Throttle and debounce lifted from lodash.
        TODO: remove these if we ever include a library to do these things (underscore or lodash)
        */
        var debounceOptions = {
            'leading': false,
            'maxWait': 0,
            'trailing': false
        };
        var now = function() {
            return new Date().getTime();
        };
        function throttle(func, wait, options) {
            var leading = true,
                trailing = true;

            if (options === false) {
                leading = false;
            } else if (isObject(options)) {
                leading = 'leading' in options ? options.leading : leading;
                trailing = 'trailing' in options ? options.trailing : trailing;
            }
            debounceOptions.leading = leading;
            debounceOptions.maxWait = wait;
            debounceOptions.trailing = trailing;

            return debounce(func, wait, debounceOptions);
        }

        function debounce(func, wait, options) {
            var args,
                maxTimeoutId,
                result,
                stamp,
                thisArg,
                timeoutId,
                trailingCall,
                lastCalled = 0,
                maxWait = false,
                trailing = true;

            wait = Math.max(0, wait) || 0;
            if (options === true) {
                var leading = true;
                trailing = false;
            } else if (isObject(options)) {
                leading = options.leading;
                maxWait = 'maxWait' in options && (Math.max(wait, options.maxWait) || 0);
                trailing = 'trailing' in options ? options.trailing : trailing;
            }
            var delayed = function() {
                var remaining = wait - (now() - stamp);
                if (remaining <= 0) {
                    if (maxTimeoutId) {
                        clearTimeout(maxTimeoutId);
                    }
                    var isCalled = trailingCall;
                    maxTimeoutId = timeoutId = trailingCall = undefined;
                    if (isCalled) {
                        lastCalled = now();
                        result = func.apply(thisArg, args);
                        if (!timeoutId && !maxTimeoutId) {
                            args = thisArg = null;
                        }
                    }
                } else {
                    timeoutId = setTimeout(delayed, remaining);
                }
            };

            var maxDelayed = function() {
                if (timeoutId) {
                    clearTimeout(timeoutId);
                }
                maxTimeoutId = timeoutId = trailingCall = undefined;
                if (trailing || (maxWait !== wait)) {
                    lastCalled = now();
                    result = func.apply(thisArg, args);
                    if (!timeoutId && !maxTimeoutId) {
                        args = thisArg = null;
                    }
                }
            };

            return function() {
                args = arguments;
                stamp = now();
                thisArg = this;
                trailingCall = trailing && (timeoutId || !leading);

                if (maxWait === false) {
                    var leadingCall = leading && !timeoutId;
                } else {
                    if (!maxTimeoutId && !leading) {
                        lastCalled = stamp;
                    }
                    var remaining = maxWait - (stamp - lastCalled),
                            isCalled = remaining <= 0;

                    if (isCalled) {
                        if (maxTimeoutId) {
                            maxTimeoutId = clearTimeout(maxTimeoutId);
                        }
                        lastCalled = stamp;
                        result = func.apply(thisArg, args);
                    }
                    else if (!maxTimeoutId) {
                        maxTimeoutId = setTimeout(maxDelayed, remaining);
                    }
                }
                if (isCalled && timeoutId) {
                    timeoutId = clearTimeout(timeoutId);
                }
                else if (!timeoutId && wait !== maxWait) {
                    timeoutId = setTimeout(delayed, wait);
                }
                if (leadingCall) {
                    isCalled = true;
                    result = func.apply(thisArg, args);
                }
                if (isCalled && !timeoutId && !maxTimeoutId) {
                    args = thisArg = null;
                }
                return result;
            };
        }

        function isObject(value) {
            var type = typeof value;
            return value && (type == 'function' || type == 'object') || false;
        }
        /* End throttle/debounce */
        var pointerEventsDisabled = false;
        var reset = debounce(function(){
            pointerEventsDisabled = false;
        }, 250);
        $(window).bind('touchmove', throttle(function(e){
            if(!pointerEventsDisabled){
                $("a:active").each(function(){
                    var nextSibling = this.nextSibling,
                        parent = this.parentNode;
                    parent.removeChild(this);
                    parent.insertBefore(this, nextSibling);
                });
                pointerEventsDisabled = true;
            }
            reset();
        }, 200));
    }());

    if ($(".OutOfStockMessage").text().length < 7) {
        $(".OutOfStockMessage").hide();
    }
    $(".wishBtn").click(function () {
        if ($(".AddWishlistPop .BlockContent").is(":hidden")) {
            $(".AddWishlistPop .BlockContent").slideDown(300);
        } else {
            $(".AddWishlistPop .BlockContent").slideUp(300);
        }
    });
    $("label").each(function () {
        if ($(this).find(".radio").size() != 0 || $(this).find(".checker").size() != 0) {
            $(this).addClass("flushed");
        }
    });
    var signInLink = $(".FooterLinks .account a:first").text();
    if (signInLink == "Sign in") {
        $(".FooterLinks .account a:first").text(signInLink + " / Create an account");
    }

    var searchForm = $(".product-page #SearchForm");
    $(".product-page").scrollTop(searchForm.height());
    searchForm.show();

    // ============ Footer Accordion ============
    $(".accordion-btn").attr("href","#").children(".more-icon").addClass("fa fa-chevron-down")
    $(".accordion-btn").click(function(){
        var accordionBtn = $(this);
        accordionBtn.siblings("ul").toggleClass("show").slideToggle({
                duration: 400,
                easing: "easeInSine"
            });
        accordionBtn.toggleClass("open");
        toggleChevron(".more-icon");
        return false;
    });

    // ============ Chevron Icon toggling function ============
    // Use this to toggle any chevron to its opposite - handy for accordions or menus
    function toggleChevron(icon) {
        var chevron = $(icon);
        switch(true) {
            case (chevron.hasClass("fa-chevron-down")):
                chevron.removeClass("fa-chevron-down").addClass("fa-chevron-up");
                break;
            case (chevron.hasClass("fa-chevron-up")):
                chevron.removeClass("fa-chevron-up").addClass("fa-chevron-down");
                break;
            case (chevron.hasClass("fa-chevron-right")):
                chevron.removeClass("fa-chevron-right").addClass("fa-chevron-left");
                break;
            case (chevron.hasClass("fa-chevron-left")):
                chevron.removeClass("fa-chevron-left").addClass("fa-chevron-right");
                break;
        }
    }
    // ============ Blog recent posts accordion ============
    (function(){
        $('#BlogRecentPosts').each(function(){
            var parent = $(this),
                toggler = $('> h3 a', this),
                content = $('> .BlockContent', parent),
                isOpen = false;

            content.hide();
            toggler.click(function(e){
                e.preventDefault();
                if(isOpen){
                    isOpen = false;
                    content.stop().slideUp({
                        duration: 400,
                        easing: "easeInSine"
                    });
                } else{
                    isOpen = true;
                    content.stop().slideDown({
                        duration: 400,
                        easing: "easeOutSine",
                        complete: function () {
                            if (toggler.is(":in-viewport")) {
                                var offsetTop = toggler.offset().top;
                                $("html, body").animate({
                                    scrollTop: offsetTop - 40
                                }, 600);
                            }
                        }
                    });
                }
            });
        });
    }());
    /*global jQuery */
/*!
* FitText.js 1.1
*
* Copyright 2011, Dave Rupert http://daverupert.com
* Released under the WTFPL license
* http://sam.zoy.org/wtfpl/
*
* Date: Thu May 05 14:23:00 2011 -0600
*/
// Modified and added by Miko Ademagic

  $.fn.fitText = function( k, o ) {

    // Setup options
    var compressor = k || 1,
        settings = $.extend({
          'minFontSize' : Number.NEGATIVE_INFINITY,
          'maxFontSize' : Number.POSITIVE_INFINITY
        }, o);

    return this.each(function(){

          // Store the object
          var $this = $(this);

          // Resizer() resizes items based on the object width divided by the compressor * 10
          var resizer = function () {
            var sl = $this.children('h1').text().length;
            $this.css('font-size', Math.max(Math.min(($this.width() / sl) * compressor, parseFloat(settings.maxFontSize)), parseFloat(settings.minFontSize)));
          };

          // Call once to set.
          resizer();

          // Call on resize. Opera debounces their resize by default.
         $(window).bind('resize.fittext orientationchange.fittext', resizer);

    });

  };

  $('#LogoContainer').fitText(1.6, { minFontSize: '14px', maxFontSize: '20px' });

});