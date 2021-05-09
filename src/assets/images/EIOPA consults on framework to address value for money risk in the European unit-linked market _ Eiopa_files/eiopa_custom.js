/**
 * @file
 * Custom javascript for the module eiopa_bootstrap.
 */

(function ($, W, D) {
  "use strict";

  Drupal.behaviors.ViewsExposedFormAjax = {
    attach: function (context, settings) {

      if ($(context).hasClass('view-eiopa-events')) {
        if (settings.urlIsAjaxTrusted) {
          EIOPA_THEME._datepicker();
        }
      }
    }
  };
  var EIOPA_THEME = {
    bTimerFlag: true,
    bTimerFlagScroll: true,
    iWidth: null,

    _datepicker : function () {
      $('input.date-date.form-text').each(function () {
        var s_inputs_date_config = {
          uiLibrary: 'bootstrap4',
          format: 'dd/mm/yyyy',
        };
        var $_this = $(this);
        if ($_this.attr('id') == 'edit-field-eiopa-date-value-value-date' && $_this.val() == '') {
          // Set default value to Today.
          var today = new Date();
          var dd = today.getDate();
          var mm = today.getMonth() + 1; // January is 0!
          var yyyy = today.getFullYear();
          if (dd < 10) {
              dd = '0' + dd
          }
          if (mm < 10) {
              mm = '0' + mm
          }

          today = dd + '/' + mm + '/' + yyyy;
          s_inputs_date_config['value'] = today;
        }

        $(this).datepicker(s_inputs_date_config);

        // Open the datepicker when input clicked.
        // (by default, only the associated button trigger Datepicker)
        $('input.textfield_date').on('click', function () {
          $(this).next('[role="right-icon"]').click();
        });

      });
    },

    onResizeOrientationChange : function () {
      // Used to not detect every miliseconds.
      if (EIOPA_THEME.bTimerFlag) {
        window.setTimeout(function () {
          EIOPA_THEME.bTimerFlag = true;
          // To do :
          if (W.innerWidth >= 1025) {
            EIOPA_THEME.HEADER.menu.desktop();
          }
      else {
            EIOPA_THEME.HEADER.menu.mobile();
          }

        }, 100);
        EIOPA_THEME.bTimerFlag = false;
      }

      // Screen rotation.
      if (W.innerWidth != EIOPA_THEME.iWidth) {
        EIOPA_THEME.iWidth = W.innerWidth;
        EIOPA_THEME.setColorBoxNodeValues();
      }

    },
    makeMenuEntryUnckliable : function () {

      $('#eiopa-navigation a.nolink').each(function () {
        $(this).click(function () {
          return false;
        });
      });
    },

    setColorBoxNodeValues : function () {
      // Set width for mobile.
      if (window.matchMedia) {
        var mq = window.matchMedia("(max-device-width: " + Drupal.settings.colorbox.mobiledevicewidth + ")");
        if (mq.matches) {
          Drupal.settings.colorbox_node.width = "90%";
        }
        else {
          Drupal.settings.colorbox_node.width = "50%";
        }
      }
    },

    HEADER : {
      menu : {
        mobile : function () {
          $('#eiopa-navigation ul.navbar-nav li.has-children > a').each(function () {
            var $link = $(this),
                sHref;
            // Store href.
            if ($link.attr('data-href')) {
              sHref = $link.attr('data-href');
            }
            else {
              sHref = $link.attr('href');
            }

            $link
              .attr('data-href', sHref)
              .attr('href', '#')
              .addClass('navigation-toggler')
              .attr('role', 'button');
          });

          $('#eiopa-navigation ul.navbar-nav .nav-item .menu').height('auto');
        },
        desktop : function () {
          $('#eiopa-navigation ul.navbar-nav li.has-children > a').each(function () {
            var $link = $(this);
            if ($link.attr('data-href')) {
              $link.attr('href', $link.attr('data-href'));
            }
            $link
              .removeClass('navigation-toggler')
              .attr('role', '')
              .attr('data-flag_desktop', '1')
              .collapse('hide');
          });

          // Copy from eiopa.js "applyDropDownMenuHeight".
          $('#eiopa-navigation ul.navbar-nav .nav-item').each(function () {
            var maxHeight = 0;
            $(this).find('.menu').each(function () {

              $(this).height('auto');
              // Find max height.
              if ($(this).actual('height') > maxHeight) {
                maxHeight = $(this).actual('height');
              }
            });

            // Set max height.
            $(this).find('.menu').height(maxHeight);
          });
        },
      },
    },

    GALLERY : {
      main : function () {
        EIOPA_THEME.GALLERY._title_as_caption();
        EIOPA_THEME.GALLERY._manageOverlayIcon();
      },
      _title_as_caption : function () {
        // Not display title on hover but only in caption.
        $('#main-content a.image-wrapper.media-colorbox').each(function () {
          var $link = $(this);
          $link.attr('data-title', $link.attr('title')).attr('title', '');
        });
        $(document).bind('cbox_load', function () {
          var $element = $.colorbox.element();
          $element.colorbox({title : $element.attr('data-title')});
        });
      },
      // Manage Overlay Icon Element.
      _manageOverlayIcon : function () {

        var mark = '.multimedia-grid div.file-video';
        var container = 'overlay-container';
        var overlay = '.center-overlay';

        if (document.querySelector(mark) !== null) {

          // Add container class.
          EIOPA_THEME.GALLERY._addClass(mark, container);

          // Insert overlay icon.
          EIOPA_THEME.GALLERY._insertIcon(container, overlay);
        }
      },
      _addClass : function (mark, container) {

        $(mark).each(function () {
          $(this).parent().addClass(container);
        });

      },
      // Manage Overlay Icon Element.
      _insertIcon : function (container, overlay) {

        $('.' + container + ' ' + overlay).each(function () {
          if ($(this).html() == '') {
            $(this).append("");
          }
        });
      }
    },

    TOCIFY : {
      position_top : null,
      main : function () {
        if (W.innerWidth > 1024) {
          $('body').addClass('tocifyed');
          EIOPA_THEME.TOCIFY.makeSticky();
        }
        EIOPA_THEME.TOCIFY.setTocOptions();

        if (D.querySelector('.read-more-content') !== null) {
          EIOPA_THEME.TOCIFY.manageReadMore();
        }
      },
      makeSticky : function () {
        Drupal.behaviors.eiopa_theme_tocify = {
          attach: function (context, settings) {
            // "28" is padding added into the body by other thing.
            var $_tocify = $('#tocify');
            var header_height = $('#eiopa-navigation').height();
            var original_position = $_tocify.offset().top;
            var limit = {
              fixed_top : $('#eiopa-navigation').height() + parseInt($_tocify.closest('aside').css('padding-top')),
              absolute_bottom : 28 + $('aside.sidebar.sidebar-second').offset().top + $('aside.sidebar.sidebar-second').outerHeight() - $_tocify.height()
            };

            $('body').append('<style>.table-of-content .tocify.fixed-toc {top: ' + limit.fixed_top + 'px;}</style>');
            // $('body').append('<style>body:before{top: ' + limit.fixed_top + 'px;} body:after{top: ' + limit.absolute_bottom + 'px;}</style>');
            // Hardcode WIDTH property to fix it when it will be position fixed.
            $_tocify.width($_tocify.width());

            var _scroll_top = 0;
            $(W).on('scroll', function () {
              // Used to not detect every miliseconds.
              if (EIOPA_THEME.bTimerFlagScroll) {
                window.setTimeout(function () {
                  EIOPA_THEME.bTimerFlagScroll = true;
                  _scroll_top = $(window).scrollTop();
                  // Limit top.
                  if (_scroll_top < original_position - header_height) {
                    $_tocify.removeClass('fixed-toc');
                  }
                  else {
                    if (_scroll_top + limit.fixed_top < limit.absolute_bottom) {
                      $_tocify.addClass('fixed-toc').removeClass('absolute-toc');
                    }
                    else {
                      $_tocify.addClass('absolute-toc').removeClass('fixed-toc');
                    }
                  }
                }, 50);
                EIOPA_THEME.bTimerFlagScroll = false;
              }
            });
          }
        };
      },
      setTocOptions : function () {
        $(function () {
            var toc = $("#tocify").tocify().data("toc-tocify");
            var width = $(window).width();
            var marginTop = 80;

            if (width < 1024) {
              var marginTop = 100;
              // Unset showAndHide on mobile devices .
              toc.setOptions({ showAndHide: false, scrollTo: marginTop, extendPage: false});
            }
            else {
              // Set ToC scrollTo margin height.
              toc.setOptions({ scrollTo: marginTop, extendPage: false});
            }
          });
      },
      manageReadMore : function () {

        $(document).on("click", ".tocify-item a", function () {
          var target = $(this).parent().attr("data-unique");

          EIOPA_THEME.TOCIFY.expandReadMore(target);
        });
      },
      expandReadMore : function (target) {

        var parentDiv = $('[name="' + target + '"]').parent('.read-more-content');

        if (parentDiv !== undefined) {

          var readMore = parentDiv.siblings("p").children().first();
          var closed = readMore.hasClass('closed');

          if (closed) {
            readMore.trigger('click');
            EIOPA_THEME.TOCIFY._slideTo(target);
          }
        }
      },
      _slideTo : function (target) {

        $([document.documentElement, document.body]).animate({
          scrollTop: $('[name="' + target + '"]').offset().top - 100
        }, 1000);

      },
    },

    HYBRID_PAGE : {
      main : function () {
        EIOPA_THEME.HYBRID_PAGE._slick();
        EIOPA_THEME.HYBRID_PAGE._focus();
      },
      _slick : function () {
        var $element_to_slick = $('#showcase_elements > .row'),
            i_elements_count = $element_to_slick.children().length;
        $('#showcase_elements_wrapper .grid-list-item').removeClass('col-12 col-sm-6 col-lg-4');
        if ($element_to_slick.length) {
          $element_to_slick.slick({
            infinite: false,
            slidesToShow: Math.min(i_elements_count, 1),
            slidesToScroll: Math.min(i_elements_count, 1),
            appendArrows : $('#slider_nav_wrapper'),
            mobileFirst : true,
            responsive: [
              {
                breakpoint: 575,
                settings: {
                  slidesToShow: Math.min(i_elements_count, 2),
                  slidesToScroll: Math.min(i_elements_count, 2),
                }
              },
              {
                breakpoint: 1024,
                settings: {
                  slidesToShow: Math.min(i_elements_count, 3),
                  slidesToScroll: Math.min(i_elements_count, 3),
                }
              },
            ],
          });
        }
      },
      _focus : function () {
        var url_param = $(location).attr('href').split("?");
        var param = (url_param[1]);
        if (typeof param != 'undefined' && param) {
          $(document).scrollTop($("#view_hybrid_page").offset().top);
        }
      }
    },

    LANDING_PAGE : {
      main : function () {
        if ($('#showcase_elements_wrapper_news').length > 0) {
          EIOPA_THEME.LANDING_PAGE._slick_landing('showcase_elements_news', 'slider_nav_wrapper_news');
        }
        if ($('#showcase_elements_wrapper_events').length > 0) {
          EIOPA_THEME.LANDING_PAGE._slick_landing('showcase_elements_events', 'slider_nav_wrapper_events');
        }
        if ($('#showcase_elements_wrapper_occupational_pensions').length > 0) {
          EIOPA_THEME.LANDING_PAGE._slick_landing('showcase_elements_occupational_pensions', 'slider_nav_wrapper_occupational_pensions');
        }
        if ($('#showcase_elements_wrapper_personal_pensions').length > 0) {
          EIOPA_THEME.LANDING_PAGE._slick_landing('showcase_elements_personal_pensions', 'slider_nav_wrapper_personal_pensions');
        }
        if ($('#showcase_elements_wrapper_insurance_reinsurance_sg').length > 0) {
          EIOPA_THEME.LANDING_PAGE._slick_landing('showcase_elements_insurance_reinsurance_sg', 'slider_nav_wrapper_insurance_reinsurance_sg');
        }
        if ($('#showcase_elements_wrapper_occupational_pensions_sg').length > 0) {
          EIOPA_THEME.LANDING_PAGE._slick_landing('showcase_elements_occupational_pensions_sg', 'slider_nav_wrapper_occupational_pensions_sg');
        }
      },
      _slick_landing : function (id_showcase_elements, id_slider_nav_wrapper) {
        var $element_to_slick = $('#' + id_showcase_elements + ' div.row'),
            i_elements_count = $element_to_slick.children().length;

        $('#' + id_showcase_elements + ' div.grid-list-item').removeClass('col-12 col-sm-6 col-lg-4');

        if ($element_to_slick.length) {
          $element_to_slick.slick({
            infinite: false,
            slidesToShow: Math.min(i_elements_count, 1),
            slidesToScroll: Math.min(i_elements_count, 1),
            appendArrows : $('#' + id_slider_nav_wrapper),
            mobileFirst : true,
            responsive: [
              {
                breakpoint: 575,
                settings: {
                  slidesToShow: Math.min(i_elements_count, 2),
                  slidesToScroll: Math.min(i_elements_count, 2),
                }
              },
              {
                breakpoint: 1024,
                settings: {
                  slidesToShow: Math.min(i_elements_count, 3),
                  slidesToScroll: Math.min(i_elements_count, 3),
                }
              },
            ],
          });
        }
      }
    },

    LANDING_CONSUMERS_PAGE : {
      main : function () {
        $(".inline").colorbox({inline:true, width:"80%", fixed:true, maxHeight:"90%"});
      },
    },

    SPEAKERS : {
      main : function () {
        $(".staff-grid .image-wrapper img").each(function () {
          var $this = $(this);
          if ($this.width() > $this.height()) {
            $this.css({'width': 'auto', 'height': '100%'});
          }
          else {
            $this.css({'width': '100%', 'height': 'auto'});
          }
        });
      },
    },

    SITEMAP : {
      main : function () {
       $('li:has(a[href*="quantitative-impact-studies"])').remove();
      },
    },

    RULEBOOK_CATEGORIES_PAGE : {
      main : function () {
        EIOPA_THEME.RULEBOOK_CATEGORIES_PAGE._event_child_checkbox();
        EIOPA_THEME.RULEBOOK_CATEGORIES_PAGE._makeBtnPrintPdfSticky();
        $("#print_pdf").hide();
        $("#print_pdf").button().click(function () {
          EIOPA_THEME.RULEBOOK_CATEGORIES_PAGE._print_pdf_submit();
          return false;
        });
      },
      _print_pdf_submit : function () {
        var download_nids = new Array();
        $("input[name='download_nids']:checked").each(function () {
          download_nids.push($(this).val());
        });
        if (download_nids.length > 0) {
          var url = Drupal.settings.basePath + 'rulebook-categories/print-pdf-rulebook-categories/' + download_nids.join('+');
          window.open(url, '_blank');
          return false;
        }
      },
      _event_child_checkbox : function () {
        $("input[type='checkbox']").change(function (e) {
          $(this).parent().siblings('ul').find("input[type='checkbox']").prop('checked', this.checked);
          var checkedChbx = $('input[type=checkbox]:checked');
          if (checkedChbx.length > 0) {
            $('#print_pdf').show();
          }
          else {
            $('#print_pdf').hide();
          }
        });
      },
      _makeBtnPrintPdfSticky : function () {
        $(window).scroll(function () {
          var bot;
          var screen = document.documentElement.clientHeight;
          var page = document.body.offsetHeight;
          var height = $(this).scrollTop();
          var bottom = page - (screen + (screen / 2));
          var top = height > (screen / 1.5);

          /* If possible we limit Btn scroll down to Share buttons. */
          if ($('.group-share-buttons').length) {
            var limit = $('.group-share-buttons').offset().top;
            var btnPrintPdf = $('#print_pdf').outerHeight();
            bot = height < (limit - btnPrintPdf);
          }
          else {
            bot = height < bottom;
          }

          if (top && bot) {
            $('.flex-btn-print-pdf').addClass('fixed-btn-print-pdf');
            $('.fixed-btn-print-pdf').width($('.eiopa-rulebook-print-pdf').width());
          }
          else {
            $('.flex-btn-print-pdf').removeClass('fixed-btn-print-pdf');
          }
        });
      },
    },

    onReady : function () {
      /* EIOPA_THEME._datepicker(); */
      // Check Mobile or Desktop.
      EIOPA_THEME.onResizeOrientationChange();
      EIOPA_THEME.makeMenuEntryUnckliable();

      if ($('.table-of-content').length) {
        EIOPA_THEME.TOCIFY.main();
      }
      if ($('body').hasClass('node-type-eiopa-hybrid-page')) {
        EIOPA_THEME.HYBRID_PAGE.main();
      }
      if ($('body').hasClass('node-type-eiopa-landing-page')) {
        EIOPA_THEME.LANDING_PAGE.main();
      }
      if ($('body').hasClass('page-sitemap')) {
        EIOPA_THEME.SITEMAP.main();
      }
      if ($('.for-consumers-page').length) {
        EIOPA_THEME.LANDING_CONSUMERS_PAGE.main();
      }
      if ($('.rulebook-categories').length) {
        EIOPA_THEME.RULEBOOK_CATEGORIES_PAGE.main();
      }

      EIOPA_THEME.GALLERY.main();
      if ($('.staff-grid').length) {
        EIOPA_THEME.SPEAKERS.main();
      }
    }
  };

  $(D).ready(EIOPA_THEME.onReady());
  $(W).on('resize orientationchange', function () {
    EIOPA_THEME.onResizeOrientationChange();
  });

}(jQuery, window, document));
