
CKEDITOR.plugins.add( 'wraptext', {
	icons: 'wraptext',
    availableLangs: {'zh-cn':1, 'en':1},
    lang: 'zh-cn, en',
	init: function( editor ) {

        var indentation = editor.config.indentation;

        if(typeof(indentation) == 'undefined')
            indentation = '50';

        if(editor.ui.addButton){

            editor.ui.addButton( 'wraptext', {
                label: editor.lang.wraptext.labelName,
                command: 'wraptext',
                toolbar: 'paragraph',
            });
        }
		//word-wrap:break-word
        editor.on( 'selectionChange', function(event)
            {   console.log(event);
                var style_textindente = new CKEDITOR.style({
                        element: 'p',
                        styles: { 'word-wrap': 'break-word' },
                        overrides: [{
                            element: 'word-wrap', attributes: { 'size': 'break-word'}
                        }]
                    });

                if( style_textindente.checkActive(editor.elementPath(), editor) )
                   editor.getCommand('wraptext').setState(CKEDITOR.TRISTATE_ON);
                else
                   editor.getCommand('wraptext').setState(CKEDITOR.TRISTATE_OFF);

        })

        editor.addCommand("wraptext", {
            allowedContent: 'p{word-wrap}',
            requiredContent: 'p',
            exec: function() {

                var style_textindente = new CKEDITOR.style({
                        element: 'p',
                        styles: { 'word-wrap': 'break-word' },
                        overrides: [{
                            element: 'word-wrap', attributes: { 'size': 'normal'}
                        }]
                    });

                var style_no_textindente = new CKEDITOR.style({
                        element: 'p',
                        styles: { 'word-wrap': 'normal' },
                        overrides: [{
                            element: 'word-wrap', attributes: { 'size': 'break-word' }
                        }]
                    });

                if( style_textindente.checkActive(editor.elementPath(), editor) ){
                    editor.fire('saveSnapshot');
                    editor.applyStyle(style_no_textindente);
                }
                else{
                    editor.fire('saveSnapshot');
                    editor.applyStyle(style_textindente);
                }

            }
        });
	}

});
