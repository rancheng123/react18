CKEDITOR.plugins.add( 'letterspacing', {
  requires: ['richcombo'],
  init: function( editor ) {
    var config = editor.config,
      lang = editor.lang.format;
    var trackings = [];

    config.allowedContent = 'span'; //There may be a better way to do this.

    for (var i = 0; i < 21; i++) {
      trackings.push(String(i) + 'px');
    }

    editor.ui.addRichCombo('letterspacing', {
      label: '字间距',
      title: '字间距',
      voiceLabel: 'Change letter-spacing',
      className: 'cke_format',
      multiSelect: false,

      panel: {
      css : [ config.contentsCss, CKEDITOR.getUrl( CKEDITOR.skin.getPath('editor') + 'editor.css' ) ]
      },

      init: function() { 
        this.startGroup('letterspacing');
       
        for(var i = 0,len =  trackings.length;i<len;i++)
        {
          var _name = trackings[i]; this.add(_name, _name, _name);
        }
      },

      onClick: function(value) {
        editor.focus();
        editor.fire('saveSnapshot');
        var ep = editor.elementPath();

        var style = new CKEDITOR.style({styles: {'letter-spacing': value}});
      
        editor[style.checkActive(ep) ? 'removeStyle' : 'applyStyle' ](style);

        editor.fire('saveSnapshot');
      }
    });
  }
});
