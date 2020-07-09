/**
 * @license Copyright (c) 2003-2017, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or http://ckeditor.com/license
 */

CKEDITOR.editorConfig = function( config ) {
	// Define changes to default configuration here.
	// For complete reference see:
	// http://docs.ckeditor.com/#!/api/CKEDITOR.config

    //Skin
    config.skin = 'office2013';

	// The toolbar groups arrangement, optimized for two toolbar rows.
    config.toolbarGroups = [
        { name: 'document', groups: ['mode', 'document', 'doctools'] },
		{ name: 'clipboard',   groups: [ 'clipboard', 'undo' ] },
		{ name: 'editing',     groups: [ 'find', 'selection', 'spellchecker' ] },
		{ name: 'links' },
		{ name: 'insert' },
		{ name: 'forms' },
		{ name: 'tools' },
		'/',
		{ name: 'basicstyles', groups: [ 'basicstyles', 'cleanup' ] },
		{ name: 'paragraph',   groups: [ 'list', 'indent', 'blocks', 'align', 'bidi' ] },
		{ name: 'styles' },
        '/',
        { name: 'colors' },
        { name: 'about' },
        { name: 'others' },
	];

	// Remove some buttons provided by the standard plugins, which are
	// not needed in the Standard(s) toolbar.
	config.removeButtons = 'Underline,Subscript,Superscript';

	// Set the most common block elements.
	config.format_tags = 'p;h1;h2;h3;pre';

	// Simplify the dialog windows.
    config.removeDialogTabs = 'image:advanced;link:advanced';

    //ExtraPlugins   
    config.extraPlugins = 'widget,widgetselection,fontawesome,youtube,justify,font,tableresize,colorbutton,panelbutton,uploadfile,btbutton,btgrid,bootstrapTabs,collapsibleItem,accordionList,table,wordcount,colordialog,emojione,image2,imageresponsive,uicolor,lineheight,chart,liststyle,cssanim';

    //Fontawesome
    config.contentsCss = '/ckeditor/plugins/fontawesome/font-awesome/css/font-awesome.min.css';
    config.allowedContent = true; 


};
