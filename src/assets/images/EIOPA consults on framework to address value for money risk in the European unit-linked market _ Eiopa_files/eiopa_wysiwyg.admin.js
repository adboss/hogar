/**
 * @file
 * Custom javascript for the module eiopa_bootstrap.
 */

(function ($, D, W) {
  "use strict";

  var EIOPA_WYSIWYG = {
    _speakers : function () {
      // (Object to Array for readable loop).
      var id, editor, $editor_body;
      for ([id, editor] of Object.entries(CKEDITOR.instances)) {
        editor.on('change', function () {
          $editor_body = $('#cke_' + $(this).attr('name') + ' iframe').contents().find('body');
          // Remove wrapper ".staff-grid" from a wrapper ".staff-grid".
          if ($editor_body.find('.staff-grid .staff-grid').length) {
            $editor_body.find('.staff-grid .staff-grid .grid-item').unwrap();
            $editor_body.find('.staff-grid > p').remove();
            $editor_body.find('.staff-grid').append('<p></p>');
          }
          // Not allow ".grid-item" inside a .grid-item.
          if ($editor_body.find('.staff-grid .grid-item .grid-item').length) {
            $editor_body.find('.staff-grid .grid-item .grid-item').each(function () {
              var $bad_speaker = $(this);
              var $bad_parent_to_clean = $bad_speaker.parent();
              var $futur_brother = $bad_speaker.parent().closest('.grid-item');
              $bad_speaker.siblings('p').remove();
              // Move to the right place.
              $bad_speaker.insertAfter($futur_brother);
              // Clean &#8203;.
              var exp = new RegExp(String.fromCharCode(8203),"g");
              var txt = $bad_parent_to_clean.html()
                  txt = txt.replace(exp,'');
                  txt = txt.replace(/&nbsp;/g,' ')
                  txt = txt.replace(/ {2,}/g,' ');
              $bad_parent_to_clean.html(txt);
            });
          }
        });
      }
    },
    _table : function () {
      // Give minimal table edition possibility to keep same style in website.
      CKEDITOR.on('dialogDefinition', function (ev) {
        var dialogName = ev.data.name;
        var dialogDefinition = ev.data.definition;
        if (dialogName === 'table' || dialogName === 'tableProperties') {
          var o_infoTab = dialogDefinition.getContents('info'),
              o_advancedTab = dialogDefinition.getContents('advanced');
          o_infoTab.remove('txtBorder');
          o_infoTab.remove('txtHeight');
          o_infoTab.remove('cmbAlign');
          o_infoTab.remove('txtCellSpace');
          o_infoTab.remove('txtCellPad');
          o_infoTab.remove('txtSummary');

          var a_CssClass = o_advancedTab.get('advCSSClasses');
          a_CssClass['default'] = 'table';
          o_advancedTab.remove('advId');
          o_advancedTab.remove('advLangDir');
          o_advancedTab.remove('advStyles');
        }
      });
    },
    _smiley_alter_config : function () {
      CKEDITOR.config.smiley_descriptions.push('check', 'error');
      CKEDITOR.config.smiley_images.push('check.png', 'error.png');
      CKEDITOR.config.smiley_path = Drupal.settings.basePath + Drupal.settings.pathToTheme + '/assets/images/ckeditor/smiley/images/';
    },

    onLoad : function () {
      EIOPA_WYSIWYG._speakers();
      EIOPA_WYSIWYG._table();
      EIOPA_WYSIWYG._smiley_alter_config();
    }
  };

  $(W).on('load', function () {
    if (typeof CKEDITOR !== 'undefined') {
      EIOPA_WYSIWYG.onLoad();
    }
  });

}(jQuery, document, window));
